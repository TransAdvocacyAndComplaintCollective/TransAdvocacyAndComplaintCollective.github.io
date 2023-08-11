/*
 * This file contains a set of functions for generating HTML pages
 * from Markdown files and EJS templates using Gulp, EJS, Markdown-it,
 * and gray-matter libraries. The generated HTML pages are saved
 * in the "temp" directory.
 */

const MarkdownIt = require("markdown-it");
const matter = require("gray-matter");
const ejs = require("gulp-ejs");
const ejsCompiler = require("ejs");
const path = require("path");
const fs = require("fs");
const gulp = require("gulp");
const each = require("gulp-each");
const rename = require("gulp-rename");
const fsPromises = fs.promises;

const ARTICLES_PER_PAGE = 5;

// a fix that that will allow ejs to load files from the file system
let myFileLoader = function (filePath) {
  let data = fs.readFileSync(filePath);
  return data;
};
ejsCompiler.fileLoader = myFileLoader;

// Generate a list of all articles and create an HTML page for each set of articles
function generateArticleHtmlList(cb) {
  fsPromises.mkdir("./temp/").catch(() => {});
  fsPromises.mkdir("./temp/articles").catch(() => {});
  const md = new MarkdownIt();
  const articlesPath = path.join(__dirname, "../src/articles");
  const articleFilenames = fs.readdirSync(articlesPath);
  const indexArticlePath = path.join(
    __dirname,
    "../src/views/articles/index.ejs"
  );
  const indexArticleContent = fs.readFileSync(indexArticlePath, "utf-8");
  const articleDataList = [];

  // Read each article file, extract metadata, and render Markdown to HTML
  articleFilenames.forEach((filename) => {
    const filePath = path.join(__dirname, `../src/articles/${filename}`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const htmlContent = md.render(content);
    const articleSlug = filename.slice(0, -3);
    const pageData = {
      imageUrl: data.imageUrl,
      imageAlt: data.imageAlt,
      title: data.title,
      filename: articleSlug,
      slug: data.slug,
      summary: data.summary,
      tags: data.Keywords.join(","),
      name: data.author[0].name,
      datePublished: new Date(data.publishData),
      htmlContent,
    };
    articleDataList.push(pageData);
  });

  // Sort articles by datePublished in descending order
  articleDataList.sort((a, b) => b.datePublished - a.datePublished);
  const totalPages = Math.ceil(articleDataList.length / ARTICLES_PER_PAGE);
  const htmlPagesPromises = [];

  // Generate HTML pages with a subset of articles per page
  for (let page = 0; page < totalPages; page++) {
    const articlesForCurrentPage = articleDataList.slice(
      page * ARTICLES_PER_PAGE,
      (page + 1) * ARTICLES_PER_PAGE
    );

    // Render the EJS template with the article data
    const renderedPage = ejsCompiler.render(
      indexArticleContent,
      {
        articles: articlesForCurrentPage,
        page,
        hasNextPage: page < totalPages - 1,
      },
      {
        views: [path.join(__dirname, "../src/views/")],
        root: path.join(__dirname, "../src/views"),
      }
    );

    // Write the rendered page to an HTML file
    const htmlFilePath = path.join(
      __dirname,
      "../temp/articles",
      `${page}.html`
    );
    const writeHtmlPromise = fs.promises.writeFile(htmlFilePath, renderedPage);
    htmlPagesPromises.push(writeHtmlPromise);
  }

  // Wait for all HTML pages to be written before invoking the callback
  Promise.all(htmlPagesPromises)
    .then(() => cb(null))
    .catch((error) => cb(error));
}

// Generate HTML pages for each article using Markdown content and an EJS template
function generateArticleHtmlPages(cb) {
  const md = new MarkdownIt();
  const indexArticleTemplate = fs.readFileSync(
    path.join(__dirname, "../src/views/articles/show.ejs"),
    "utf-8"
  );

  return gulp
    .src("./src/articles/*.md")
    .pipe(
      each(function (content, file, callback) {
        const { data, content: markdownContent } = matter(content);
        const htmlContent = md.render(markdownContent);
        const fileHistory = file.history[0];
        const articleSlug = fileHistory.slice(0, -3);

        // Render the EJS template with the article data
        const renderedPage = ejsCompiler.render(
          indexArticleTemplate,
          {
            article: {
              imageUrl: data.imageUrl,
              imageAlt: data.imageAlt,
              title: data.title,
              filename: articleSlug,
              slug: data.slug,
              summary: data.summary,
              tags: data.Keywords.join(","),
              name: data.author[0].name,
              datePublished: new Date(data.publishData),
              htmlContent,
            },
          },
          {
            views: [path.join(__dirname, "../src/views/")],
            root: path.join(__dirname, "../src/views"),
          }
        );

        callback(null, renderedPage);
      })
    )
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("./temp/articles/"));
}

// Generate HTML pages for user-specific paths
function generatePaths_user(cb) {
  return gulp
    .src("./src/views/user/*.ejs")
    .pipe(
      ejs(
        {},
        {
          views: [path.join(__dirname, "../src/views/")],
          root: path.join(__dirname, "../src/views"),
        }
      )
    )
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("temp/user/"));
}

// Generate HTML pages for non-user paths
function generatePaths_page(cb) {
  return gulp
    .src("./src/views/page/*.ejs")
    .pipe(
      ejs(
        {},
        {
          views: [path.join(__dirname, "../src/views/")],
          root: path.join(__dirname, "../src/views"),
        }
      )
    )
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("temp/"));
}

// Export the functions as Gulp tasks
exports.generateArticleHtmlList = generateArticleHtmlList;
exports.generateArticleHtmlPages = generateArticleHtmlPages;
exports.generatePaths_user = generatePaths_user;
exports.generatePaths_page = generatePaths_page;
