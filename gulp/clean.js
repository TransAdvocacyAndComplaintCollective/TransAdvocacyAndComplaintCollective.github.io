const fs = require("fs")
const gulp = require("gulp");




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
    console.error("Error cleaning public_br directory:", error);
    cb(error);
  }
}

function cleanPublicGzipDirectory(cb) {
  console.log("cleanPublicGzipDirectory");
  try {
    fs.rmSync("./public_gzip", { recursive: true, force: true });
    cb(null);
  } catch (error) {
    console.error("Error cleaning public_gzip directory:", error);
    cb(error);
  }
}
function clean_style(cb) {
  try {
    fs.rmSync("output/styles", { recursive: true, force: true });
    console.log("Temporary directory cleaned successfully.");
    cb(null);
  } catch (error) {
    console.error("Error cleaning temporary directory:", error);
    cb(error);
  }
}

function clean_policy(cb) {
  try {
    fs.rmSync("output/policy", { recursive: true, force: true });
    console.log("Temporary directory cleaned successfully.");
    cb(null);
  } catch (error) {
    console.error("Error cleaning temporary directory:", error);
    cb(error);
  }
}

function clean_media(cb) {
  try {
    fs.rmSync("output/media", { recursive: true, force: true });
    console.log("Temporary directory cleaned successfully.");
    cb(null);
  } catch (error) {
    console.error("Error cleaning temporary directory:", error);
    cb(error);
  }
}

function clean_js(cb) {
  try {
    fs.rmSync("output/js", { recursive: true, force: true });
    console.log("Temporary directory cleaned successfully.");
    cb(null);
  } catch (error) {
    console.error("Error cleaning temporary directory:", error);
    cb(error);
  }
}

function clean_articles(cb) {
  try {
    fs.rmSync("output/articles/", { recursive: true, force: true });
    console.log("Temporary directory cleaned successfully.");
    cb(null);
  } catch (error) {
    console.error("Error cleaning temporary directory:", error);
    cb(error);
  }
}

function clean_media(cb) {
  try {
    fs.rmSync("output/media", { recursive: true, force: true });
    console.log("Temporary directory cleaned successfully.");
    cb(null);
  } catch (error) {
    console.error("Error cleaning temporary directory:", error);
    cb(error);
  }
}



// exports.cleanTempDirectory = cleanTempDirectory;
exports.cleanOutputDirectory = cleanOutputDirectory;
exports.cleanPublicBrDirectory = cleanPublicBrDirectory;
exports.cleanPublicGzipDirectory = cleanPublicGzipDirectory;
exports.clean_style = clean_style;
exports.clean_policy = clean_policy;
exports.clean_media = clean_media;
exports.clean_js = clean_js;
exports.clean_articles = clean_articles;
