const gulp = require('gulp');
const webpack = require('webpack-stream');


gulp.task('default', function(done) {

  return gulp.src('src/*.jsx')
    .pipe(webpack({
      mode: 'development',
      output: {
        filename: '[name].js'
      },
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
    .on('error', function(err) { // Error handling
      console.error('Error in gulp task:', err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('dist/'))
    .on('end', done); // Signal task completion
});
