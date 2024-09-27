const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const plumber = require('gulp-plumber');
const path = require('path');
const fs = require('fs');
const rimraf = require('gulp-rimraf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const matter = require('gray-matter');
const each = require('gulp-each');
const inline = require('gulp-inline');
const minifyInline = require('gulp-minify-inline');
const purgecss = require('gulp-purgecss');
const cleanCSS = require('gulp-clean-css');
const ext_replace = require('gulp-ext-replace');
const glob = require('glob'); // Make sure to require 'glob' at the top
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const requireFromString = require('require-from-string');

const ARTICLES_PER_PAGE = 10;
const sitemapList = [];

// Webpack common configuration
const commonWebpackConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.jsx', '.tsx', '.js', '.ts'],
    modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
    alias: {
      'partials': path.resolve(__dirname, 'src/partials'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
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
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        alias: {
          'partials': path.resolve(__dirname, 'src/partials'),
        },
      },
    }),
  ],
};

// Server-side Webpack configuration for SSR
const serverWebpackConfig = {
  ...commonWebpackConfig,
  target: 'node',
  externals: [require('webpack-node-externals')()],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'temp/server'),
  },
};

// Client-side Webpack configuration for CSR
const clientWebpackConfig = {
  ...commonWebpackConfig,
  target: 'web',
  entry: {
    app: path.resolve(__dirname, 'src/client/index.jsx'),
    TransphobiaAssessment: path.resolve(__dirname, 'src/client/TransphobiaAssessment.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'output/js'),
    filename: '[name].bundle.js',
    publicPath: '/js/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/templates/index.html',
      inject: 'body',
    }),
  ],
};

// Helper function for centralized error handling
function handleError(err, done) {
  const errorMessage = err && err.message ? err.message : 'An unknown error occurred';
  console.error(`Error: ${errorMessage}`);
  if (done) done(err);
}

// Task to clean output and temp directories
function clean(done) {
  for (const dir of ['output', 'temp']) {
    if (fs.existsSync(dir)) {
      fs.rmdirSync(dir, { recursive: true });
      console.log(`Deleted directory: ${dir}`);
    }
  }
  done()
  return
}

// Task to create necessary directories
function mkdir(done) {
  const dirs = ['output', 'temp', 'temp/data', 'output/articles', 'output/press_release'];
  
  try {
    // Create directories recursively
    dirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
      }
    });
    done(); // Signal task completion
    return;
  } catch (error) {
    console.error(`Error creating directories: ${error.message}`);
    done(error); // Signal error
    return;
  }
  done(); // Signal task completion
}

// Helper function to read and parse markdown files
async function readMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory '${dir}' does not exist.`);
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => path.extname(file) === '.md');
  return files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data } = matter(content);
    const slug = path.basename(file, '.md');
    return { data: { ...data, slug }, slug };
  });
}

// Helper function to process pages for specific types (server-side rendered list and page components)
const streamToPromise = require('stream-to-promise');

async function processPagesForType(type, pageComponent, listComponent = null) {
  const dir = `etc/${type}`;
  const tempDir = `temp/${type}`;
  const outputDir = `output/${type}`;
  const webpackConfig = serverWebpackConfig;

  // Ensure the temp and output directories exist
  fs.mkdirSync(tempDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`Processing type: ${type}`);

  const filesInSrcDir = fs.readdirSync(dir);
  const articles = [];

  // Read and process articles
  filesInSrcDir.forEach((file) => {
    const ext = path.extname(file);
    if (ext === '.md') {
      const fileName = path.basename(file, ext);
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(content); // Parse front matter
      articles.push({ data: { ...data, slug: fileName }, content, fileName });
    }
  });
  if  (articles.length === 0) {
    return Promise.resolve();
  }

  // Sort and paginate articles
  articles.sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));
  const totalPages = Math.max(Math.ceil(articles.length / ARTICLES_PER_PAGE), 1);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // Process the list of articles (list page generation)
  const listStream = gulp
    .src(`src/${listComponent}`)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(each((jsxContent, file, callback) => {
      try {
        const component = requireFromString(jsxContent, file.path);
        for (let page = 0; page < totalPages; page++) {
          const start = page * ARTICLES_PER_PAGE;
          const end = start + ARTICLES_PER_PAGE;
          const articlesOnPage = articles.slice(start, end);

          const html = ReactDOMServer.renderToStaticMarkup(
            React.createElement(component.default || component, {
              articles: articlesOnPage,
              pageNumbers,
              currentPage: page + 1,
            })
          );

          const pagePath = page === 0 ? 'index' : `page/${page + 1}`;
          const outputPath = path.join(outputDir, `${pagePath}.html`);

          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, html);
          sitemapList.push({ url: `${type}/${pagePath}` });
        }
        callback(null, jsxContent);
      } catch (err) {
        console.error(`Error processing list component: ${err.message}`);
        callback(err);
      }
    }));

  // Process each individual article (article pages)
  const pageStream = gulp
    .src(`src/${pageComponent}`)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(each(async (articleJSXContent, file, callback) => {
      try {
        const component = requireFromString(articleJSXContent, file.path);
        for (const article of articles) {
          const html = ReactDOMServer.renderToStaticMarkup(
            React.createElement(component.default || component, { article })
          );
          const outputPath = path.join(outputDir, `${article.fileName}.html`);

          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, html);
          sitemapList.push({ url: `${type}/${article.fileName}` });
        }
        callback(null, articleJSXContent);
      } catch (err) {
        console.error(`Error processing page component: ${err.message}`);
        callback(err);
      }
    }));

  // Wait for both streams to complete
  await Promise.all([streamToPromise(listStream), streamToPromise(pageStream)]);
}


// Main task to generate pages for all types (articles, press releases, and claim reviews)
async function generatePages(done) {
  try {
    // Define the types of pages you want to generate
    const pageTypes = [
      {
        type: 'articles',
        pageComponent: 'article/ArticlePage.jsx',
        listComponent: 'article/ArticleListPage.jsx',
      },
      {
        type: 'press_release',
        pageComponent: 'press_release/PressReleasePage.jsx',
        listComponent: 'press_release/PressReleaseListPage.jsx',
      },
    ];

    // Iterate over each type and process pages
    await Promise.all(
      pageTypes.map(({ type, pageComponent, listComponent }) =>
        processPagesForType(type, pageComponent, listComponent)
      )
    );

    console.log('All page types generated successfully.');
    done();  // Signal task completion
  } catch (error) {
    console.error(`Error generating pages: ${error.message}`);
    done(error);  // Signal an error
  }
}



// Task to build static pages using server-side rendering (SSR)
function buildStaticPagesSSR() {
  return new Promise((resolve, reject) => {
    const pageDir = 'src/page/';
    if (!fs.existsSync(pageDir)) {
      console.warn(`Page directory '${pageDir}' does not exist.`);
      resolve();
      return;
    }

    const filesInPageDir = fs.readdirSync(pageDir);
    const entryPoints = {};

    filesInPageDir.forEach((file) => {
      const ext = path.extname(file);
      if (ext === '.jsx' || ext === '.tsx') {
        const fileName = path.basename(file, ext);
        entryPoints[fileName] = path.resolve(__dirname, pageDir, file);
      }
    });

    console.log("entryPoints", entryPoints);

    if (Object.keys(entryPoints).length === 0) {
      console.warn('No entry points found for SSR.');
      resolve();
      return;
    }

    const webpackConfig = {
      ...serverWebpackConfig,
      entry: entryPoints,
      output: {
        ...serverWebpackConfig.output,
        path: path.resolve(__dirname, 'temp/pages'),
        filename: '[name].js',
      },
    };

    webpack(webpackConfig, async (err, stats) => {
      if (err) {
        console.error("Webpack SSR compilation error:", err);
        reject(err);
        return;
      }

      if (stats.hasErrors()) {
        const info = stats.toJson();
        console.error("Webpack SSR compilation errors:", info.errors);
        reject(new Error('Webpack compilation errors'));
        return;
      }

      console.log("Webpack SSR compilation completed.");

      try {
        for (const pageName of Object.keys(entryPoints)) {
          const compiledFileName = path.join('temp/pages', `${pageName}.js`);
          const component = require(path.resolve(__dirname, compiledFileName)).default;

          const element = React.createElement(component);
          const html = ReactDOMServer.renderToStaticMarkup(element);

          const htmlFileName = path.join('output', `${pageName}.html`);
          fs.writeFileSync(htmlFileName, html);

          console.log(`Generated HTML file: ${htmlFileName}`);
        }

        resolve();
      } catch (renderErr) {
        console.error("Error rendering components to HTML:", renderErr);
        reject(renderErr);
      }
    });
  });
}

// Task to build static pages using client-side rendering (CSR)
function buildStaticPagesCSR() {
  return new Promise((resolve, reject) => {
    const filesInClientDir = fs.readdirSync('src/client/');
    const entryPoints = {};

    // Collecting entry points for Webpack from client directory
    filesInClientDir.forEach((file) => {
      const ext = path.extname(file);
      if (ext === '.jsx') {
        const fileName = path.basename(file, ext);
        entryPoints[fileName] = path.resolve(__dirname, 'src/client', file);
      }
    });

    console.log("entryPoints", entryPoints);

    // If no entry points found, resolve the promise and skip Webpack compilation
    if (Object.keys(entryPoints).length === 0) {
      console.warn('No entry points found for CSR.');
      resolve();
      return;
    }

    // Configuring Webpack for Client-Side Rendering
    const webpackConfig = {
      ...clientWebpackConfig,
      entry: entryPoints,
      output: {
        ...clientWebpackConfig.output,
        filename: '[name].bundle.js',
      },
      plugins: [
        ...clientWebpackConfig.plugins,
        ...Object.keys(entryPoints).map((entryName) => new HtmlWebpackPlugin({
          filename: `../${entryName}.html`,
          template: 'src/templates/index.html',
          chunks: [entryName], // Ensure only the respective chunk is loaded in each HTML file
          inject: 'body',
        })),
      ],
    };

    // Running Webpack
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error("Webpack CSR compilation error:", err);
        reject(err); // Reject the promise if an error occurs
        return;
      }

      // Handling Webpack errors (if any)
      if (stats.hasErrors()) {
        const info = stats.toJson();
        console.error("Webpack CSR compilation errors:", info.errors);
        reject(new Error('Webpack compilation errors')); // Reject if Webpack compilation has errors
        return;
      }

      console.log("Webpack CSR compilation completed.");
      resolve(); // Resolve the promise when Webpack compilation completes successfully
    });
  });
}


// Task to copy and minify CSS styles
function copyStyles() {
  return gulp
    .src('src/styles/**/*.css')
    // .pipe(purgecss({ content: ['temp/**/*.html'] }))
    // .pipe(cleanCSS())
    .pipe(gulp.dest('temp/styles'));
}

// Task to inline CSS/JS and minify, excluding JSON and image files
async function autoInline() {
  return gulp
    .src('temp/**/*.html')
    .pipe(
      inline({
        base: 'temp/',
        relative: true,
        disabledTypes: ['img', 'svg', 'json'], // Disable inlining of images, SVGs, and JSON files
      })
    )
    .pipe(minifyInline())
    .pipe(ext_replace('.html')) // Use ext_replace to change extension to .html
    .pipe(gulp.dest('output/'));
}

// Task to copy media files to 'temp/' directory
function copyMedia(done) {
  return gulp
    .src('src/media/**/*', { allowEmpty: true })
    .pipe(gulp.dest('temp/media'))
    .on('end', done);  // Ensure the task signals completion
}


// Task to generate sitemap
async function buildPlainSiteMap() {
  fs.mkdirSync('./output/sitemap', { recursive: true });

  if (sitemapList.length === 0) {
    console.warn('No URLs to include in sitemap. Skipping sitemap generation.');
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const sitemapStream = new SitemapStream({
      hostname: 'https://transadvocacyandcomplaintcollective.github.io/',
    });

    const writeStream = createWriteStream('./output/sitemap/sitemap.xml');
    sitemapStream.pipe(writeStream);

    sitemapStream.on('error', (err) => {
      console.error('Sitemap generation error:', err);
      reject(err);
    });

    writeStream.on('finish', () => {
      console.log('Sitemap generated successfully.');
      resolve();
    });

    writeStream.on('error', (err) => {
      console.error('Write stream error:', err);
      reject(err);
    });

    sitemapList.forEach((item) => sitemapStream.write(item));
    sitemapStream.end();
  });
}

// Task to copy data files to 'temp/' directory
async function copyData() {
  if (fs.existsSync('etc/data/') && fs.readdirSync('etc/data/').length > 0) {
    return gulp.src('etc/data/**/*', { allowEmpty: true }).pipe(gulp.dest('temp/data'));
  } else {
    console.warn('No data files to copy from etc/data.');
    return Promise.resolve();
  }
}

// Main build task sequence
const build = gulp.series(
  clean,
  mkdir,
  copyMedia,
  generatePages,
  copyData,
  buildStaticPagesSSR, // Server-side rendering
  buildStaticPagesCSR, // Client-side rendering
  copyStyles,
  autoInline,
  buildPlainSiteMap
);

exports.default = build;
exports.clean = clean;
exports.build = build;
