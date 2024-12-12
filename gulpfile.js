const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const plumber = require('gulp-plumber');
const path = require('path');
const fs = require('fs');
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
const glob = require('glob');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const requireFromString = require('require-from-string');
const streamToPromise = require('stream-to-promise');
const MarkdownIt = require('markdown-it'); // Import markdown-it
const globalConfig = require('./global_cnfig.json');

const ARTICLES_PER_PAGE = 10;
const sitemapList = [];

// Common Webpack configuration
const commonWebpackConfig = {watch: false,
  watch: false,
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
};

// Webpack configuration for SSR
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

// Webpack configuration for CSR
const clientWebpackConfig = {
  ...commonWebpackConfig,
  target: 'web',
  entry: {
    app: path.resolve(__dirname, 'src/client/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'tacc.org.uk/js'),
    filename: '[name].bundle.js',
    publicPath: '/js/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'src/templates/index.ejs',
      inject: 'body',
    }),
  ],
};

// Centralized error handler
function handleError(err, done) {
  console.error(`Error: ${err && err.message ? err.message : 'An unknown error occurred'}`);
  if (done) done(err);
}

// Clean task
function clean(done) {
  for (const dir of ['tacc.org.uk', 'temp']) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true });
      console.log(`Deleted directory: ${dir}`);
    }
  }
  done();
}

// Create necessary directories
function mkdir(done) {
  const dirs = ['tacc.org.uk', 'temp', 'temp/data', 'tacc.org.uk/articles', 'tacc.org.uk/press_release'];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
  done();
}

// Task to copy media files
function copyMedia(done) {
  return gulp
    .src('src/media/**/*', { allowEmpty: true, encoding: false })
    .pipe(gulp.dest('tacc.org.uk/media'))
    .on('end', function () {
      console.log('Media files copied successfully');
      done();
    });
}

// Helper function to read markdown files
async function readMarkdownFiles(dir) {
  const md = new MarkdownIt(); // Initialize markdown-it

  if (!fs.existsSync(dir)) {
    console.error(`Directory '${dir}' does not exist.`);
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => path.extname(file) === '.md');
  return files.map((file) => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content: markdownContent } = matter(content);
    const htmlContent = md.render(markdownContent); // Convert markdown to HTML

    const slug = path.basename(file, '.md');
    return { data: { ...data, slug }, slug, htmlContent };
  });
}

// Function to compile markdown directories
function compileMarkdownDir(markdownsDir, outputDir, pageComponent) {
  return new Promise((resolve, reject) => {
    const tempDir = path.resolve(__dirname, `temp/${markdownsDir}`);
    const fullOutputDir = path.resolve(__dirname, outputDir);
    const markdownsDir_ = path.resolve(__dirname, markdownsDir);

    // Ensure the necessary directories exist
    fs.mkdirSync(tempDir, { recursive: true });
    fs.mkdirSync(fullOutputDir, { recursive: true });

    const pageComponentPath = `src/${pageComponent}`;
    const pageComponentName = path.basename(pageComponent, path.extname(pageComponent));
    const entryPoints = {
      [pageComponentName]: path.resolve(__dirname, pageComponentPath),
    };

    if (!fs.existsSync(entryPoints[pageComponentName])) {
      console.warn(`Page component '${pageComponent}' not found.`);
      resolve();
      return;
    }

    // Webpack configuration for server-side rendering (SSR)
    const webpackConfig = {
      ...serverWebpackConfig,
      entry: entryPoints,
      output: {
        ...serverWebpackConfig.output,
        path: tempDir,
        filename: '[name].js',
      },
    };

    const markdownFiles = glob.sync(`${markdownsDir_}/**/*.md`);

    if (markdownFiles.length === 0) {
      console.warn(`No markdown files found in '${markdownsDir_}'`);
      resolve();
      return;
    }

    // Initialize markdown-it
    const md = new MarkdownIt();

    // Compile the page component using Webpack
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error(`Webpack SSR compilation error for '${pageComponentName}':`, err);
        reject(err);
        return;
      }

      if (stats.hasErrors()) {
        const info = stats.toJson();
        console.error(`Webpack SSR compilation errors for '${pageComponentName}':`, info.errors);
        reject(new Error('Webpack compilation errors'));
        return;
      }

      console.log(`Webpack SSR compilation completed for '${pageComponentName}'`);

      // Process each markdown file
      Promise.all(
        markdownFiles.map((file) => {
          return new Promise((innerResolve, innerReject) => {
            const relativeFilePath = path.relative(markdownsDir_, file);
            const content = fs.readFileSync(file, 'utf8');
            const value = matter(content);
            const { data, content: markdownContent } = value;
            const fileName = path.basename(file, '.md');
            const outputFileName = relativeFilePath.replace(/\.md$/, '.html');
            let htmlContent = md.render(markdownContent); // Convert markdown to HTML

            // Replace .md links with .html in the generated HTML
            htmlContent = htmlContent.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');

            try {
              const compiledFileName = path.join(tempDir, `${pageComponentName}.js`);
              const componentModule = require(compiledFileName);


              // Use the default export if it exists, otherwise fallback to the module itself
              const component = componentModule.default || componentModule;
              if (!component || (typeof component !== 'function' && typeof component !== 'object')) {
                throw new Error(`Invalid component in ${compiledFileName}`);
              }

              // Render the component to static HTML
              const element = React.createElement(component, { htmlContent, data });
              const html = ReactDOMServer.renderToStaticMarkup(element);

              // Write the HTML to the output directory
              const htmlOutputFileName = path.join(fullOutputDir, outputFileName);
              fs.mkdirSync(path.dirname(htmlOutputFileName), { recursive: true });
              fs.writeFileSync(htmlOutputFileName, html);
              innerResolve();
            } catch (renderErr) {
              console.error(`Error rendering component for '${fileName}' to HTML:`, renderErr);
              innerReject(renderErr);
            }
          
          });
        })
      )
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  });
}

// Compile markdown content for multiple types
function compileContentFromMarkdown(done) {
  const tasks = globalConfig.ContentFromMarkdownTask;

  Promise.all(
    tasks.map(({ markdownsDir, outputDir, pageComponent }) =>
      compileMarkdownDir(markdownsDir, outputDir, pageComponent)
    )
  )
    .then(() => {
      console.log('All markdown directories processed.');
      done();
    })
    .catch((error) => {
      console.error('Error processing markdown directories:', error);
      done(error);
    });
}

// Helper function to process pages for a specific type
async function processPagesForType(type, pageComponent, listComponent = null,count=null,group=null) {
  const dir = `etc/${type}`;
  const tempDir = `temp/${type}`;
  const outputDir = `tacc.org.uk/${type}`;
  const webpackConfig = serverWebpackConfig;

  // Ensure the temp and output directories exist
  fs.mkdirSync(tempDir, { recursive: true });
  fs.mkdirSync(outputDir, { recursive: true });


  const filesInSrcDir = fs.readdirSync(dir);
  const articles = [];

  // Initialize markdown-it
  const md = new MarkdownIt();

  // Read and process articles
  filesInSrcDir.forEach((file) => {
    const ext = path.extname(file);
    if (ext === '.md') {
      const fileName = path.basename(file, ext);
      const file2 = path.join(dir, file);
      const content = fs.readFileSync(file2, 'utf8');
      const { data, content: markdownContent } = matter(content); // Parse front matter and content
      let htmlContent = md.render(markdownContent); // Convert markdown to HTML

      // Replace .md links with .html in the generated HTML
      htmlContent = htmlContent.replace(/href="([^"]+)\.md"/g, 'href="$1.html"');

      articles.push({ data: { ...data, slug: fileName }, content: htmlContent, fileName });
    }
  });
  // sort articles by date
  articles.sort((a, b) =>   new Date(b.data.publishDate) - new Date(a.data.publishDate));

  // Ensure totalPages and pageNumbers are defined even if there are no articles
  const totalPages = Math.max(Math.ceil(articles.length / count), 1);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Process the list of articles (list page generation)
  const listStream = gulp
    .src(`src/${listComponent}`, { allowEmpty: true })
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(
      each((jsxContent, file, callback) => {
        if (articles.length === 0) {
          console.log(`No ${type} found in the directory`);
          const component = requireFromString(jsxContent, file.path);
          const html = ReactDOMServer.renderToStaticMarkup(
            React.createElement(component.default || component, {
              articles: [],
              pageNumbers,
              currentPage: 1,
            })
          );
          const outputPath = path.join(outputDir, `page-0.html`);
          fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          fs.writeFileSync(outputPath, html);
        }
        try {
          const component = requireFromString(jsxContent, file.path);
          for (let page = 0; page < totalPages; page++) {
            const start = page * count;
            const end = start + count;
            const articlesOnPage = articles.slice(start, end);

            const html = ReactDOMServer.renderToStaticMarkup(
              React.createElement(component.default || component, {
                articles: articlesOnPage,
                pageNumbers,
                currentPage: page + 1,
              })
            );

            const pagePath = `page/${page}`;
            const outputPath = path.join(outputDir, `${pagePath}.html`);

            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, html);
            sitemapList.push({ url: `${type}/${pagePath}` });
          }

          // If there are no articles, generate one empty page
          if (articles.length === 0) {
            const html = ReactDOMServer.renderToStaticMarkup(
              React.createElement(component.default || component, {
                articles: [],
                pageNumbers,
                currentPage: 1,
              })
            );
            const outputPath = path.join(outputDir, `index.html`);
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, html);
            sitemapList.push({ url: `${type}/index` });
          }

          callback(null, jsxContent);
        } catch (err) {
          console.error(`Error processing list component: ${err.message}`);
          callback(err);
        }
      })
    );

  // Process each individual article (article pages)
  const pageStream = gulp
    .src(`src/${pageComponent}`, { allowEmpty: true })
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(
      each(async (articleJSXContent, file, callback) => {
        try {
          const component = requireFromString(articleJSXContent, file.path);
          for (const article of articles) {
            const html = ReactDOMServer.renderToStaticMarkup(
              React.createElement(component.default || component, {  article  })
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
      })
    );

  // Wait for both streams (list and individual article pages) to complete
  await Promise.all([streamToPromise(listStream), streamToPromise(pageStream)]);
}

// Main task to generate pages for all types
async function buildContentPages(done) {
  try {
    // Define the types of pages you want to generate
    const pageTypes = globalConfig.ContentPagesTask;

    // Iterate over each type and process pages
    await Promise.all(
      pageTypes.map(({ type, pageComponent, listComponent,count,group}) =>
        processPagesForType(type, pageComponent, listComponent,count,group)
      )
    );

    done(); // Signal task completion
  } catch (error) {
    console.error(`Error generating pages: ${error.message}`);
    done(error); // Signal an error
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

      try {
        for (const pageName of Object.keys(entryPoints)) {
          const compiledFileName = path.join('temp/pages', `${pageName}.js`);
          const component = require(path.resolve(__dirname, compiledFileName)).default;

          const element = React.createElement(component);
          const html = ReactDOMServer.renderToStaticMarkup(element);

          const htmlFileName = path.join('tacc.org.uk', `${pageName}.html`);
          fs.writeFileSync(htmlFileName, html);

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
    const clientDir = path.resolve(__dirname, 'src/client/');
    const filesInClientDir = fs.readdirSync(clientDir);
    const entryPoints = {};

    // Collect all .jsx files as entry points
    filesInClientDir.forEach((file) => {
      const ext = path.extname(file);
      if (ext === '.jsx') {
        const fileName = path.basename(file, ext);
        entryPoints[fileName] = path.resolve(clientDir, file);
      }
    });

    if (Object.keys(entryPoints).length === 0) {
      console.warn('No entry points found for CSR.');
      resolve();
      return;
    }

    // Define Webpack configuration specific to CSR
    const webpackConfig = {
      ...clientWebpackConfig,
      entry: entryPoints,
      output: {
        path: path.resolve(__dirname, 'tacc.org.uk'), // Set to 'tacc.org.uk' directory
        filename: 'js/[name].bundle.js', // JS bundles in 'tacc.org.uk/js'
        // publicPath: '', // Public path for JS bundles
        
      },
      plugins: [
        ...clientWebpackConfig.plugins,
        // Dynamically create an HtmlWebpackPlugin instance for each entry point
        ...Object.keys(entryPoints).map((entryName) =>
          new HtmlWebpackPlugin({
            filename: `${entryName}.html`, // HTML files directly under 'tacc.org.uk/'
            template: 'src/templates/index.ejs', // Path to your HTML template
            chunks: [entryName], // Include only the specific JS chunk
            inject: 'body', // Inject JS at the end of the body
          })
        ),
      ],
    };

    // Run Webpack with the specified configuration
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error("Webpack CSR compilation error:", err);
        reject(err);
        return;
      }

      if (stats.hasErrors()) {
        const info = stats.toJson();
        console.error("Webpack CSR compilation errors:", info.errors);
        reject(new Error('Webpack compilation errors'));
        return;
      }

      console.log("Webpack CSR compilation completed successfully.");
      resolve();
    });
  });
}


// Task to copy and minify CSS styles
function copyStyles() {
  return gulp
    .src('src/styles/**/*.css')
    .pipe(purgecss({ content: ['tacc.org.uk/**/*.html'] }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('tacc.org.uk/styles'));
}

// Task to copy JS files
function copyStylesJs() {
  return gulp.src('src/js/**/*.js').pipe(gulp.dest('tacc.org.uk/js'));
}

// Task to inline CSS/JS and minify
async function autoInline() {
  return gulp
    .src('tacc.org.uk/**/*.html')
    .pipe(
      inline({
        base: 'tacc.org.uk/',
        relative: true,
        disabledTypes: ['img', 'svg', 'json'], // Disable inlining of images, SVGs, and JSON files
      })
    )
    .pipe(minifyInline())
    .pipe(gulp.dest('tacc.org.uk/'));
}

// Task to generate sitemap
async function buildPlainSiteMap() {
  fs.mkdirSync('./tacc.org.uk/sitemap', { recursive: true });

  if (sitemapList.length === 0) {
    console.warn('No URLs to include in sitemap. Skipping sitemap generation.');
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const sitemapStream = new SitemapStream({
      hostname: 'https://wwww.tacc.org.uk/',
    });

    const writeStream = createWriteStream('./tacc.org.uk/sitemap/sitemap.xml');
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

// Task to copy data files
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
  buildContentPages,
  compileContentFromMarkdown,
  copyData,
  buildStaticPagesSSR, // Server-side rendering
  buildStaticPagesCSR, // Client-side rendering
  copyStyles,
  copyStylesJs,
  // autoInline,
  buildPlainSiteMap
);

exports.default = build;
exports.clean = clean;
exports.build = build;