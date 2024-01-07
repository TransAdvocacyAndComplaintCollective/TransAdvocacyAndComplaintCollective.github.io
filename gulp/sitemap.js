const { SitemapAndIndexStream, SitemapStream, simpleSitemapAndIndex } = require("sitemap");
const path = require("path");
const fs = require("fs");
const livereload = require('gulp-livereload');
const { createWriteStream } = require("fs");
const matter = require("gray-matter");
function createDirectoryIfNotExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}


function GenSitemap(cb) {
  createDirectoryIfNotExists(path.join(__dirname, `../output/`));

  const sms = new SitemapAndIndexStream({
    limit: 50000,
    getSitemapStream: (i) => {
      const sitemapStream = new SitemapStream({
        hostname: "http://ukpirate.party/",
        lastmodDateOnly: false,
        xmlns: {
          news: true,
          xhtml: true,
          image: false,
          video: false,
        },
      });
      const path_ = path.join(__dirname, `../output/sitemap-${i}.xml`);
      console.log(path_);
      const ws = sitemapStream.pipe(createWriteStream(path_));
      return [
        new URL(`http://ukpirate.party/sitemap-${i}.xml`).toString(),
        sitemapStream,
        ws,
      ];
    },
  });
  let arrayOfSitemapItems = [];
  const articleFilenames = fs.readdirSync("./src/articles");
  articleFilenames.forEach((filename) => {
    const fileContent = fs.readFileSync(`./src/articles/${filename}`, "utf-8");
    const { data, content } = matter(fileContent);
    const articleSlug = filename.slice(0, filename.length - 3);
    arrayOfSitemapItems.push({
      url: `/articles/${articleSlug}.html`,
      news: {
        publication: {
          name: "Pirate Party UK",
          language: "en",
        },
        genres: "PressRelease, Blog",
        publication_date: new Date(data.publishDate),
        title: data.title,
        keywords: data.keywords.join(', '),
      },
    });
  });
  arrayOfSitemapItems.forEach((item) => sms.write(item));
  sms.end();
  cb();
}
exports.genSitemap = GenSitemap;
