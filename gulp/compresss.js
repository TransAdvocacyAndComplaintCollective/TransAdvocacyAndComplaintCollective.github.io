const gulp = require("gulp");
const zlib = require("zlib");
const gzip = require("gulp-gzip");
const gulpBrotli = require("gulp-brotli");

function compressHtmlWithBrotli(cb) {
  console.log("compressHtmlWithBrotli")
  return gulp
    .src("output/**")
    .pipe(
      gulpBrotli({
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]:
            zlib.constants.BROTLI_MAX_QUALITY,
        },
      })
    )
    .pipe(gulp.dest(`public_br/`));
}
function compressHtmlWithGzip(cb) {
  console.log("compressHtmlWithGzip")
  return gulp
    .src("output/**")
    .pipe(gzip({ postExtension: "gz", gzipOptions: { level: 9 } }))
    .pipe(gulp.dest(`public_gzip/`));
}

function sitemap_gzip_copy(cb) {
  console.log("sitemap_gzip_copy")
  return gulp
    .src("output/*.xml")
    .pipe(gzip({ postExtension: "gz", gzipOptions: { level: 9 } }))
    .pipe(gulp.dest(`public_gzip/`));
}

exports.compressHtmlWithBrotli = compressHtmlWithBrotli;
exports.compressHtmlWithGzip = compressHtmlWithGzip;
exports.sitemap_gzip_copy = sitemap_gzip_copy;
