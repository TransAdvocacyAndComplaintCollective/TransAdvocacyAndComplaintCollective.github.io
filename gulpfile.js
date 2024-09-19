const gulp = require('gulp');
const webpack = require('webpack');  // <-- Import Webpack here
const webpackStream = require('webpack-stream');
const plumber = require('gulp-plumber');
const path = require('path');
const fs = require('fs');
const ReactDOMServer = require('react-dom/server');
const nodeExternals = require('webpack-node-externals');
const ext_replace = require('gulp-ext-replace');
const autoprefixer = require('autoprefixer');
const each = require('gulp-each');
const inline = require('gulp-inline');
const minifyInline = require('gulp-minify-inline');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const markdown = require('markdown-it')();
const matter = require('gray-matter');
const rimraf = require('gulp-rimraf');
const sitemap = require('gulp-sitemap');
const { SitemapAndIndexStream, SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');
const exp = require('constants');

const ARTICLES_PER_PAGE = 10;
const sitemapList = [];

const webpackConfig = {
  mode: "development",
  target: "node",
  externals: [nodeExternals()],
  output: {
    filename: "[name].js",
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.jsx', '.tsx'],
    modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          }
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
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
          'sass-loader'
        ]
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
    ]
  }
};

// Helper function to require modules from a string
function requireFromString(src, filename, rootDir = process.cwd()) {
  const Module = module.constructor;
  const m = new Module(filename, module.parent);
  const filePath = path.resolve(rootDir, filename);
  m.filename = filePath;
  const dirname = path.dirname(filePath);
  m.paths = Module._nodeModulePaths(dirname);
  m._compile(src, filePath);
  return m.exports;
}

// Clean task to remove output and temp directories
function clean(done) {
  const paths = ['output/**/*', 'temp/**/*'].filter(path => fs.existsSync(path));

  if (paths.length === 0) {
    done(); // No paths exist, so just call done.
    return;
  }

  return gulp.src(paths, { read: false, allowEmpty: true })
    .pipe(plumber({
      errorHandler: function (err) {
        console.error('Error in clean task:', err.toString());
        done();
      }
    }))
    .pipe(rimraf())
    .on('end', done);
}

// Task to create necessary directories
function mkdir(done) {
  fs.mkdirSync('./output', { recursive: true });
  fs.mkdirSync('./temp', { recursive: true });
  done();
}

// Updated Task to generate HTML pages from JSX files for articles
function generateArticlePages(done) {
  const articles = [];
  const articlesDir = 'etc/articles';

  // Check if 'articles' directory exists
  if (!fs.existsSync(articlesDir)) {
    console.error(`Directory '${articlesDir}' does not exist. Skipping article generation.`);
    done(); // Call done to indicate task completion
    return;
  }

  fs.mkdirSync('temp/article', { recursive: true });

  const filesInSrcDir = fs.readdirSync(articlesDir);
  filesInSrcDir.forEach(file => {
    const fileExtension = path.extname(file);
    if (fileExtension === '.md') {
      const fileName = path.basename(file, fileExtension);
      const fileContent = fs.readFileSync(path.join(articlesDir, file), 'utf8');
      const { data, content } = matter(fileContent);
      sitemapList.push({
        url: `/article/${fileName}`,
        changefreq: 'daily',
        priority: 0.3,
        lastmod: new Date(data.publishDate),
        news: {
          publication: { name: 'Example Blog', language: 'en' },
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
  const totalPages = Math.max(Math.ceil(articles.length / ARTICLES_PER_PAGE), 1);

  return gulp.src("src/article/ArticleListPage.jsx")
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(each((jsxContent, file, callback) => {
      try {
        const moduleFromJSX = requireFromString(jsxContent.toString(), file.path);
        const ArticleListPage = moduleFromJSX.default || moduleFromJSX;

        for (let page = 0; page < totalPages; page++) {
          const articlesForCurrentPage = articles.slice(page * ARTICLES_PER_PAGE, (page + 1) * ARTICLES_PER_PAGE);
          const App = ArticleListPage({ articles: articlesForCurrentPage, pageNo: page, totalPages });
          const renderedPage = ReactDOMServer.renderToString(App);
          fs.writeFileSync(`temp/article/page-${page}.html`, renderedPage);
        }
        if (totalPages === 0) {
          const App = ArticleListPage({ articles: [], pageNo: 0, totalPages: 1 });
          const renderedPage = ReactDOMServer.renderToString(App);
          fs.writeFileSync(`temp/article/page-0.html`, renderedPage);
        }

        callback(null, jsxContent);
      } catch (err) {
        callback(err);
      }
    }))
    .on('end', done);
}

// Task to generate HTML pages from JSX files for press releases
function generatePressReleasePages(done) {
  const pressReleases = [];
  fs.mkdirSync('temp/press_release', { recursive: true });

  const filesInSrcDir = fs.readdirSync('etc/press_releases');
  filesInSrcDir.forEach(file => {
    const fileExtension = path.extname(file);
    if (fileExtension === '.md') {
      const fileName = path.basename(file, fileExtension);
      const fileContent = fs.readFileSync(path.join("etc",'press_releases', file), 'utf8');
      const { data, content } = matter(fileContent);
      sitemapList.push({
        url: `/press_release/${fileName}`,
        changefreq: 'daily',
        priority: 0.3,
        lastmod: new Date(data.publishDate),
        news: {
          publication: { name: 'Example Blog', language: 'en' },
          publication_date: new Date(data.publishDate),
          title: data.title,
          keywords: data.keywords
        },
        genres: data.keywords,
        title: data.title,
        keywords: data.keywords
      });
      pressReleases.push({ data: { ...data, slug: fileName }, content, fileName });
    }
  });

  pressReleases.sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));
  const totalPages = Math.max(Math.ceil(pressReleases.length / ARTICLES_PER_PAGE), 1);

  return gulp.src("src/press_release/PressReleaseListPage.jsx")
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(each((jsxContent, file, callback) => {
      try {
        const moduleFromJSX = requireFromString(jsxContent.toString(), file.path);
        const PressReleaseListPage = moduleFromJSX.default || moduleFromJSX;

        for (let page = 0; page < totalPages; page++) {
          const pressReleasesForCurrentPage = pressReleases.slice(page * ARTICLES_PER_PAGE, (page + 1) * ARTICLES_PER_PAGE);
          console.log(pressReleases)
          const App = PressReleaseListPage({ pressReleases: pressReleasesForCurrentPage, pageNo: page, totalPages });
          const renderedPage = ReactDOMServer.renderToString(App);
          try {
            fs.writeFileSync(`temp/article/page-${page}.html`, renderedPage);
          } catch (err) {
            console.error(`Error writing file temp/article/page-${page}.html:`, err);
            done(err); // Stop the Gulp task on error
          }
        }
        if (totalPages === 0) {
          const App = PressReleaseListPage({ pressReleases: [], pageNo: 0, totalPages: 1 });
          const renderedPage = ReactDOMServer.renderToString(App);
          fs.writeFileSync(`temp/press_release/page-0.html`, renderedPage);
        }

        callback(null, jsxContent);
      } catch (err) {
        callback(err);
      }
    }))
    .on('end', done);
}

// Task to build static pages
function buildStaticPage(done) {
  const filesInSrcDir = fs.readdirSync('src/');
  const entryPoints = {};

  // Prepare entry points for client-side JavaScript bundles
  filesInSrcDir.forEach(file => {
    const fileExtension = path.extname(file);
    if (['.jsx'].includes(fileExtension)) {
      const fileName = path.basename(file, fileExtension);
      entryPoints[fileName] = path.resolve(__dirname, 'src', file);
    }
  });

  // Generate the client-side bundle using Webpack
  webpack(
    {
      ...webpackConfig,
      entry: entryPoints,
    },
    (err, stats) => {
      if (err || stats.hasErrors()) {
        console.error('Webpack compilation error:', err || stats.toJson().errors);
        done(err || new Error('Webpack compilation error'));
        return;
      }

      // Generate the static HTML files
      gulp.src(['src/*.js', 'src/*.jsx'])
        .pipe(plumber())
        .pipe(
          webpackStream({
            ...webpackConfig,
            target: 'node', // For server-side rendering
            externals: [require('webpack-node-externals')()], // Ignore Node.js built-in modules
          })
        )
        .pipe(
          each((jsxContent, file, callback) => {
            try {
              const moduleFromJSX = requireFromString(jsxContent.toString(), file.path);
              const App = moduleFromJSX.default || moduleFromJSX;

              // Render HTML with SSR
              const renderedPage = ReactDOMServer.renderToString(App({}));

              // Embed the client-side bundle in the HTML
              const htmlWithScript = `
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${path.basename(file.path, '.jsx')}</title>
                  </head>
                  <body>
                    <div id="root">${renderedPage}</div>
                    <script src="/js/${path.basename(file.path, '.jsx')}.js"></script>
                  </body>
                </html>
              `;

              callback(null, htmlWithScript);
            } catch (err) {
              console.error(`Error in file ${file.path}:`, err);
              callback(err);
            }
          })
        )
        .pipe(ext_replace('.html'))
        .pipe(gulp.dest('temp/'))
        .on('end', done);
    }
  );
}
// Task to copy and minify styles
function copyStyles() {
  return gulp.src('src/styles/**/*.css')
    .pipe(purgecss({ content: ['temp/**/*.html'] }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('temp/styles'));
}

// Task to inline CSS and JS in HTML files
function autoInline() {
  return gulp.src('temp/**/*.html')
    .pipe(inline({ base: 'temp/' }))
    .pipe(minifyInline())
    .pipe(ext_replace('.html'))
    .pipe(gulp.dest('output/'));
}

// Task to copy media files to the output directory
function copyMedia() {
  return gulp.src('src/media/**/*', {encoding: false})
    .pipe(gulp.dest('output/media'));
}

// Task to build the sitemap
function buildPlainSiteMap(done) {
  try {
    fs.mkdirSync('./output/sitemap', { recursive: true });

    const sms = new SitemapAndIndexStream({
      getSitemapStream: (i) => {
        const sitemapStream = new SitemapStream({ hostname: 'https://ukpirate.party/' });
        const path = `./output/sitemap/sitemap-${i}.xml`;
        const ws = sitemapStream.pipe(createWriteStream(resolve(path)));
        return [new URL(path, 'https://ukpirate.party/').toString(), sitemapStream, ws];
      },
    });

    sitemapList.forEach(item => sms.write(item));
    sms.end();
    done();
  } catch (err) {
    console.error('Error building sitemap:', err);
    done(err);
  }
}

// Main task sequence
const build = gulp.series(
  clean,
  mkdir,
  copyMedia,
  buildStaticPage,
  generateArticlePages,
  generatePressReleasePages, // New task added here
  copyStyles,
  autoInline,
  buildPlainSiteMap
);

exports.default = build;
exports.clean = clean;
exports.build = build;
