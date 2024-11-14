import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBluesky, FaDiscord, FaFacebook, FaGithub, FaMastodon, FaThreads, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#5BCEFA", // Dark background color
        padding: "20px",
        textAlign: "center",
        borderTop: "3px solid #C77D9B", // Muted Trans Pride pink accent
      }}
    >
      <Container>
        <Row className="align-items-center justify-content-center justify-content-md-between">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <p
              className="m-0"
              style={{
                color: "#121212",  // Same color for brand consistency
                fontWeight: "bold", // Increase font weight for better readability
                // textShadow: "1px 1px 2px #121212", // Add subtle text shadow for contrast
              }}
            >
              &copy; {new Date().getFullYear()} Trans Advocacy and Complaint Collective
            </p>
          </Col>
          <Col md={4} className="text-center">
            <p className="mb-2 mb-md-0" style={{ color: "#121212" }}>Follow us:</p>
            <div className="social-links d-flex justify-content-center">
              <a href="https://discord.gg/KMxjhabAxN" className="mx-2" aria-label="Discord">
                <FaDiscord size={24} style={{ color: "#121212" }} />
              </a>
              <a href="https://www.threads.net/@tacc40566" className="mx-2" aria-label="GitHub">
                <FaThreads size={24} style={{ color: "#121212" }} />
              </a>
              <a href="https://bsky.app/profile/tacc-uk.bsky.social">
                <FaBluesky size={24} style={{ color: "#121212" }} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61567774272432" className="mx-2" aria-label="Facebook">
                <FaFacebook size={24} style={{ color: "#121212" }} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
