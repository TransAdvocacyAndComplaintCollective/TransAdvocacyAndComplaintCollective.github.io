import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
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
      description={"Welcome to the Trans Advocacy and Complaints Collective."}
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
                name: "TACC UK",
                logo: {
                  "@type": "ImageObject",
                  url: "/media/tacc.png",
                },
              },
            })}
          </script>
        </>
      }
    >
      <Container>
        <Card className="mb-4">
          <Card.Body>
            <article>
              {/* Render article title */}
              <h3 className="entry-title, markdown">{title}</h3>
              {/* Render article summary if available */}
              {summary && <p className="summary text-muted">{summary}</p>}
              {/* Render authors and contributors */}
              <div className="dateline mb-4">
                {author.length > 0 && (
                  <>
                    <font id="author">{renderPeople(author)}</font><br/>
                    <font id="date">{formatDate(publishDate)}</font>
                  </>
                   )}
              </div>
              {/* Render HTML content dangerously (ensure HTML is safe) */}
              <div className="entry-content" dangerouslySetInnerHTML={{ __html: content }} />
            </article>
          </Card.Body>
        </Card>
      </Container>
    </BodyPage>
  );
};

export default ArticlePage;
