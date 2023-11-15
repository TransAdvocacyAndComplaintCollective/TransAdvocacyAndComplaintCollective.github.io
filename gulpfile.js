const gulp = require("gulp");
const git = require("gulp-git");
const clean = require("./gulp/clean.js");
const ejs_main = require("./gulp/ejs_main.js");
const html = require("./gulp/html.js");
const images = require("./gulp/images.js");
const js = require("./gulp/js.js");
const sitemap = require("./gulp/sitemap.js");
const style = require("./gulp/style.js");
const copy = require("./gulp/copy.js");
const gemtext = require("./gulp/markdownToGemtext.js");
const feed = require("./gulp/feed.js");
const compresss = require("./gulp/compresss.js");
const livereload = require('gulp-livereload');
// const clean_ = gulp.parallel(
//   clean.cleanTempDirectory,
//   clean.cleanOutputDirectory,
//   clean.cleanPublicBrDirectory,
//   clean.cleanPublicGzipDirectory
// );


const ArticleGen = gulp.parallel(
  ejs_main.generateArticleHtmlList,
  ejs_main.generateArticleHtmlPages,
  gemtext.generateArticleGemPages,
  feed.generate_rss_feed,
  feed.generate_rss_feeds,
  sitemap.genSitemap,
);
const SytleGen = gulp.parallel(
  style.compileCss,
  style.compileSass,
);
const PolicyGen = gulp.parallel(

  ejs_main.generatePolicyHtmlPages,
);
const buildImage = gulp.parallel(
  images.optimizeSvg,
  images.convertImagesToWebP,
  images.copy_image
);
const buildViews = gulp.parallel(
  ejs_main.generateArticleHtmlList,
  ejs_main.generateArticleHtmlPages,
  ejs_main.generatePolicyHtmlPages,
  ejs_main.generatePaths_user,
  ejs_main.generatePaths_page
);

exports.build = gulp.series(
  gulp.parallel(
    PolicyGen,
    ArticleGen,
    SytleGen,
    ejs_main.generatePaths_user,
    js.javascript,
    buildImage,
    ejs_main.generatePaths_user,
    ejs_main.generatePaths_page
  ),
  gulp.parallel(
    style.compileSass,
    style.compileCss,
    copy.copyMediaFiles,
    copy.copyCssFiles,
    copy.text_copy,
    copy.robots_copy,
    copy.style_copy,
    html.inline_code,
    html.inline_code_articles,
    html.inline_code_user
  )
);

exports.gitpull = gulp.series(function (done) {
  const subdirs = ["src/policy/", "src/constitution"]; // Remove trailing slashes

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
exports.buildJavascript = gulp.series(clean.clean_js, js.javascript);
exports.buildArticle = gulp.series(clean.clean_articles, ArticleGen);
exports.buildSytle = gulp.series(clean.clean_style, SytleGen);
exports.buildPolicy = gulp.series(clean.clean_policy, PolicyGen);
exports.buildBuildImage = gulp.series(clean.clean_media, buildImage);
exports.buildBuildViews = gulp.series(buildViews);
// exports.clean = clean_;
exports.watch = function () {
  livereload.listen();
  // Define tasks and watchers for various file changes
  gulp.watch('src/js/', gulp.series(clean.clean_js, js.javascript));
  gulp.watch("src/articles", gulp.series(clean.clean_articles, ArticleGen));
  gulp.watch("src/styles", gulp.series(clean.clean_style, SytleGen));
  gulp.watch("src/policy", gulp.series(clean.clean_policy, PolicyGen));
  gulp.watch("src/media", gulp.series(clean.clean_media, buildImage));
  gulp.watch("src/views", gulp.series(buildViews));
};