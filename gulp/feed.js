const gulp = require("gulp");
const fs = require("fs");
const matter = require("gray-matter");
const Feed = require("feed");
const path = require("path");
const { dir } = require("console");
const livereload = require('gulp-livereload');

function createDirectoryIfNotExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Define the source directory for Markdown files
const sourceDir = "src/articles";

// Define the output directory for generated feeds
const outputDir = "output/articles/feeds";

// Gulp task to generate RSS feed
function generate_rss_feed(cb) {
  // Read all Markdown files in the source directory
  const files = fs.readdirSync(sourceDir);

  // Create an empty array to store article objects
  const allArticles = [];

  // Process each Markdown file
  files.forEach((file) => {
    // Read the file contents
    const filePath = `${sourceDir}/${file}`;
    const content = fs.readFileSync(filePath, "utf8");

    // Parse front matter and Markdown content
    const fileMatter = matter(content);
    const articleSlug = file.slice(0, file.length - 3);
    let url_post = "https://ukpirate.party/";
    // Create an article object
    const article = {
      title: fileMatter.title,
      id: url_post,
      link: url_post,
      description: fileMatter.data.summary,
      content: fileMatter.content,
      //   author: [
      //     {
      //       name: "Jane Doe",
      //       email: "janedoe@example.com",
      //       link: "https://ukpirate.party/janedoe",
      //     },
      //     {
      //       name: "Joe Smith",
      //       email: "joesmith@example.com",
      //       link: "https://ukpirate.party/joesmith",
      //     },
      //   ],
      //   contributor: [
      //     {
      //       name: "Shawn Kemp",
      //       email: "shawnkemp@example.com",
      //       link: "https://ukpirate.party/shawnkemp",
      //     },
      //     {
      //       name: "Reggie Miller",
      //       email: "reggiemiller@example.com",
      //       link: "https://ukpirate.party/reggiemiller",
      //     },
      //   ],
      date: fileMatter.data.date,
      // image: fileMatter.data.imageUrl,
    };

    // Push the article to the allArticles array
    allArticles.push(article);
  });
  // Generate the RSS feed
  const feed = new Feed.Feed({
    title: "",
    description: "This is my personal feed!",
    id: "https://ukpirate.party/",
    link: "https://ukpirate.party/",
    language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: "https://ukpirate.party/image.png",
    favicon: "https://ukpirate.party/favicon.ico",
    copyright: "All rights reserved 2013, John Doe",
    updated: new Date(2013, 6, 14), // optional, default = today
    generator: "awesome",
    feedLinks: {
      json: "https://ukpirate.party/json",
      atom: "https://ukpirate.party/atom",
    },
    // author: {
    //   name: "John Doe",
    //   email: "johndoe@example.com",
    //   link: "https://ukpirate.party/johndoe",
    // },
  });
  for (const article of allArticles) {
    feed.addItem(article);
  }
  createDirectoryIfNotExists(`${outputDir}/`);
  fs.writeFileSync(`${outputDir}/feed.rss`, feed.rss2());
  // fs.writeFileSync(`${outputDir}/feed.atom`, feed.atom1());
  fs.writeFileSync(`${outputDir}/feed.json`, feed.json1());
  cb();
}

function generate_rss_feeds(cb) {
  let keywords = [];
  const files = fs.readdirSync(sourceDir);

  files.forEach((file) => {
    const filePath = `${sourceDir}/${file}`;
    const content = fs.readFileSync(filePath, "utf8");
    const fileMatter = matter(content);
    for (const key of fileMatter.data.keywords) {
      if (!(key in keywords)) {
        keywords.push(key);
      }
    }
  });
  keywords.forEach((keyword) => {
    // Read all Markdown files in the source directory for the keyword

    // Create an empty array to store article objects
    const allArticles = [];

    // Process each Markdown file
    files.forEach((file) => {
      // Read the file contents
      const filePath = `${sourceDir}/${file}`;
      const content = fs.readFileSync(filePath, "utf8");

      // Parse front matter and Markdown content
      const parsedContent = matter(content);
      const articleSlug = file.slice(0, file.length - 3);
      let url_post = "";
      // Create an article object
      const article = {
        title: parsedContent.data.title,
        id: url_post,
        link: url_post,
        description: parsedContent.data.summary,
        content: parsedContent.content,
        date: parsedContent.data.date,
        // image: parsedContent.data.imageUrl,
        // author: [
        //   {
        //     name: "John Doe",
        //     email: "johndoe@example.com",
        //     link: "https://ukpirate.party/johndoe",
        //   },
        //   {
        //     name: "Jane Smith",
        //     email: "janesmith@example.com",
        //     link: "https://ukpirate.party/janesmith",
        //   },
        // ],
      };

      // Push the article to the allArticles array
      allArticles.push(article);
    });

    // Generate the RSS feed for the keyword
    const feed = new Feed.Feed({
      title: `${keyword} Feed`,
      description: `News and updates related to ${keyword}`,
      id: `https://ukpirate.party/articles/${keyword}`,
      link: `https://ukpirate.party/articles/${keyword}`,
      language: "en",
      image: "https://ukpirate.party/logo.png",
      favicon: "https://ukpirate.party/favicon.ico",
      copyright: "All rights reserved",
      updated: new Date(),
      generator: "awesome",
      feedLinks: {
        json: `https://ukpirate.party/articles/${keyword}/feed.json`,
        atom: `https://ukpirate.party/articles/${keyword}/feed.atom`,
      },
      // author: {
      //   name: "Example",
      //   email: "contact@example.com",
      //   link: "https://ukpirate.party/",
      // },
    });

    allArticles.forEach((article) => {
      feed.addItem({
        title: article.title,
        id: article.id,
        link: article.link,
        description: article.description,
        content: article.content,
        date: new Date(article.date),
        image: article.image,
        author: article.author,
        contributor: article.contributor,
      });
    });
    createDirectoryIfNotExists(`${outputDir}/feed/${keyword}/`);
    fs.writeFileSync(`${outputDir}/feed/${keyword}/feed.rss`, feed.rss2());
    // fs.writeFileSync(`${outputDir}/${keyword}/feed.atom`, feed.atom1());
    // fs.writeFileSync(`${outputDir}/${keyword}/feed.json`, feed.json1());
  });
  cb();
}

exports.generate_rss_feed = generate_rss_feed;
exports.generate_rss_feeds = generate_rss_feeds;
