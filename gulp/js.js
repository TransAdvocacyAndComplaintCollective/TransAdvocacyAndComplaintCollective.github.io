const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const fs = require('fs');
const path = require('path');

function javascript(cb) {
  let files = fs.readdirSync('src/js/');
  let entry = {};

  files.forEach(file => {
    let ext = file.split('.')[1];
    if (ext !== 'jsx' && ext !== 'js') return;
    let name = file.split('.')[0];
    entry[name] = './src/js/' + file;
  });

  console.log(entry);

  return gulp
    .src(["src/**/*.js", "src/**/*.jsx"])
    .pipe(
      webpackStream({
        mode: "development",
        entry: entry,
        output: {
          filename: "[name].js",
        },
        resolve: {
          extensions: ['.js', '.jsx'],
          roots: [path.resolve(__dirname, 'src/js')],
        },
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-react"],
                },
              },
            },
            {
              test:/\.(ical|vcf|vcard|ics|ifb|icalendar)$/,
              use: 'raw-loader'
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader"],
            },
          ],
        },
        plugins: [
          new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
          }),
          new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
          }),
        ],
      })
    )
    .pipe(gulp.dest("output/js/"));
}

exports.javascript = javascript;
