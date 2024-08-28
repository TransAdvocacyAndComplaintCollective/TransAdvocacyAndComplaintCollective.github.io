import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BodyPage from "../partials/BodyPage";

const PressReleasePage = ({ pressRelease }) => {
  // Destructure press release object with default values
  const { 
    title = "Press Release", 
    description = "Official Press Release from Trans Advocacy and Complaint Collective", 
    summary, 
    author = "Trans Advocacy and Complaint Collective", 
    datePublished, 
    htmlContent = "", 
    imageUrl = "/media/default-image.png", 
    id 
  } = pressRelease || {};

  // Function to format date with a fallback
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toDateString();
  };

  return (
    <BodyPage
      title={title}
      description={description}
      header={
        <>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="article" />
          {id && <meta property="og:url" content={`https://example.com/press-releases/${id}`} />}
          {imageUrl && <meta property="og:image" content={imageUrl} />}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: title,
              description: description,
              author: {
                "@type": "Person",
                name: author,
              },
              datePublished: datePublished || new Date().toISOString(),
              image: imageUrl,
              publisher: {
                "@type": "Organization",
                name: "Trans Advocacy and Complaint Collective",
                logo: {
                  "@type": "ImageObject",
                  url: "/media/PPUK-logo.png",
                },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://example.com/press-releases/${id}`,
              },
            })}
          </script>
        </>
      }
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} md={10} sm={12}>
            <article>
              <h1 className="entry-title" itemProp="headline">{title}</h1>
              {summary && <p className="summary text-muted" itemProp="description">{summary}</p>}
              <div className="dateline" itemScope itemType="https://schema.org/Person">
                <p>
                  by <span itemProp="name">{author}</span>
                </p>
                <p>
                  <time itemProp="datePublished" dateTime={datePublished}>
                    Published {formatDate(datePublished)}
                  </time>
                </p>
              </div>
              <div className="entry-content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </article>
          </Col>
        </Row>
      </Container>
    </BodyPage>
  );
};

export default PressReleasePage;
