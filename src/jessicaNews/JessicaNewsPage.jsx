import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import BodyPage from "../partials/BodyPage";

const JessicaNewsPage = ({ article }) => {
  // Destructure article object
  const {
    title,
    summary,
    author = [],
    contributor = [],
    publishDate,
    modifiedDate,
    source,
    tags = [],
    imageUrl,
    imageAlt,
    seoDescription,
    articleId,
    externalLinks = [],
    relatedArticles = [],
    geographicRegion,
    status
  } = article || {};

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toDateString();
  };

  // Function to render authors and contributors
  const renderPeople = (people) => {
    if (!Array.isArray(people)) {
      return <span>{people.name || people}</span>;
    }
    return people.map((person, index) => (
      <span key={index}>{person.name}{index < people.length - 1 ? ', ' : ''}</span>
    ));
  };

  // Function to render tags
  const renderTags = (tags) => tags.join(", ");

  return (
    <BodyPage
      title={title || "Jessica's News"}
      description={seoDescription || "Latest news from Jessica's updates."}
      header={
        <>
          <meta property="og:title" content={title} />
          {seoDescription && <meta property="og:description" content={seoDescription} />}
          <meta property="og:type" content="article" />
          {articleId && <meta property="og:url" content={`https://example.com/news/${articleId}`} />}
          {imageUrl && <meta property="og:image" content={imageUrl} />}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: title,
              description: seoDescription,
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
              dateModified: modifiedDate,
              sourceOrganization: source,
              keywords: tags,
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
              <h3 className="entry-title markdown">{title}</h3>
              {summary && <p className="summary text-muted">{summary}</p>}
              <div className="dateline mb-4">
                {author.length > 0 && (
                  <>
                    <span id="author">By {renderPeople(author)}</span><br />
                  </>
                )}
                {publishDate && <span id="date">Published: {formatDate(publishDate)}</span>}
                {modifiedDate && <br /> && <span id="modified-date">Updated: {formatDate(modifiedDate)}</span>}
              </div>
              {imageUrl && <img src={imageUrl} alt={imageAlt} className="img-fluid mb-4" />}
              <div className="entry-content">
                <p>Source: {source}</p>
                {tags.length > 0 && <p>Tags: {renderTags(tags)}</p>}
                {geographicRegion && <p>Region: {geographicRegion}</p>}
                {status && <p>Status: {status}</p>}
              </div>
              <div className="external-links">
                {externalLinks.length > 0 && (
                  <>
                    <h5>References:</h5>
                    <ul>
                      {externalLinks.map((link, index) => (
                        <li key={index}>
                          <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </article>
          </Card.Body>
        </Card>
      </Container>
    </BodyPage>
  );
};

export default JessicaNewsPage;
