const { SitemapAndIndexStream, SitemapStream } = require("sitemap");
const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");

function createDirectoryIfNotExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

function GenSitemap(cb) {
  createDirectoryIfNotExists(path.join(__dirname, `../output/`));
  let arrayOfSitemapItems = []

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
      const ws = sitemapStream.pipe(fs.createWriteStream(path_));
      return [
        new URL(`http://ukpirate.party/sitemap-${i}.xml`).toString(),
        sitemapStream,
        ws,
      ];
    },
  });

  try {
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
          publication_date: data.publishDate ? new Date(data.publishDate) : new Date(),
          title: data.title || "Untitled",
          keywords: data.keywords ? data.keywords.join(', ') : "",
        },
      });
    });
    arrayOfSitemapItems.forEach((item) => sms.write(item));
    sms.end();
    cb();
  } catch (error) {
    console.error("Error generating sitemap:", error);
    cb(error);
  }
  cb();
}

exports.genSitemap = GenSitemap;
