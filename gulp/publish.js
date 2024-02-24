const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const fs = require('fs');
const path = require('path');
const git = require('gulp-git');
const { exec } = require('child_process');


function cleanExceptGit() {
  return gulp.src(['./pirate-party-uk.github.io/**/*', '!./pirate-party-uk.github.io/.git', '!./pirate-party-uk.github.io/.git/**/*'])
    .pipe(rimraf({
      async: (file, cb) => {
        const filePath = path.resolve(file.path);
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            cb(null); // Ignore if file doesn't exist
          } else {
            cb(file);
          }
        });
      }
    }));
}

function copyFiles() {
  return gulp.src(['./public/**/*'])
    .pipe(gulp.dest('./pirate-party-uk.github.io'));
}

function gitPublish(done) {
    exec("cd pirate-party-uk.github.io", (err, stdout, stderr) => {
        if (err) {
        console.error(err);
        return;
        }
        console.log(stdout);
    });
    exec("git add .", (err, stdout, stderr) => {
        if (err) {
        console.error(err);
        return;
        }
        console.log(stdout);
    });
    exec("git commit -m \"Publish\"", (err, stdout, stderr) => {
        if (err) {
        console.error(err);
        return;
        }
        console.log(stdout);
    });
    // exec('cd pirate-party-uk.github.io && git add . && git commit -m "Publish" && git push', (err, stdout, stderr) => {
    //     if (err) {
    //     console.error(err);
    //     return;
    //     }
    //     console.log(stdout);
    // });
    done();
     
}


gulp.task('publish', gulp.series(cleanExceptGit, copyFiles, gitPublish));

exports.default = gulp.series(cleanExceptGit, copyFiles, gitPublish);
