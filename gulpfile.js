const gulp = require('gulp');
const webpack = require('webpack-stream');
const fs = require('fs');

gulp.task('default', function (done) {

  let files = fs.readdirSync('src/js/');
  let entry = {};
  console.log(files);

  files.forEach(file => {
    let ext = file.split('.')[1];
    if (ext !== 'jsx'&& ext !== 'tsx') return;
    let name = file.split('.')[0];
    entry[name] = './src/js/' + file;
  });
  console.log(entry);

  return gulp.src('src/*.jsx')
    .pipe(webpack({
      mode: 'development',
      entry: entry,
      // output: {
      //   filename: '[name].js'
      // },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: {
              loader: 'babel-loader', // Specify babel-loader here
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react'
                ],
                "plugins": [
                  "@babel/proposal-class-properties",
                  // "@babel/proposal-object-rest-spread",
                ]
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'] // Add loaders for CSS files
          }
        ]
      }
    }))
    .pipe(gulp.dest('dist/'))
    .on('end', done); // Signal task completion
});
