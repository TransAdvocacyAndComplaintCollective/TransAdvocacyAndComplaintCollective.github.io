import React from 'react';
import Header from 'partials/Header';
import Footer from 'partials/Footer';
import './styles/bootstrap.css'; // Assuming you have your Bootstrap styles imported properly

const ArticlePage = ({ article }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>{article.title}</title>
        <link rel="icon" href="/media/PP.svg" />
        <meta name="description" content={article.description} />
        <meta name="author" content={article.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="styles/bootstrap.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
        <title>Pirate Party UK (PPUK) - {article.title}</title>
      </head>
      <body itemscope itemtype="http://schema.org/Article">
        <Header />
        <header>
          <h1 className="entry-title" itemprop="headline">{article.title}</h1>
          <div className="summary text-muted" itemprop="description">
            {article.summary}
          </div>
          <div className="dateline">
            by
            <span itemprop="author" itemscope itemtype="http://schema.org/Person">
              <span itemprop="name">{article.name}</span>
            </span>
            <p>
              <time itemprop="datePublished" dateTime={article.datePublished}>
                published {new Date(article.datePublished).toDateString()}
              </time>
          </div>
        </header>
        <div className="container">
          <p></p>
          <div className="entry-content" itemprop="articleBody">
            {/* Assuming article.htmlContent contains JSX */}
            {article.htmlContent}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
};

export default ArticlePage;
