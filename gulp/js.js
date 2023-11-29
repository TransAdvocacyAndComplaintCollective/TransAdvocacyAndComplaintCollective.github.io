const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const fs = require('fs');
const livereload = require('gulp-livereload');

// const fs = require('fs');

function javascript(cb) {
  // list all the JS files in the 'src/js' directory and its subdirectories
  let files = fs.readdirSync('src/js/');
  let entry = {};
  files.forEach(file => {
    let ext = file.split('.')[1];

    if (ext !== 'jsx' & ext !== 'js') return;
    let name = file.split('.')[0];
    entry[name] = './src/js/' + file;
  });
  return gulp
    .src(["src/**/*.js", "src/**/*.jsx"]) // Change the file pattern to match all JS files in the 'src/js' directory and its subdirectories
    .pipe(
      webpackStream({
        mode: "development",
        entry: entry,
        output: {
          filename: "[name].js",
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: ["/node_modules/", "/app/", "/output/"],
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    presets: [
                      // "@babel/env",
                      // "@babel/preset-env",
                      "@babel/preset-react"
                    ],
                  },
                },
              ],
            },

          ],
        },
        resolve: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          // fallback: {
          //   "path": require.resolve("path-browserify"),
          //   "fs": require.resolve("browserify-fs"),
          //   "zlib": require.resolve("browserify-zlib"),
          //   "querystring": require.resolve("querystring-es3"),
          //   "assert": require.resolve("assert"),
          //   "stream": require.resolve("stream-browserify"),
          //   "util": require.resolve("util"),
          //   "url": require.resolve("url"),
          //   "http": require.resolve("stream-http"),
          //   "url": require.resolve("url"),
          //   "crypto": require.resolve("crypto-browserify"),
          //   "net": false,
          //   "process": require.resolve("process/browser"),
          //   "buffer": require.resolve("buffer")
          // }
        },
        plugins: [
          new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
          }),
          new webpack.ProvidePlugin({
            process: 'process/browser',
          }),
          new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
          }),
        ],
      })
    )
    .pipe(gulp.dest("output/js/")).pipe(livereload());
}

exports.javascript = javascript;
