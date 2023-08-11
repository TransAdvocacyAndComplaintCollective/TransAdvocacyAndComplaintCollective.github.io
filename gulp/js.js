const gulp = require("gulp");
const named = require("vinyl-named");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const babelLoader = require("babel-loader");
const styleLoader = require("style-loader");
const cssLoader = require("css-loader");
function compile_react(cb) {
  return gulp
    .src(["src/js/*.js"]) // Replace 'src/index.js' with the entry point of your JavaScript files

    .pipe(named())
    .pipe(
      webpackStream({
        mode: "development", // Adjust the mode as needed
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: "babel-loader",
                  options: {
                    presets: ["@babel/preset-react"],
                  },
                },
                "source-map-loader",
              ],
            },
            {
              test: /\.css$/,
              use: ["style-loader", "css-loader"],
            },
          ],
        },
        resolve: {
          extensions: [".js", ".jsx"],
        },
        plugins: [
          new webpack.SourceMapDevToolPlugin({
            filename: "[file].map",
          }),
        ],
      }),
      webpack
    )
    .pipe(gulp.dest("output/js")); // Replace 'dist' with your desired output directory // Output directory for compiled files
}
exports.compile_react = compile_react;
