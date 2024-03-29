const gulp = require("gulp");
const style = require("./gulp/style.js");
const sitemap = require("./gulp/sitemap.js");
const js = require("./gulp/js.js");
const images = require("./gulp/images.js");
const html = require("./gulp/html.js");
const feed = require("./gulp/feed.js");
const ejs_main = require("./gulp/ejs_main.js");
const copy = require("./gulp/copy.js");
const compresss = require("./gulp/compresss.js");
const clean = require("./gulp/clean.js");
const markdown = require("./gulp/markdownToGemtext.js");
const publish = require("./gulp/publish.js");

// Add missing function calls
// markdown.generateArticleGemPages();
// sitemap.sitemap();

// Define tasks
// const task_style = gulp.parallel(style.copyStyle, style.compileSass, style.compileCss);
const task_images = gulp.parallel(
  // images.convertImagesToWebP,
  images.optimizeSvg,
  images.copy_image,
  copy.copyMediaFiles,
  copy.copyMediaFiles,
  copy.copyCssFiles,
  copy.sitemap_copy,
  copy.text_copy,
  copy.robots_copy,
  copy.style_copy,
  js.javascript
  );
const task_ejs = gulp.parallel(
  ejs_main.generateConstitutionHtmlPages,
  ejs_main.generatePolicyHtmlPages,
  ejs_main.generateArticleHtmlList,
  ejs_main.generateArticleHtmlPages,
  ejs_main.generatePaths_user,
  ejs_main.generatePaths_page,
  ejs_main.generatePolicyHtmlPages,
  markdown.generateArticleGemPages

);
const task_feed = gulp.parallel(feed.generate_rss_feed, feed.generate_rss_feeds);
const task_compress = gulp.parallel(compresss.compressHtmlWithBrotli, compresss.compressHtmlWithGzip, compresss.sitemap_gzip_copy);
const task_clean = gulp.parallel(clean.cleanOutputDirectory, clean.cleanOutputDirectory, clean.cleanPublicBrDirectory, clean.cleanPublicGzipDirectory);

// Define build task
exports.build = gulp.series(task_clean, task_images, task_ejs, task_feed, task_compress);
