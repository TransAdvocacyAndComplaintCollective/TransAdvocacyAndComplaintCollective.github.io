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
const gemtext = require("./gulp/markdownToGemtext.js");
const gulp = require("gulp");
const git = require("gulp-git");

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
  gemtext.generateArticleGemPages,
  feed.generate_rss_feed,
  feed.generate_rss_feeds
);
const buildPage = gulp.parallel(ejs_main.generatePaths_user);
const buildImages = gulp.parallel(js.compile_react);
const buildJs = gulp.parallel(images.optimizeSvg, images.convertImagesToWebP, images.copy_image);
exports.build = gulp.series(
  clean_,
  //temp
  gulp.parallel(
    style.compileSass,
    style.compileCss,
    sitemap.sitemap,
    // ejs_main.generateConstitutionHtmlPages,
    ejs_main.generatePolicyHtmlPages,
    buildArticles,
    buildPage,
    buildImages,
    buildJs,
    ejs_main.generatePaths_user,
    ejs_main.generatePaths_page
  ),
  //output

  gulp.parallel(
    style.copyStyle,
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

exports.git_pull = gulp.series(function (done) {
  const subdirs = ["src/policy/", "src/constitution/"]; // Array of subdirectories to perform git pull on

  subdirs.forEach((subdir) => {
    git.pull("origin", "master", { cwd: subdir }, (err) => {
      if (err) {
        console.error(`Error pulling ${subdir}:`, err);
      } else {
        console.log(`Pulled ${subdir} successfully.`);
      }
    });
  });

  done();
});

exports.clean = clean_;
