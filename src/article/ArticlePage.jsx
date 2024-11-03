import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BodyPage from "../partials/BodyPage";

const ArticlePage = ({ article }) => {
  // Destructure article object
  const { data, content = "<p>No content available</p>" } = article || {};
  const {
    title,
    summary,
    author = [],
    contributor = [],
    publishDate,
    imageUrl,
    imageAlt,
    description,
    id
  } = data || {};

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toDateString();
  };

  // Function to render authors and contributors
  const renderPeople = (people) => {
    if (!Array.isArray(people)) {
      // Handle the case where `people` is a single object or string
      return <span>{people.name || people}</span>;
    }
    return people.map((person, index) => (
      <span key={index}>{person.name}{index < people.length - 1 ? ', ' : ''}</span>
    ));
  };

  return (
    <BodyPage
      title={"Home"}
      description={"Welcome to the Pirate Party UK"}
      header={
        <>
          <meta property="og:title" content={title} />
          {description && <meta property="og:description" content={description} />}
          <meta property="og:type" content="article" />
          {id && <meta property="og:url" content={`https://example.com/articles/${id}`} />}
          {imageUrl && <meta property="og:image" content={imageUrl} />}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              description: description,
              author: Array.isArray(author)
                ? author.map((person) => ({
                    "@type": "Person",
                    name: person.name,
                  }))
                : { "@type": "Person", name: author.name || author },
              contributor: Array.isArray(contributor)
                ? contributor.map((person) => ({
                    "@type": "Person",
                    name: person.name,
                  }))
                : { "@type": "Person", name: contributor.name || contributor },
              datePublished: publishDate,
              image: imageUrl,
              publisher: {
                "@type": "Organization",
                name: "Pirate Party UK (PPUK)",
                logo: {
                  "@type": "ImageObject",
                  url: "/media/PPUK-logo.png",
                },
              },
            })}
          </script>
        </>
      }
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <article>
              {/* Render article title */}
              <h1 className="entry-title">{title}</h1>
              {/* Render article summary if available */}
              {summary && <p className="summary text-muted">{summary}</p>}
              {/* Render authors and contributors */}
              <div className="dateline">
                {author.length > 0 && (
                  <>
                    by <span itemProp="name">{renderPeople(author)}</span>
                  </>
                )}
                {contributor && (
                  <>
                    <br />
                    Contributors: <span itemProp="contributor">{renderPeople(contributor)}</span>
                  </>
                )}
                <p>
                  <time itemProp="datePublished" dateTime={publishDate}>
                    published {formatDate(publishDate)}
                  </time>
                </p>
              </div>
              {/* Render HTML content dangerously (ensure HTML is safe) */}
              <div className="entry-content" dangerouslySetInnerHTML={{ __html: content }} />
            </article>
          </Col>
        </Row>
      </Container>
    </BodyPage>
  );
};

export default ArticlePage;
