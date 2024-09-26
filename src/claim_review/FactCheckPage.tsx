import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BodyPage from 'partials/BodyPage';
import CitationList from "partials/CitationList"; // Import the CitationList component

// Define types for different objects used in the page
interface Author {
  name: string;
  url?: string;
  sameAs?: string | string[]; // Added sameAs for author
}

interface ReviewRating {
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  alternateName?: string;
}

interface ItemReviewed {
  author: Author;
  datePublished: string;
  appearance?: string | string[];
  citation?: string | string[];
}

interface ArticleProps {
  title: string;
  description: string;
  summary?: string;
  author: Author[];
  datePublished: string;
  htmlContent: string;
  imageUrl: string;
  id: string;
  appearance?: string | string[];
  review?: ReviewRating[];
  itemReviewed?: ItemReviewed[];
  keywords?: string | string[];
  inLanguage?: string;
  funding?: string;
  correction?: string;
  positiveNotes?: string[];
  negativeNotes?: string[];
  reviewAspect?: string;
  reviewBody?: string;
  claimReviewed?: string;
  mediaAuthenticityCategory?: string;
  originalMediaContextDescription?: string;
  originalMediaLink?: string;
  sameAs?: string | string[];
  citation?: any[]; // Update to match the CitationList input format
}

interface FactCheckPageProps {
  article: ArticleProps;
  factCheckType: "ClaimReview" | "MediaReview" | "ReviewNewsArticle";
}

// Function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};

const FactCheckPage: React.FC<FactCheckPageProps> = ({ article, factCheckType }) => {
  const {
    title,
    description,
    summary,
    author,
    datePublished,
    htmlContent,
    imageUrl,
    id,
    appearance,
    review,
    itemReviewed,
    keywords,
    inLanguage,
    funding,
    correction,
    positiveNotes,
    negativeNotes,
    reviewAspect,
    reviewBody,
    claimReviewed,
    mediaAuthenticityCategory,
    originalMediaContextDescription,
    originalMediaLink,
    sameAs,
    citation, // Now assuming this is in a format compatible with CitationList
  } = article;

  // Build NewsArticle as base
  const newsArticle = {
    "@type": "NewsArticle",
    headline: title,
    description,
    author: author.map((auth) => ({
      "@type": "Person",
      name: auth.name,
      url: auth.url,
      sameAs: Array.isArray(auth.sameAs) ? auth.sameAs : [auth.sameAs],
    })),
    datePublished: formatDate(datePublished),
    image: imageUrl,
    publisher: {
      "@type": "Organization",
      name: "Trans Advocacy and Complaint Collective",
      logo: {
        "@type": "ImageObject",
        url: "/media/PPUK-logo.png",
      },
    },
    appearance: Array.isArray(appearance) ? appearance : [appearance],
    keywords: Array.isArray(keywords) ? keywords : [keywords],
    inLanguage,
    funding,
    correction,
    positiveNotes,
    negativeNotes,
    reviewAspect,
    reviewBody,
  };

  // Build ClaimReview
  const claimReview =
    factCheckType === "ClaimReview" || factCheckType === "MediaReview"
      ? {
          "@type": "ClaimReview",
          url: `https://example.com/articles/${id}`,
          claimReviewed: claimReviewed || "Claim details unavailable",
          itemReviewed: (Array.isArray(itemReviewed) ? itemReviewed : [itemReviewed]).map((item) => ({
            "@type": "Claim",
            author: {
              "@type": "Organization",
              name: item?.author?.name,
              sameAs: Array.isArray(sameAs) ? sameAs : [sameAs],
            },
            datePublished: item?.datePublished,
            appearance: Array.isArray(appearance) ? appearance : [appearance],
            citation: Array.isArray(citation) ? citation : [citation],
          })),
          reviewRating: Array.isArray(review)
            ? review.map((r) => ({
                "@type": "Rating",
                ratingValue: r.ratingValue,
                bestRating: r.bestRating || 5,
                worstRating: r.worstRating || 1,
                alternateName: r.alternateName || "Unknown",
              }))
            : [],
          author: author.map((auth) => ({
            "@type": "Organization",
            name: auth.name,
            sameAs: Array.isArray(auth.sameAs) ? auth.sameAs : [auth.sameAs],
          })),
        }
      : null;

  // Build MediaReview if required, always paired with ClaimReview
  const mediaReview =
    factCheckType === "MediaReview"
      ? {
          "@type": "MediaReview",
          url: `https://example.com/articles/${id}`,
          mediaAuthenticityCategory: mediaAuthenticityCategory || "Unknown",
          originalMediaContextDescription: originalMediaContextDescription || "No context provided",
          originalMediaLink: originalMediaLink || null,
          itemReviewed: (Array.isArray(itemReviewed) ? itemReviewed : [itemReviewed]).map((item) => ({
            "@type": "MediaObject",
            author: {
              "@type": "Organization",
              name: item?.author?.name,
              sameAs: Array.isArray(sameAs) ? sameAs : [sameAs],
            },
            datePublished: item?.datePublished,
            appearance: Array.isArray(appearance) ? appearance : [appearance],
            citation: Array.isArray(citation) ? citation : [citation],
          })),
          reviewRating: Array.isArray(review)
            ? review.map((r) => ({
                "@type": "Rating",
                ratingValue: r.ratingValue,
                bestRating: r.bestRating || 5,
                worstRating: r.worstRating || 1,
                alternateName: r.alternateName || "Unknown",
              }))
            : [],
          author: author.map((auth) => ({
            "@type": "Organization",
            name: auth.name,
            sameAs: Array.isArray(auth.sameAs) ? auth.sameAs : [auth.sameAs],
          })),
        }
      : null;

  // Use @graph to store all structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [newsArticle, claimReview, mediaReview].filter(Boolean), // Filters out null entries (e.g., if there's no MediaReview or ClaimReview)
  };

  return (
    <BodyPage
      title={"Fact Check"}
      description={"Fact check page with structured data for Google rich results"}
      header={
        <>
          <meta property="og:title" content={title} />
          {description && <meta property="og:description" content={description} />}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://example.com/articles/${id}`} />
          {/* Render structured data using @graph */}
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        </>
      }
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <article itemScope itemType="https://schema.org/Article">
              {/* Render article title */}
              <h1 className="entry-title" itemProp="headline">
                {title}
              </h1>

              {/* Render article summary if available */}
              {summary && (
                <p className="summary text-muted" itemProp="description">
                  {summary}
                </p>
              )}

              {/* Render author and publication date */}
              <div className="dateline">
                {author.map((auth, index) => (
                  <span key={index} itemProp="author" itemScope itemType="https://schema.org/Person">
                    <span itemProp="name">{auth.name}</span>
                    {index < author.length - 1 ? ", " : ""}
                  </span>
                ))}
                <p>
                  <time itemProp="datePublished" dateTime={formatDate(datePublished)}>
                    published {new Date(datePublished).toDateString()}
                  </time>
                </p>
              </div>

              {/* Render HTML content dangerously (ensure HTML is safe) */}
              <div className="entry-content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: htmlContent }} />

              {/* Render additional fields like positiveNotes, negativeNotes, and reviewBody */}
              {reviewBody && (
                <div itemProp="reviewBody">
                  <h3>Review:</h3>
                  <p>{reviewBody}</p>
                </div>
              )}

              {positiveNotes && (
                <div itemProp="positiveNotes">
                  <h4>Positive Notes:</h4>
                  <ul>
                    {positiveNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {negativeNotes && (
                <div itemProp="negativeNotes">
                  <h4>Negative Notes:</h4>
                  <ul>
                    {negativeNotes.map((note, index) => (
                      <li key={index}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Render CitationList */}
              {citation && citation.length > 0 && <CitationList citations={citation} />}
            </article>
          </Col>
        </Row>
      </Container>
    </BodyPage>
  );
};

export default FactCheckPage;
