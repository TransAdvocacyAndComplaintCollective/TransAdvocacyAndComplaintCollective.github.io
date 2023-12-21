const gulp = require("gulp");
const babel = require('gulp-babel');
let webpack = require('webpack-stream');
const path = require('path');
const outputDir = path.resolve(__dirname, 'build');

function compileJS(file, _, cb) {
  console.log(file);
}


function compileReact(cb) {
  return gulp.src('src/js/**/*.js')
  .pipe(compileJS)
}

  

exports.compileReact = compileReact;
