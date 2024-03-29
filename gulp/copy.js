const gulp = require("gulp");
function copyMediaFiles(cb) {
  return gulp
    .src("src/media/*.{png,jpeg,gif,webp,apng,svg}")
    .pipe(gulp.dest("output/media/"));
}
function copyCssFiles(cb) {
  return gulp
    .src("temp/styles/**/*.{css,.min.css}")
    .pipe(gulp.dest("output/styles/"));
}
function sitemap_copy(cb) {
  return gulp.src("src/*.xml").pipe(gulp.dest(`output/`));
}
function text_copy(cb) {
  return gulp.src("src/*.txt").pipe(gulp.dest(`output/`));
}
function robots_copy(cb) {
  return gulp.src("src/*.txt").pipe(gulp.dest(`output/`));
}

function style_copy(cb) {
  return gulp.src("temp/style/**.css").pipe(gulp.dest(`output/style/`));
}
function copytoPages(cb) {
  return gulp.src("output/**/*").pipe(gulp.dest("pirate-party-uk.github.io/"));
}
exports.copyMediaFiles = copyMediaFiles;
exports.copyCssFiles = copyCssFiles;
exports.sitemap_copy = sitemap_copy;
exports.text_copy = text_copy;
exports.robots_copy = robots_copy;
exports.style_copy = style_copy;
exports.copytoPages = copytoPages;