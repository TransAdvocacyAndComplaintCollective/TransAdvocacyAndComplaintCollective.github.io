import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import BodyPage from "../partials/BodyPage";

const TACCNewsListPage = ({ articles }) => {
  // Error handling for missing or invalid data
  if (!articles || !Array.isArray(articles) || articles.length === 0) {
    return (
      <BodyPage title="TACC News" description="No news available">
        <p>No news articles available at the moment.</p>
      </BodyPage>
    );
  }

  return (
    <BodyPage
      title="TACC News"
      description="Latest news and updates from TACC."
    >
      <Container>
        <Row>
          {articles.map((article, index) => {
            const {
              title,
              summary,
              author = [],
              publishDate,
              imageUrl,
              imageAlt,
              articleId,
              tags = []
            } = article;

            // Function to render authors
            const renderPeople = (people) => {
              if (!Array.isArray(people)) {
                return <span>{people.name || people}</span>;
              }
              return people.map((person, index) => (
                <span key={index}>{person.name}{index < people.length - 1 ? ', ' : ''}</span>
              ));
            };

            // Function to format date
            const formatDate = (dateString) => {
              if (!dateString) return "Date not available";
              const date = new Date(dateString);
              return date.toDateString();
            };

            return (
              <Col md={4} key={index} className="mb-4">
                <Card>
                  {imageUrl && (
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      alt={imageAlt}
                      className="img-fluid"
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    {summary && <Card.Text>{summary}</Card.Text>}
                    {author.length > 0 && (
                      <p className="text-muted">
                        By {renderPeople(author)}
                      </p>
                    )}
                    {publishDate && (
                      <p className="text-muted">{formatDate(publishDate)}</p>
                    )}
                    {tags.length > 0 && (
                      <p className="text-muted">Tags: {tags.join(", ")}</p>
                    )}
                    <Button
                      variant="primary"
                      href={`/tacc-news/${articleId}`}
                    >
                      Read More
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <Row className="mt-4">
          <Col>
            <h5>Historical News</h5>
            <p>Browse past news round-ups for more insights and updates.</p>
          </Col>
        </Row>
      </Container>
    </BodyPage>
  );
};

export default TACCNewsListPage;
