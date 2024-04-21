const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const fs = require('fs');
const plumber = require('gulp-plumber');
const path = require('path');
const ReactDOMServer = require('react-dom/server');
const nodeExternals = require('webpack-node-externals');
const ext_replace = require('gulp-ext-replace');
const autoprefixer = require('autoprefixer');
const each = require('gulp-each');
const inline = require('gulp-inline');
const minifyCss = require('gulp-minify-css');
const minifyInline = require('gulp-minify-inline');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const markdown = require('markdown-it')();
const matter = require('gray-matter');
const htmlmin = require('gulp-htmlmin');
const { dest } = require('gulp-dest');
const md = require('markdown-it')({});
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const sitemap = require('gulp-sitemap');
const {
  simpleSitemapAndIndex
} = require('sitemap')
const { title } = require('process');
let sitemap_list = []

const webpackConfigSaver = {
  mode: "development",
  target: "node", // Set target to 'node'
  externals: [nodeExternals()],
  output: {
    filename: "[name].js",
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.jsx', ".tsx"],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // Adjust as needed
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/proposal-class-properties", "babel-plugin-inline-import", "babel-plugin-transform-scss", "babel-plugin-css-modules-transform",
              ["preprocessor", {
                "symbols": { "IS_BROWSER": false },
              }]]
          }
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }
        ]
      }
    ],
  }
}



function requireFromString(src, filename, rootDir = process.cwd()) {
  const Module = module.constructor;
  const m = new Module(filename, module.parent);
  const filePath = path.resolve(rootDir, filename);

  // Set the filename relative to the root directory
  m.filename = filePath;

  // Mimic the behavior of require by adding the directory of the file to the module search paths
  const dirname = path.dirname(filePath);
  m.paths = Module._nodeModulePaths(dirname);

  // Compile the source code
  m._compile(src, filePath);

  return m.exports;
}


function requireFromString(src, filename, rootDir = process.cwd()) {
  const Module = module.constructor;
  const m = new Module(filename, module.parent);
  const filePath = path.resolve(rootDir, filename);

  // Set the filename relative to the root directory
  m.filename = filePath;

  // Mimic the behavior of require by adding the directory of the file to the module search paths
  const dirname = path.dirname(filePath);
  m.paths = Module._nodeModulePaths(dirname);

  // Compile the source code
  m._compile(src, filePath);

  return m.exports;
}


function generateArticlePages(done) {
  const articles = [];
  const ARTICLES_PER_PAGE = 10;
  fs.mkdirSync('temp/article', { recursive: true });
  const filesInSrcDir = fs.readdirSync('src/articles');

  filesInSrcDir.forEach(file => {
    const fileExtension = path.extname(file);
    if (fileExtension === '.md') {
      const fileName = path.basename(file, fileExtension);
      const fileContent = fs.readFileSync(path.join('src/articles', file), 'utf8');
      const { data, content } = matter(fileContent);
      sitemap_list.push({
        url: `/article/${fileName}`,
        changefreq: 'daily',
        priority: 0.3,
        lastmod: new Date(data.publishDate),
        news: {
          publication: {
            name: 'Example Blog',
            language: 'en'
          },
          publication_date: new Date(data.publishDate),
          title: data.title,
          keywords: data.keywords
        },
        genres: data.keywords,
        title: data.title,
        keywords: data.keywords
      });
      articles.push({ data: { ...data, slug: fileName }, content, fileName });
    }
  });

  articles.sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  return gulp.src(["src/article/ArticleListPage.jsx"])
    .pipe(plumber())
    .pipe(webpackStream(webpackConfigSaver))
    .pipe(each(function (jsxContent, file, callback) {
      for (let page = 0; page < totalPages; page++) {
        const articlesForCurrentPage = articles.slice(
          page * ARTICLES_PER_PAGE,
          (page + 1) * ARTICLES_PER_PAGE
        );

        const moduleFromJSX = requireFromString(jsxContent.toString(), file.path);
        const App = moduleFromJSX.default({ 
          articles: articlesForCurrentPage,
          pageNo: page,
          totalPages
        });
        const renderedPage = ReactDOMServer.renderToString(App);
        fs.writeFileSync(`temp/article/page-${page}.html`, "<!DOCTYPE html>" + renderedPage);
      }
      callback(null, jsxContent);
    })).on('end', done);
}





function generateArticles(done) {
  let articles = {};
  return gulp.src(["src/article/ArticlePage.jsx"])
    .pipe(plumber())
    .pipe(webpackStream({ ...webpackConfigSaver }))
    .pipe(each((articleJSXContent, file, callback) => {
      gulp.src(["src/articles/*.md"]).
        pipe(plumber())
        .pipe(each((content, file, callback) => {
          const { data, content: markdownText } = matter(content.toString());
          const htmlContent = markdown.render(markdownText);
          articles[file.path] = { ...data, htmlContent };
          const articleModule = requireFromString(articleJSXContent.toString(), file.path);
          const ArticleComponent = articleModule.default({
            article: {
              id: file.path,
              imageUrl: data.imageUrl,
              imageAlt: data.imageAlt,
              title: data.title,
              filename: "article.html",
              slug: data.slug,
              summary: data.summary,
              tags: data.keywords,
              name: data.author[0].name,
              datePublished: new Date(Date.parse(data.publishDate)),
              htmlContent,
            }
          });
          const renderedArticle = ReactDOMServer.renderToString(ArticleComponent);
          callback(null, "<!DOCTYPE html>" + renderedArticle);
        }))
        // .pipe(inline({
        //   // js: uglify,
        //   css: [minifyCss],
        //   svg
        //   base: 'src/styles/'
        // }))
        // .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(minifyInline())
        .pipe(ext_replace('.html'))
        .pipe(gulp.dest("temp/article/")).on('end', () => { done() });

    }))
}



function buildStaticPage(done) {
  const filesInSrcDir = fs.readdirSync('src/');
  const entryPoints = {};

  filesInSrcDir.forEach(file => {
    const fileExtension = path.extname(file);
    if (['.jsx'].includes(fileExtension)) {
      const fileName = path.basename(file, fileExtension);
      entryPoints[fileName] = path.resolve(__dirname, 'src', file);

    }
  });

  return gulp.src(["src/*.jsx"])
    .pipe(plumber())
    .pipe(webpackStream({ ...webpackConfigSaver, entry: entryPoints }))
    .pipe(plumber())
    .pipe(ext_replace('.html'))
    .pipe(each((jsxContent, file, callback) => {
      const moduleFromJSX = requireFromString(jsxContent.toString(), file.path);
      const App = moduleFromJSX.default({});
      const renderedPage = ReactDOMServer.renderToString(App);
      callback(null, "<!DOCTYPE html>" + renderedPage);
    }))
    .pipe(gulp.dest("temp/"));
}

function copyStyles() {
  return gulp.src('src/styles/bootstrap.css')
    .pipe(purgecss({
      content: ['temp/**/*.html']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('temp/styles'));
}

function copyJsx(done) {
  let articles = {};
  return gulp.src(["src/*.jsx"])
    .pipe(gulp.dest("temp/"));
}
function autoInline(done) {
  return gulp.src('temp/**/*.html')
    .pipe(inline({
      js: uglify,
      css: [minifyCss],
      base: 'temp/'
    }))
    .pipe(each(function (content, file, callback) {
      sitemap_list.push({
        url: file.path.replace(file._base, ""),
      });
      callback(null, content);
    }))
    .pipe(htmlmin())
    .pipe(minifyInline())
    .pipe(replace(/(\[.*\]\()([\w\/\+\.]+)(\.md\))/g, '$1$2.html$3')) // Replace .md with .html in URLs
    .pipe(gulp.dest('output/'));
}
function copycss() {
  return gulp.src('src/styles/*.css')
    .pipe(purgecss({
      content: ['temp/**/*.html']
    }))
    .pipe(gulp.dest('temp/styles'));
}


function generatePolicy(done) {
  fs.mkdirSync('./output/policy', { recursive: true });
  let articles = {};

  gulp.src(["src/docs/main.jsx"])
    .pipe(plumber())
    .pipe(webpackStream(webpackConfigSaver))
    .pipe(each(function (articleJSXContent, file, callback) {
      gulp.src(["policy/**/*.md"])
        .pipe(each(function (content, file, callback) {
          const { data, content: markdownText } = matter(content.toString());
          const htmlContent = markdown.render(markdownText);

          // Modify URLs in anchor tags to point to HTML files
          const modifiedHtmlContent = htmlContent.replace(/<a href="([^"]+).md"/g, '<a href="$1.html"');

          articles[file.path] = { ...data, htmlContent: modifiedHtmlContent };
          const xpath = file.path.replace(file._base, "");
          const articleModule = requireFromString(articleJSXContent.toString(), file.path);
          const ArticleComponent = articleModule.default({
            doc: {
              main: modifiedHtmlContent // Use the modified HTML content
            }
          });
          const renderedArticle = ReactDOMServer.renderToString(ArticleComponent);
          // fs.writeFileSync(`./output/policy${xpath}`, "<!DOCTYPE html>" + renderedArticle);
          callback(null, "<!DOCTYPE html>" + renderedArticle);
        }))
        .pipe(ext_replace('.html'))
        .pipe(gulp.dest("temp/policy"))
    }))
  done();
}


function copyMedia() {
  return gulp.src('src/media/**/*')
    .pipe(gulp.dest('output/media'));
}

function clean() {
  fs.rmdirSync('output', { recursive: true });
  fs.rmdirSync('temp', { recursive: true });
  fs.mkdirSync('output', { recursive: true });
  fs.mkdirSync('temp', { recursive: true });
  return Promise.resolve();
}
function mkdir(done) {
  fs.mkdirSync('./output', { recursive: true });
  fs.mkdirSync('./temp', { recursive: true });
  done();
}


function copyToOutput() {
  return gulp.src('temp/**/*')
    .pipe(gulp.dest('output/'));
}

function buildPlainSiteMap(cb) {
  simpleSitemapAndIndex({
    hostname: 'https://example.com',
    destinationDir: './output/sitemap',
    sourceData: [...sitemap_list],
  }).then(() => {
    cb()
  })
}

exports.default = gulp.series(clean, copyMedia, mkdir, buildStaticPage, generateArticlePages, generatePolicy, copyJsx, generateArticles, copyStyles, copycss, autoInline, copyToOutput, buildPlainSiteMap);
exports.clean = clean;
exports.mkdir = mkdir;