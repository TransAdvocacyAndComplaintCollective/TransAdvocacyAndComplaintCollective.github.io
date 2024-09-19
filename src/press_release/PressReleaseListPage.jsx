import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import BodyPage from "../page/partials/BodyPage";
import ReactDOM from "react-dom";

// Import custom CSS for styling (if needed)
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./PressReleaseListPage.css";

const PressReleaseListPage = ({ pressReleases, pageNo = 0, totalPages = 1 }) => {
  // Error handling for missing or invalid data
  if (!pressReleases || !Array.isArray(pressReleases) || pressReleases.length === 0) {
    return (
      <BodyPage title="No Press Releases" description="No press releases available on this page.">
        <Alert variant="warning" className="text-center">
          No press releases available.
        </Alert>
      </BodyPage>
    );
  }

  // Define the title and description dynamically
  const pageTitle = `Press Release List - Page ${pageNo + 1}`;
  const pageDescription = `Browse through our list of press releases on page ${pageNo + 1}`;

  return (
    <BodyPage title={pageTitle} description={pageDescription}>
      <div className="container pb-5 mb-5">
        <div className="press-release-cards">
          {pressReleases.map((pressRelease) => {
            const { id, data } = pressRelease;
            return (
              <Card key={id} className="mb-3">
                <Card.Body>
                  <Card.Title>{data.title}</Card.Title>
                  <Card.Text>{data.summary}</Card.Text>
                  <Button variant="primary" href={`/press-release/${data.slug}.html`}>
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
        {/* Pagination Controls */}
        <div className="pagination-buttons d-flex justify-content-between mt-4">
          {pageNo > 0 ? (
            <Button variant="outline-primary" href={`/press-release/page-${pageNo - 1}.html`}>
              &laquo; Previous
            </Button>
          ) : (
            <div></div> // Empty div to keep layout consistent
          )}
          {pageNo < totalPages - 1 && (
            <Button variant="outline-primary" href={`/press-release/page-${pageNo + 1}.html`}>
              Next &raquo;
            </Button>
          )}
        </div>
      </div>
    </BodyPage>
  );
};

// Ensure ReactDOM.hydrate is called only in the browser
if (typeof document !== "undefined") {
  const pressReleasesData = window.__PRESS_RELEASES__ || []; // Assuming press releases are passed as a global variable
  const pageNo = window.__PAGE_NO__ || 0; // Assuming page number is passed as a global variable
  const totalPages = window.__TOTAL_PAGES__ || 1; // Assuming total pages are passed as a global variable

  ReactDOM.hydrate(
    <PressReleaseListPage pressReleases={pressReleasesData} pageNo={pageNo} totalPages={totalPages} />,
    document.getElementById('root')
  );
}

export default PressReleaseListPage;
