var gulp = require("gulp");
var style = require("./gulp/style.js");
var sitemap = require("./gulp/sitemap.js");
var js = require("./gulp/js.js");
var images = require("./gulp/images.js");
var html = require("./gulp/html.js");
var feed = require("./gulp/feed.js");
var ejs_main = require("./gulp/ejs_main.js");
var copy = require("./gulp/copy.js");
var compresss = require("./gulp/compresss.js");
var clean = require("./gulp/clean.js");
var markdown = require("./gulp/markdownToGemtext.js");

// Add missing function calls
// markdown.generateArticleGemPages();
// sitemap.sitemap();

// Define tasks
// const task_style = gulp.parallel(style.copyStyle, style.compileSass, style.compileCss);
const task_images = gulp.parallel(images.convertImagesToWebP, images.optimizeSvg, images.copy_image);
const task_ejs = gulp.parallel(
  ejs_main.generateConstitutionHtmlPages,
  ejs_main.generatePolicyHtmlPages,
  ejs_main.generateArticleHtmlList,
  ejs_main.generateArticleHtmlPages,
  ejs_main.generatePaths_user,
  ejs_main.generatePaths_page,
  markdown.generateArticleGemPages

);
const task_feed = gulp.parallel(feed.generate_rss_feed, feed.generate_rss_feeds);
const task_compress = gulp.parallel(compresss.compressHtmlWithBrotli, compresss.compressHtmlWithGzip, compresss.sitemap_gzip_copy);
const task_clean = gulp.parallel(clean.cleanOutputDirectory, clean.cleanOutputDirectory, clean.cleanPublicBrDirectory, clean.cleanPublicGzipDirectory);




// Define build task
exports.build = gulp.series(task_clean, task_images, task_ejs, task_feed, task_compress);
