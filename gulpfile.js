const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const fs = require('fs');
const plumber = require('gulp-plumber');
const path = require('path');
const each = require('gulp-each');
const ReactDOMServer = require('react-dom/server');
const nodeExternals = require('webpack-node-externals');
const React = require('react');
const ext_replace = require('gulp-ext-replace');

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



gulp.task('default', function (done) {
  const files = fs.readdirSync('src/');
  const entry = {};

  files.forEach(file => {
    const ext = path.extname(file);
    if (['.jsx'].includes(ext)) {
      const name = path.basename(file, ext);
      entry[name] = path.resolve(__dirname, 'src', file);
    }
  });

  return gulp.src(["src/*.jsx"])
    .pipe(plumber())
    .pipe(webpackStream({
      mode: "development",
      entry: entry,
      target: "node",
      externals: [nodeExternals()],
      output: {
        filename: "[name].js",
        library: 'app',
        libraryTarget: 'commonjs2'
      },
      resolve: {
        extensions: ['.jsx'],
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
      },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: ["@babel/proposal-class-properties"]
              }
            },
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      }
    }))
    .pipe(plumber())
    .pipe(each((content, file, callback) => {
        const cccx = requireFromString(content.toString(), file.path);
        const App = cccx.app.default({});
        const p = ReactDOMServer.renderToString(App);
        callback(null, p);

    }))
    .pipe(ext_replace('.html'))
    .pipe(gulp.dest("output/"));
});
