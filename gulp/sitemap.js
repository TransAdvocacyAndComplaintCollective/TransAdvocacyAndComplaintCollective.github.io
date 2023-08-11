const { SitemapAndIndexStream, SitemapStream } = require("sitemap");
const path = require("path");
const fs = require("fs");
const { createWriteStream } = require("fs");
const matter = require("gray-matter");
function createDirectoryIfNotExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}
function sitemap(cb) {
  createDirectoryIfNotExists(path.join(__dirname, `../temp/`));
  const sms = new SitemapAndIndexStream({
    limit: 50000,
    lastmodDateOnly: false,
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
      const path_ = path.join(__dirname, `../temp/sitemap-${i}.xml`);
      const ws = sitemapStream.pipe(createWriteStream(path.resolve(path_)));
      return [
        new URL(path_, "http://ukpirate.party/").toString(),
        sitemapStream,
        ws,
      ];
    },
  });
  let arrayOfSitemapItems = [];
  const articleFilenames = fs.readdirSync("./src/articles");
  articleFilenames.forEach((filename) => {
    console.log(filename);
    const fileContent = fs.readFileSync(`./src/articles/${filename}`, "utf-8");
    const { data, content } = matter(fileContent);
    console.log(data);
    const articleSlug = filename.slice(0, filename.length - 3);
    arrayOfSitemapItems.push({
      url: `/articles/${articleSlug}.html`,
      news: {
        publication: {
          name: "uk pirate party",
          language: "en",
        },
        genres: "PressRelease, Blog",
        publication_date: data.publishData,
        title: data.title,
        keywords: data.Keywords.join(","),
      },
    });
  });
  arrayOfSitemapItems.forEach((item) => sms.write(item));
  sms.end();
  cb();
}
exports.sitemap = sitemap;
