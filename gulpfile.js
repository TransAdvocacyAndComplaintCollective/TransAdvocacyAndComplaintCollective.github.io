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
            plugins: ["@babel/proposal-class-properties", "babel-plugin-inline-import", "babel-plugin-transform-scss", "babel-plugin-css-modules-transform"]
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
function generateArticles(done) {
  let articles = {};
  return gulp.src(["src/article/ArticlePage.jsx"])
    .pipe(plumber())
    .pipe(webpackStream({ ...webpackConfig }))
    .pipe(each((articleJSXContent, file, callback) => {
      gulp.src(["src/articles/*.md"]).
        pipe(plumber())
        .pipe(each((markdownContent, file, callback) => {
          const { data, content: markdownText } = matter(markdownContent.toString());
          const htmlContent = markdown.render(markdownText);
          articles[file.path] = { ...data, htmlContent };
          const articleModule = requireFromString(articleJSXContent.toString(), file.path);
          const ArticleComponent = articleModule.default({});
          const renderedArticle = ReactDOMServer.renderToString(ArticleComponent);
          callback(null, "<!DOCTYPE html>" + renderedArticle);
        })).pipe(gulp.dest("output/"));
        callback(null, articles);

    }))
}
function buildStaticPage(done) {
  const filesInSrcDir = fs.readdirSync('src/');
  const entryPoints = {};

  filesInSrcDir.forEach(file => {
    const fileExtension = path.extname(file);
    if (['.jsx'].includes(fileExtension)) {
      const fileName = path.basename(file, fileExtension);
      entryPoints[fileName] = path.resolve(__dirname, 'src', file);
    }
  });

  return gulp.src(["src/*.jsx", "src/styles/*.css"])
    .pipe(plumber())
    .pipe(webpackStream({ ...webpackConfig, entry: entryPoints }))
    .pipe(plumber())
    .pipe(ext_replace('.html'))
    .pipe(each((jsxContent, file, callback) => {
      const moduleFromJSX = requireFromString(jsxContent.toString(), file.path);
      console.log(moduleFromJSX.default);
      const App = moduleFromJSX.default({});
      const renderedPage = ReactDOMServer.renderToString(App);
      callback(null, "<!DOCTYPE html>" + renderedPage);
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

exports.default = gulp.series(buildStaticPage, copyStyles, generateArticles);