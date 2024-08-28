import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaDiscord, FaGithub, FaMastodon, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#121212", // Dark background color
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
                color: "#3C9CD4",  // Same color for brand consistency
                fontWeight: "bold", // Increase font weight for better readability
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)", // Add subtle text shadow for contrast
              }}
            >
              &copy; {new Date().getFullYear()} Trans Advocacy and Complaint Collective
            </p>
          </Col>
          <Col md={4} className="text-center">
            <p className="mb-2 mb-md-0" style={{ color: "#FFFFFF" }}>Follow us:</p>
            <div className="social-links d-flex justify-content-center">
              <a href="https://twitter.com" className="mx-2" aria-label="Twitter">
                <FaTwitter size={24} style={{ color: "#3C9CD4" }} />
              </a>
              <a href="https://github.com" className="mx-2" aria-label="GitHub">
                <FaGithub size={24} style={{ color: "#3C9CD4" }} />
              </a>
              <a href="https://discord.com" className="mx-2" aria-label="Discord">
                <FaDiscord size={24} style={{ color: "#3C9CD4" }} />
              </a>
              <a href="https://mastodon.social" className="mx-2" aria-label="Mastodon">
                <FaMastodon size={24} style={{ color: "#3C9CD4" }} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
