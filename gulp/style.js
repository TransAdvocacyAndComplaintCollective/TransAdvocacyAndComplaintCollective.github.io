const gulp = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sass = require("gulp-sass")(require("sass"));
function compileCss(cb) {
  var plugins = [autoprefixer()];
  return gulp
    .src("src/styles/*.css")
    .pipe(postcss(plugins))
    .pipe(gulp.dest("temp/styles/"));
}
function compileSass(cb) {
  var plugins = [autoprefixer()];
  return gulp
    .src("src/styles/*.scss")
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulp.dest("temp/styles/"));
}
function copyStyle(cb) {
  return gulp.src("temp/styles/**/*.css").pipe(gulp.dest("output/styles/"));
}
exports.compileCss = compileCss;
exports.compileSass = compileSass;
exports.copyStyle = copyStyle;
