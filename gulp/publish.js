const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const git = require('gulp-git');
const { execSync } = require('child_process');


function cleanExceptGit() {
    // loop through all files in the output directory
    fs.readdirSync('./pirate-party-uk.github.io').forEach(file => {
        // if the file is not .git, delete it
        if (file !== '.git') {
            fs.rmSync(path.join('./pirate-party-uk.github.io', file), { recursive: true });
        }
    });
    return Promise.resolve();
  }
  
  

function copyFiles() {
  return gulp.src(['./output/**/*'])
    .pipe(gulp.dest('./pirate-party-uk.github.io'));
}


function gitPublish(done) {
    try {
        const statusOutput = execSync("git status --porcelain", { cwd: "pirate-party-uk.github.io" }).toString().trim();       
        // Check if there are changes to commit
        if (statusOutput) {
            execSync("git add .", { cwd: "pirate-party-uk.github.io" });
            execSync("git commit  --allow-empty -m \"Publish\"", { cwd: "pirate-party-uk.github.io" });
            execSync("git push", { cwd: "pirate-party-uk.github.io" });
        } else {
            console.log("No changes to commit");
        }
    }
    catch (e) {
        console.error("Error:", e);
    }
    done();
}


gulp.task('publish', gulp.series(cleanExceptGit,copyFiles,gitPublish));

exports.default = gulp.series(cleanExceptGit, copyFiles,gitPublish);
