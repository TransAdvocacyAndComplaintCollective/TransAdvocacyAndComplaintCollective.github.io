import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <div className="mt-5 navbar fixed-bottom bg-body-tertiary bg-dark" data-bs-theme="dark">
      <Container>
        <Row>
          <Col md={3}>
            <span className="mb-3 mb-md-0 text-body-secondary">
              Copyright &copy; {new Date().getFullYear()} Pirate Party UK
            </span>
          </Col>
          <Col md={3} className="text-end">
            <span className="mb-3 mb-md-0 text-body-secondary">
              <a href="https://discord.gg/t8EDRgXzMH" className="bi bi-discord"></a>
            </span>
            <span className="mb-3 mb-md-0 text-body-secondary">
              <a href="https://github.com/pirate-party-uk" className="bi bi-github"></a>
            </span>
            <span className="mb-3 mb-md-0 text-body-secondary">
              <a rel="me" className="bi bi-mastodon" href="https://tech.lgbt/@pirate_party_uk"></a>
            </span>
            <span className="mb-3 mb-md-0 text-body-secondary">
              <a rel="me" className="bi bi-twitter" href="https://twitter.com/_PiratePartyUK"></a>
            </span>
            {/* Facebook link commented out */}
            {/* <span className="mb-3 mb-md-0 text-body-secondary">
              <a rel="me" className="bi bi-facebook" href="https://www.facebook.com/profile.php?id=100094049784840"></a>
            </span> */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
