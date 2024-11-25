import React from "react";
import { Card, Button, Container, A } from "react-bootstrap";
import BodyPage from "partials/BodyPage";
import ReactDOM from "react-dom";

// Component for rendering a list of articles
const ArticleListPage = ({ articles, currentPage, totalPages }) => {
  // Error handling for missing or invalid data
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return (
      <BodyPage title="Article List" description="">
        <p>No articles available.</p>
      </BodyPage>
    );
  }
  return (
    <BodyPage title="Article List" description="List of articles">
      <Container>
        <div className="article-cards">
          {articles.map((article) => {
            const { id, data } = article;
            return (
              // Adding a unique key prop using article id or slug
              <Card key={data.slug} className="mb-4">
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>{data.summary}</Card.Text>
                  <Button variant="primary" href={`/articles/${data.slug}.html`}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        {/*</div>*/}
        {/* Pagination Buttons */}
        {/*<div className="pagination-buttons mt-4">*/}
        {/*  { (*/}
        {/*    <Button*/}
        {/*      variant="outline-primary"*/}
        {/*      href={`/articles/page/${currentPage - 1}.html`}*/}
        {/*      className="mr-2"*/}
        {/*    >*/}
        {/*      Previous*/}
        {/*    </Button>*/}
        {/*  )}*/}
        {/*  {(*/}
        {/*    <Button*/}
        {/*      variant="outline-primary"*/}
        {/*      href={`/articles/page/${currentPage + 1}.html`}*/}
        {/*      className="ml-2"*/}
        {/*    >*/}
        {/*      Next*/}
        {/*    </Button>*/}
        {/*  )}*/}
        </div>
      </Container>
    </BodyPage>
  );
};

// Ensure ReactDOM.hydrate is called only in the browser
if (typeof document !== "undefined") {
  const props = JSON.parse(document.getElementById("data-props").textContent);
  ReactDOM.hydrate(<ArticleListPage {...props} />, document.getElementById("root"));
}

export default ArticleListPage;
