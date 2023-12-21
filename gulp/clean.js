const gulp = require("gulp");
const fs = require("fs");




function cleanOutputDirectory(cb) {
  console.log("cleanOutputDirectory");
  try {
    fs.rmSync("./output", { recursive: true, force: true });
    cb(null);
  } catch (error) {
    cb(error);
  }
}
function cleanPublicBrDirectory(cb) {
  console.log("cleanPublicBrDirectory");
  try {
    fs.rmSync("public_br", { recursive: true, force: true });
    cb(null);
  } catch (error) {
    cb(error);
  }
}
function cleanPublicGzipDirectory(cb) {
  console.log("cleanPublicGzipDirectory");
  try {
    fs.rmSync("./public_gzip", { recursive: true, force: true });
    cb(null);
  } catch (error) {
    cb(error);
  }
}

// exports.cleanTempDirectory = cleanTempDirectory;
exports.cleanOutputDirectory = cleanOutputDirectory;
exports.cleanOutputDirectory = cleanOutputDirectory;
exports.cleanPublicBrDirectory = cleanPublicBrDirectory;
exports.cleanPublicGzipDirectory = cleanPublicGzipDirectory;
