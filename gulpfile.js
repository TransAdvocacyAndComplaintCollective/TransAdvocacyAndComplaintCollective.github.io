const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const fs = require('fs');
const plumber = require('gulp-plumber');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const nodeExternals = require('webpack-node-externals');
const ext_replace = require('gulp-ext-replace');
const autoprefixer = require('autoprefixer');
const each = require('gulp-each');
const inline = require('gulp-inline');
const minifyCss = require('gulp-minify-css');
const minifyInline = require('gulp-minify-inline');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const markdown = require('markdown-it')();
const matter = require('gray-matter');
const webpack = require('webpack');

const webpackConfig = {
  mode: "development",
  target: "node", // Set target to 'node'
  externals: [nodeExternals()],
  output: {
    filename: "[name].js",
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.jsx'],
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/proposal-class-properties", "babel-plugin-inline-import","babel-plugin-transform-scss","babel-plugin-css-modules-transform"]
          }
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },    
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }
        ]
      }
    ],
  }
}

function requireFromString(src, filename, rootDir = process.cwd()) {
  const Module = module.constructor;
  const m = new Module(filename, module.parent);
  const filePath = path.resolve(rootDir, filename);

  // Set the filename relative to the root directory
  m.filename = filePath;

  // Mimic the behavior of require by adding the directory of the file to the module search paths
  const dirname = path.dirname(filePath);
  m.paths = Module._nodeModulePaths(dirname);

  // Compile the source code
  m._compile(src, filePath);

  return m.exports;
}
function articleGenerator(done) {
  let articles = {};
  gulp.src(["src/articles/*.md"]).
    pipe(plumber()) 
    .pipe(each((content, file, callback) => {
      const { data, content:text } = matter(content.toString());
      const htmlContent = markdown.render(text);
      articles[file.path] = { ...data, htmlContent };
      console.log(articles);
      callback();
    }))
}
function buildStaicPage(done) {
  const files = fs.readdirSync('src/');
  const entry = {};

  files.forEach(file => {
    const ext = path.extname(file);
    if (['.jsx'].includes(ext)) {
      const name = path.basename(file, ext);
      entry[name] = path.resolve(__dirname, 'src', file);
    }
  });

  return gulp.src(["src/*.jsx","src/styles/*.css"])
    .pipe(plumber())
    .pipe(webpackStream({...webpackConfig, entry:entry}))
    .pipe(plumber())
    .pipe(ext_replace('.html'))
    .pipe(each((content, file, callback) => {
      const cccx = requireFromString(content.toString(), file.path);
      console.log(cccx.default);  
      const App = cccx.default({});
      const p = ReactDOMServer.renderToString(App);
      callback(null, "<!DOCTYPE html>"+p);
    }))
    .pipe(inline({
      // js: uglify,
      css: [minifyCss],
      base: 'src/styles/'
    }))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(minifyInline())
    .pipe(gulp.dest("output/"));
}
function copyStyles() {
  return gulp.src('src/styles/bootstrap.css')
  .pipe(purgecss({
    content: ['output/**/*.html']
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest('output/styles'));
}

exports.default = gulp.series(buildStaicPage, copyStyles, articleGenerator);