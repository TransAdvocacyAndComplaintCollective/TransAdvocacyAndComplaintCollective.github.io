const htmlmin = require("gulp-htmlmin");
const inline = require("gulp-inline");
const gulp = require("gulp");

function inline_code(cb) {
  return gulp
    .src("temp/*.html")
    .pipe(inline({ base: "temp/", disabledTypes: ["svg", "img", "js"] }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("output/"));
}
function inline_code_articles(cb) {
  return gulp
    .src("temp/articles/*.html")
    .pipe(inline({ base: "temp/", disabledTypes: ["svg", "img", "js"] }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("output/articles"));
}
function inline_code_user(cb) {
  return gulp
    .src("temp/user/*.html")
    .pipe(inline({ base: "temp/", disabledTypes: ["svg", "img", "js"] }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("output/user"));
}
exports.inline_code = inline_code;
exports.inline_code_articles = inline_code_articles;
exports.inline_code_user = inline_code_user;
