import React from 'react';
import Header from './partials/Header';
import Footer from './partials/Footer';
import './styles/bootstrap.css'; // Assuming you have your Bootstrap styles imported properly

const ArticleListPage = ({ articles, page, hasNextPage }) => {
  return (
    <div>
      <Header />
      <div className="container pb-5 mb-5">
        <h1 className="text-body-emphasis">Articles</h1>
        <div className="row">
          {articles.map((article, index) => (
            <a
              key={index}
              href={`/articles/${article.filename}.html`}
              className="link-offset-2 link-underline link-underline-opacity-0"
            >
              <div className="card mt-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={article.imageUrl}
                      className="img-fluid rounded-start"
                      alt={article.imageAlt}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{article.title}</h5>
                      <p className="card-text">{article.summary}</p>
                      {/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
          {page > 1 && (
            <a href={`/articles/${page - 1}.html`} className="prev-page">
              Prev
            </a>
          )}
          {hasNextPage && (
            <a href={`/articles/${page + 1}.html`} className="next-page">
              Next
            </a>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticleListPage;
