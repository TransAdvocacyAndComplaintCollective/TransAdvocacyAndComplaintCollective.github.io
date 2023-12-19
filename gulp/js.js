const gulp = require("gulp");
const tap = require('gulp-tap');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');
const esm = require('esm')(module);
const babel = require('gulp-babel');
// function compileReact() {
//   return gulp.src('src/**/*.jsx', { read: false })
//     .pipe(tap(function (file) {
//       // Load esm if necessary (you might not need this depending on your setup)

//       const b = browserify({
//         entries: file.path,
//         debug: true,
//         paths: ['/home/lucy/Code/website/src/js', './src/js/components', './src/js/', "./node_modules"]
//       })
//         .transform(babelify.configure({
//           only: ['src/js/components', 'src/js'],
//           targets: {
//             "esmodules": true
//           },
//           sourceType: 'module',
//           presets: ["@babel/preset-env", "@babel/preset-react"],
//           plugins: ["@babel/plugin-transform-react-display-name", "@babel/plugin-syntax-jsx"],
//         }));

//       // Bundle after applying the transform
//       file.contents = b.bundle();
//     }))
//     .pipe(buffer())
//     .pipe(sourcemaps.init({ loadMaps: true }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('output/js'));
// }
function compileReact() {
  return gulp.src('src/**/*.jsx')
  .pipe(babel({

    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["@babel/plugin-transform-react-display-name", "@babel/plugin-syntax-jsx","babel-plugin-react-css-modules"],
  }
  ))
  .pipe(gulp.dest('outpuit'));
}


exports.compile_react = compileReact;
