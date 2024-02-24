const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const fs = require('fs');
const path = require('path');
const git = require('gulp-git');

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
    console.log('Starting gitPublish...');
    git.exec({args: 'add .'}, function(err) {
        if (err) {
            console.error('Error adding files:', err);
            return done(err);
        }
        git.exec({args: 'commit -m "Update"'}, function(err) {
            if (err) {
                console.error('Error committing changes:', err);
                return done(err);
            }
            git.exec({args: 'push origin master'}, function(err) {
                if (err) {
                    console.error('Error pushing changes:', err);
                    return done(err);
                }
                console.log('Push successful!');
                done();
            });
        });
    });
}

gulp.task('publish', gulp.series(cleanExceptGit, copyFiles, gitPublish));

exports.default = gulp.series(cleanExceptGit, copyFiles, gitPublish);
