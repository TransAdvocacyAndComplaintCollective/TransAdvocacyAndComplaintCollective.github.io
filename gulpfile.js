const feed = require("./gulp/feed.js");
const compresss = require("./gulp/compresss.js");
const copy = require("./gulp/copy.js");
const ejs_main = require("./gulp/ejs_main.js");
const html = require("./gulp/html.js");
const images = require("./gulp/images.js");
const js = require("./gulp/js.js");
const sitemap = require("./gulp/sitemap.js");
const style = require("./gulp/style.js");
const clean = require("./gulp/clean.js");
const gulp = require("gulp");

const clean_ = gulp.parallel(
  clean.cleanTempDirectory,
  clean.cleanOutputDirectory,
  clean.cleanOutputDirectory,
  clean.cleanPublicBrDirectory,
  clean.cleanPublicGzipDirectory
);
const buildArticles = gulp.parallel(
  ejs_main.generateArticleHtmlList,
  ejs_main.generateArticleHtmlPages,
  feed.generate_rss_feed,
  feed.generate_rss_feeds
);
const buildPage = gulp.parallel(ejs_main.generatePaths_user);
const buildImages = gulp.parallel(js.compile_react);
const buildJs = gulp.parallel(images.convertImagesToWebP, images.optimizeSvg);
exports.build = gulp.series(
  clean_,
  //temp
  gulp.parallel(
    style.compileCss,
    sitemap.sitemap,
    buildArticles,
    buildPage,
    buildImages,
    buildJs,
    ejs_main.generatePaths_user,
    ejs_main.generatePaths_page
  ),
  //output

  gulp.parallel(
    copy.copyMediaFiles,
    copy.copyCssFiles,
    copy.sitemap_copy,
    copy.text_copy,
    copy.robots_copy,
    copy.style_copy,
    html.inline_code,
    html.inline_code_articles,
    html.inline_code_user
  ),
  //comprees
  gulp.parallel(
    compresss.compressHtmlWithBrotli,
    compresss.compressHtmlWithGzip,
    compresss.sitemap_gzip_copy
  )
);
exports.clean = clean_;
