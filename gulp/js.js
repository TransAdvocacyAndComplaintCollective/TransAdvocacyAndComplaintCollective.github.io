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
    if (ext !== 'jsx' && ext !== 'js' && ext !== 'tsx' && ext !== 'ts') return;
    let name = file.split('.')[0];
    entry[name] = './src/js/' + file;
  });

  return gulp
    .src(["src/**/*.js", "src/**/*.jsx","src/**/*.ts", "src/**/*.tsx"])
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
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
            {
              test: /\.(ts|js|jsx|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                  // "@babel/preset-typescript",
                  // "module:metro-react-native-babel-preset"
                ],
                "plugins": [
                  "@babel/proposal-class-properties",
                  "@babel/proposal-object-rest-spread",
                  // "@babel/plugin-transform-object-rest-spread",
                  // "react-native-web",
                  // "@babel/plugin-syntax-typescript"
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
        },
        plugins: [
          // new webpack.SourceMapDevToolPlugin({
          //   filename: "[file].map",
          // }),
          // new webpack.ProvidePlugin({
          //   process: 'process/browser',
          //   Buffer: ['buffer', 'Buffer'],
          // }),
        ],
      })
    )
    .pipe(gulp.dest("output/js/"));
}

exports.javascript = javascript;
