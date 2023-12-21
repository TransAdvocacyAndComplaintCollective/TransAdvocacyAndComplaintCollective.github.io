var gulp = require("gulp");
var babel = require("gulp-babel");
let webpack = require('webpack-stream');
let path = require('path');

gulp.task("bluildjs", function () {
  return gulp.src(["src/js/*.js","src/js/*.jsx"])
    .pipe(babel({
      presets: ["@babel/preset-env"],
      plugins: ["@babel/plugin-transform-react-jsx"]
    }))
    .pipe(gulp.dest("dist"));
});
outputDir = path.resolve(__dirname, 'build');
gulp.task('webpack', () => {
  return gulp.src('build/')
  .pipe(webpack({
    //  entry: path.resolve(__dirname, 'src/js/register.js'), 
     output: {
      path: outputDir,
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }]
    }}))
  .pipe(gulp.dest('build/'));
});