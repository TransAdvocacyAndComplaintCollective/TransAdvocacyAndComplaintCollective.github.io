const gulp = require("gulp");
const babel = require('gulp-babel');
let webpack = require('webpack-stream');
const path = require('path');
const outputDir = path.resolve(__dirname, 'build');

function compileReact(cb) {
  return gulp.src('src/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/preset-react']
  }))
  .pipe(gulp.dest(outputDir));
}

  

exports.compileReact = compileReact;
