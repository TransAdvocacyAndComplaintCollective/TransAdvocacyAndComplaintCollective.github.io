// const svgo = require("gulp-svgo");
// const webp = require("gulp-webp");
const gulp = require("gulp");
const cwebp = require('gulp-cwebp');
const livereload = require('gulp-livereload');

function convertImagesToWebP(cb) {
  return gulp
    .src("src/public/media/*.{png,jpeg,gif,apng}")
    //
    .pipe(cwebp())
    .pipe(gulp.dest("output/media/")).pipe(livereload());
}
function optimizeSvg(cb) {
  return gulp
    .src("src/public/media/*.svg")
    // .pipe(svgo())
    .pipe(gulp.dest("output/media/")).pipe(livereload());
}
function copy_image(cb) {
  return gulp
    .src("src/public/media/*.{png,jpeg,gif,apng}")
    .pipe(gulp.dest("output/media/")).pipe(livereload());
}

exports.convertImagesToWebP = convertImagesToWebP;
exports.optimizeSvg = optimizeSvg;
exports.copy_image = copy_image;
