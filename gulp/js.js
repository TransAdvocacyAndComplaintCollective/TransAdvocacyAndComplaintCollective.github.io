const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const fs = require('fs');

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
  console.log(entry);
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
    .pipe(gulp.dest("output/js/"));
}

exports.javascript = javascript;
