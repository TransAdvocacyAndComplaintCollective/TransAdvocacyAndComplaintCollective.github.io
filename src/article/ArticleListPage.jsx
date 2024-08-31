import React from "react";
import { Button, Alert } from "react-bootstrap"; // Keep only necessary imports
import BodyPage from "partials/BodyPage";
import ReactDOM from "react-dom";

const ArticleListPage = ({ articles, pageNo, totalPages }) => {
  // Error handling for missing or invalid data
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return (
      <BodyPage title="" description="">
        <Alert variant="warning" className="text-center">
          No articles available.
        </Alert>
      </BodyPage>
    );
  }

  return (
    <BodyPage title="Article List" description="List of articles">
      <div className="container pb-5 mb-5">
        <div className="article-cards">
          {articles.map((article) => {
            const { id, data } = article;
            return (
              <div key={id} className="article mb-3 p-3 border rounded"> {/* Simplified styling */}
                <h3>{data.title}</h3>
                <p>{data.summary}</p>
                <Button variant="primary" href={`/article/${data.slug}.html`}>
                  Read More
                </Button>
              </div>
            );
          })}
        </div>
        {/* Pagination Buttons */}
        <div className="pagination-buttons">
          {pageNo > 0 && (
            <Button
              variant="outline-primary"
              href={`/article/page-${pageNo - 1}.html`}
              className="mr-2"
            >
              Previous
            </Button>
          )}
          {pageNo < totalPages - 1 && (
            <Button
              variant="outline-primary"
              href={`/article/page-${pageNo + 1}.html`}
              className="ml-2"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </BodyPage>
  );
};

// Ensure ReactDOM.hydrate is called only in the browser
if (typeof document !== "undefined") {
  ReactDOM.hydrate(<ArticleListPage />, document);
}

export default ArticleListPage;
