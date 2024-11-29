import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBluesky, FaDiscord, FaFacebook, FaInstagram, FaThreads } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="align-items-center justify-content-center justify-content-md-between">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <p className="m-0 footer">
              &copy; {new Date().getFullYear()} Trans Advocacy and Complaint Collective
            </p>
          </Col>

          <Col md={4} className="text-center">
            <div className="social-links d-flex justify-content-center">
              <a href="https://discord.gg/KMxjhabAxN" aria-label="Discord" className="social" title="Discord">
                <FaDiscord size={30} style={{color: "#1976d", paddingBottom: '4px'}}/>
              </a>
              <a href="https://bsky.app/profile/tacc.org.uk" className="mx-2" aria-label="Bluesky" title="Bluesky">
                <FaBluesky size={24} style={{color: "#1976d"}}/>
              </a>
              <a href="https://www.threads.net/@tacc.org.uk" aria-label="Threads" title="Threads">
                <FaThreads size={24} style={{color: "#1976d"}}/>
              </a>
              <a href="https://www.instagram.com/tacc.org.uk" className="mx-2" aria-label="Instagram" title="Instagram">
                <FaInstagram size={24} style={{color: "#1976d"}}/>
              </a>
              <a href="https://www.facebook.com/tacc.org.uk" aria-label="Facebook" title="Facebook">
                <FaFacebook size={24} style={{color: "#1976d"}}/>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
