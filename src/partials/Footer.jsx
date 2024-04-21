import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaDiscord, FaGithub, FaMastodon, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer bg-dark py-4">
      <Container>
        <Row className="align-items-center justify-content-center justify-content-md-between">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-light m-0">&copy; {new Date().getFullYear()} Pirate Party UK</p>
          </Col>
          <Col md={4} className="text-center">
            <p className="mb-2 mb-md-0 text-light">Follow us:</p>
            <div className="social-links">
              <a href="https://discord.gg/t8EDRgXzMH" className="social-link me-3" title="Join us on Discord">
                <FaDiscord size={24} className="text-light" />
              </a>
              <a href="https://github.com/pirate-party-uk" className="social-link me-3" title="Check out our GitHub">
                <FaGithub size={24} className="text-light" />
              </a>
              <a rel="me" href="https://tech.lgbt/@pirate_party_uk" className="social-link me-3" title="Follow us on Mastodon">
                <FaMastodon size={24} className="text-light" />
              </a>
              <a rel="me" href="https://twitter.com/_PiratePartyUK" className="social-link" title="Follow us on Twitter">
                <FaTwitter size={24} className="text-light" />
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
