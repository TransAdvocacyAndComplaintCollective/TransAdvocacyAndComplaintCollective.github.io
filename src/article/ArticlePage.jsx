import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BodyPage from "../page/partials/BodyPage";

const ArticlePage = ({ article }) => {
  // Destructure article object
  const { title, description, summary, author, datePublished, htmlContent, imageUrl, id } = article || {};

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <BodyPage
      title={"Home"}
      description={"Welcome to the Trans Advocacy and Complaint Collective"}
      header={
        <>
          {/* Use optional chaining to avoid errors if article is null */}
          <meta property="og:title" content={title} />
          {description && <meta property="og:description" content={description} />}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://example.com/articles/${id}`} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              description: description,
              author: {
                "@type": "Person",
                name: author,
              },
              datePublished: datePublished,
              image: imageUrl,
              publisher: {
                "@type": "Organization",
                name: "Trans Advocacy and Complaint Collective",
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
      {/* Use Container for main content */}
      <Container>
        <Row className="justify-content-center">
          {/* Use Col to control content width */}
          <Col lg={8}>
            <article>
              {/* Render article title */}
              <h1 className="entry-title">{title}</h1>
              {/* Render article summary if available */}
              {summary && <p className="summary text-muted">{summary}</p>}
              {/* Render author and publication date */}
              <div className="dateline">
                by <span itemProp="name">{author}</span>
                <p>
                  <time itemProp="datePublished" dateTime={datePublished}>
                    published {formatDate(datePublished)}
                  </time>
                </p>
              </div>
              {/* Render HTML content dangerously (ensure HTML is safe) */}
              <div className="entry-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </article>
          </Col>
        </Row>
      </Container>
    </BodyPage>
  );
};

export default ArticlePage;
