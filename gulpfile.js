const gulp = require('gulp');
const webpack = require('webpack');
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
const { SitemapAndIndexStream, SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ARTICLES_PER_PAGE = 10;
const sitemapList = [];

// Common Webpack config
const commonWebpackConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.jsx', '.tsx', '.js', '.ts'],
    modules: [path.resolve(__dirname, 'src/'), 'node_modules'],
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
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },
};


// Server-side Webpack config
const serverWebpackConfig = {
  ...commonWebpackConfig,
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
};
const clientWebpackConfig = {
  ...commonWebpackConfig,
  target: 'web',
  entry: {
    app: path.resolve(__dirname, 'src/client/index.jsx'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'output/js'),
    filename: '[name].bundle.js',
    publicPath: '/js/', // Ensure this is the correct path for your project
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html', // Output HTML relative to the output path
      template: 'src/templates/index.html', // Template file for HTML structure
      inject: 'body', // Inject JS at the bottom of the body
    }),
  ],
  devServer: {
    historyApiFallback: true, // Ensures proper routing for single-page apps
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to your backend server
    }
  }
};


// Helper function for centralized error handling
function handleError(err, done) {
  console.error(`Error: ${err.message}`);
  if (done) done(err);
}

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
  const paths = ['output/**/*', 'temp/**/*'].filter(fs.existsSync);

  if (paths.length === 0) {
    return done(); // No paths exist, so just call done.
  }

  return gulp.src(paths, { read: false, allowEmpty: true })
    .pipe(plumber({ errorHandler: (err) => handleError(err, done) }))
    .pipe(rimraf())
    .on('end', done);
}

// Task to create necessary directories
function mkdir(done) {
  ['output', 'temp'].forEach(dir => fs.mkdirSync(`./${dir}`, { recursive: true }));
  done();
}

// Centralized function to generate HTML pages from JSX files (server-side rendering)
function generatePages(type, done) {
  const items = [];
  const dir = `etc/${type}`;

  if (!fs.existsSync(dir)) {
    console.error(`Directory '${dir}' does not exist. Skipping ${type} generation.`);
    return done();
  }

  fs.mkdirSync(`temp/${type}`, { recursive: true });

  const filesInDir = fs.readdirSync(dir);
  filesInDir.forEach(file => {
    const ext = path.extname(file);
    if (ext === '.md') {
      const fileName = path.basename(file, ext);
      const content = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(content);

      const publishDate = data.publishDate ? new Date(data.publishDate) : new Date();
      if (isNaN(publishDate.getTime())) {
        console.warn(`Invalid publishDate for file ${fileName}. Using current date as fallback.`);
        publishDate.setTime(Date.now());
      }

      sitemapList.push({
        url: `/${type}/${fileName}`,
        changefreq: 'daily',
        priority: 0.3,
        lastmod: publishDate.toISOString(),
        title: data.title,
        keywords: data.keywords,
      });

      items.push({ data: { ...data, slug: fileName }, fileName });
    }
  });

  items.sort((a, b) => new Date(b.data.publishDate) - new Date(a.data.publishDate));
  const totalPages = Math.max(Math.ceil(items.length / ARTICLES_PER_PAGE), 1);

  const jsxFile = type === 'articles' ? 'ArticleListPage.jsx' : 'PressReleaseListPage.jsx';

  return gulp.src(`src/${type === 'articles' ? 'article' : 'press_release'}/${jsxFile}`, { allowEmpty: true })
    .pipe(plumber())
    .pipe(webpackStream(serverWebpackConfig))
    .pipe(each((jsxContent, file, callback) => {
      try {
        const ModuleFromJSX = requireFromString(jsxContent.toString(), file.path);
        const PageComponent = ModuleFromJSX.default || ModuleFromJSX;

        for (let page = 0; page < totalPages; page++) {
          const itemsForPage = items.slice(page * ARTICLES_PER_PAGE, (page + 1) * ARTICLES_PER_PAGE);
          const App = PageComponent({ items: itemsForPage, pageNo: page, totalPages });
          const renderedPage = ReactDOMServer.renderToString(App);
          fs.writeFileSync(`temp/${type}/page-${page}.html`, renderedPage);
        }
        callback(null, jsxContent);
      } catch (err) {
        handleError(err, done);
        callback(err);
      }
    }))
    .on('end', done);
}

// Task to build static pages (Server-side rendering)
function buildStaticPagesSSR(done) {
  const filesInSrcDir = fs.readdirSync('src/');
  const entryPoints = {};

  filesInSrcDir.forEach(file => {
    const ext = path.extname(file);
    if (['.jsx'].includes(ext)) {
      const fileName = path.basename(file, ext);
      entryPoints[fileName] = path.resolve(__dirname, 'src', file);
    }
  });

  webpack({ ...serverWebpackConfig, entry: entryPoints }, (err, stats) => {
    if (err || stats.hasErrors()) {
      return handleError(err || new Error('Webpack compilation error'), done);
    }

    gulp.src('temp/**/*.html') // Collect HTML files from SSR
      .pipe(inline({ base: 'temp/' })) // Inline any CSS/JS
      .pipe(minifyInline()) // Minify inline assets
      .pipe(ext_replace('.html')) // Ensure .html extension
      .pipe(gulp.dest('output/')) // Output to the correct directory
      .on('end', done);
  });
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
// Task to build static pages with client-side rendering
// Task to build static pages with client-side rendering
function buildStaticPagesCSR(done) {
  const filesInSrcDir = fs.readdirSync('src/client/');
  const entryPoints = {};

  // Set up entry points from the client directory
  filesInSrcDir.forEach(file => {
    const ext = path.extname(file);
    if (['.jsx'].includes(ext)) {
      const fileName = path.basename(file, ext);
      entryPoints[fileName] = path.resolve(__dirname, 'src/client', file);
    }
  });

  if (Object.keys(entryPoints).length === 0) {
    console.error('No JSX files found in src/client to generate entry points.');
    return done();
  }

  // Ensure the temp/client directory exists before writing
  const clientTempDir = path.resolve(__dirname, 'temp/client');
  if (!fs.existsSync(clientTempDir)) {
    fs.mkdirSync(clientTempDir, { recursive: true });
  }

  webpack({
    ...clientWebpackConfig,
    entry: entryPoints,
    stats: 'errors-warnings',
  }, (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(stats.toString({ all: false, warnings: true, errors: true, errorDetails: true }));
      return handleError(err || new Error('Webpack compilation error'), done);
    }

    console.log('Client-side Webpack build completed successfully.');

    // Check if the JS bundles exist before proceeding
    Object.keys(entryPoints).forEach((entry) => {
      const outputJSPath = path.join(__dirname, 'output/js', `${entry}.bundle.js`);
      if (!fs.existsSync(outputJSPath)) {
        console.error(`JS bundle for ${entry} not found at ${outputJSPath}`);
        return handleError(new Error(`JS bundle for ${entry} not found`), done);
      }
    });

    // Dynamically generate HTML for each entry point
    Object.keys(entryPoints).forEach((entry) => {
      try {
        const outputJSPath = path.join(__dirname, 'output/js', `${entry}.bundle.js`);
        const outputJS = fs.readFileSync(outputJSPath, 'utf8');

        // Dynamically create an HTML file for each JSX entry
        const generatedHTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${entry}</title>
            <!-- Optionally link CSS here -->
          </head>
          <body>
            <div id="root"></div>
            <script>${outputJS}</script> <!-- Inject JS directly into HTML -->
          </body>
          </html>
        `;

        // Write the generated HTML to the temp/client folder
        fs.writeFileSync(`temp/client/${entry}.html`, generatedHTML);
        console.log(`Generated HTML for ${entry}.jsx`);
      } catch (err) {
        console.error(`Error generating HTML for ${entry}:`, err);
        handleError(err, done);
      }
    });

    // Move the generated HTML files to the output directory
    gulp.src('temp/client/**/*.html')
      .pipe(gulp.dest('output/'))
      .on('end', done);
  });
}


// Task to copy media files
function copyMedia() {
  return gulp.src('src/media/**/*', { allowEmpty: true })
    .pipe(gulp.dest('output/media'));
}

// Task to build the sitemap
function buildPlainSiteMap(done) {
  try {
    fs.mkdirSync('./output/sitemap', { recursive: true });

    const sms = new SitemapAndIndexStream({
      getSitemapStream: (i) => {
        const sitemapStream = new SitemapStream({ hostname: 'https://transadvocacyandcomplaintcollective.github.io/' });
        const path = `./output/sitemap/sitemap-${i}.xml`;
        const ws = sitemapStream.pipe(createWriteStream(resolve(path)));
        return [new URL(path, 'https://transadvocacyandcomplaintcollective.github.io/').toString(), sitemapStream, ws];
      },
    });

    sitemapList.forEach(item => sms.write(item));
    sms.end();
    done();
  } catch (err) {
    handleError(err, done);
  }
}

// Task to build the copy data
function copyData() {
  return gulp.src('etc/data/**/*', { allowEmpty: true })
    .pipe(gulp.dest('output/data')); // Ensure this folder is accessible to the server
}

// Main task sequence for building both client and server-side code
const build = gulp.series(
  clean,
  mkdir,
  copyMedia,
  buildStaticPagesSSR, // Server-side rendering
  buildStaticPagesCSR,
  copyStyles,
  autoInline, copyData,
  buildPlainSiteMap
);

exports.default = build;
exports.clean = clean;
exports.build = build;
