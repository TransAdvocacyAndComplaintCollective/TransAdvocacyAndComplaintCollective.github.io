const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const fs = require('fs');
const path = require('path');
const plumber = require('gulp-plumber');


function javascript(cb) {
  let files = fs.readdirSync('src/js/');
  let entry = {};
  console.log(files);

  files.forEach(file => {
    let ext = file.split('.')[1];
    if (ext !== 'jsx' && ext !== 'js' && ext !== 'tsx' && ext !== 'ts') return;
    let name = file.split('.')[0];
    entry[name] = './src/js/' + file;
  });
  console.log(entry);

  return gulp
    .src(["src/**/*.js", "src/**/*.jsx","src/**/*.ts", "src/**/*.tsx"])
    .pipe(plumber())
    .pipe(
      webpackStream({
        mode: "development",
        entry: entry,
        output: {
          filename: "[name].js",
        },
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
          roots: [path.resolve(__dirname, 'src/js')],
        },
        module: {
          rules: [
            {
              test: /\.(ts|js|jsx|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                ],
                "plugins": [
                  "@babel/proposal-class-properties",
                  // "@babel/proposal-object-rest-spread",
                ]
                },
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
      })
    )
    .pipe(gulp.dest("output/js/"));
}

exports.javascript = javascript;
