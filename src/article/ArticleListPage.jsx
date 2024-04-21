import React from "react";
import { Card, Button } from "react-bootstrap";
import BodyPage from "partials/BodyPage";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ArticleListPage = ({ articles, pageNo, totalPages }) => {
  // Error handling for missing or invalid data
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return (
      <BodyPage title="" description="">
        <p>No articles available.</p>
      </BodyPage>
    );
  }

  return (
    <BodyPage title="Article List" description="List of articles">
      <div className="container pb-5 mb-5">
        {articles.map((article) => {
          const { id, data } = article;
          return (
            <Card key={id} className="mb-3 w-100">
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                {/* Uncomment if 'article.name' is needed */}
                {/* <Card.Subtitle className="mb-2 text-muted">
                  {article.name}
                </Card.Subtitle> */}
                <Card.Text>{data.summary}</Card.Text>
                <Button variant="primary" href={`/article/${data.slug}.html`}>
                  Read More
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </BodyPage>
  );
};

// Ensure ReactDOM.hydrate is called only in the browser
if (typeof document !== "undefined") {
  ReactDOM.hydrate(<ArticleListPage />, document);
}

export default ArticleListPage;
