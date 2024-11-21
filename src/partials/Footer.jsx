import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBluesky, FaDiscord, FaFacebook, FaGithub, FaMastodon, FaThreads, FaTwitter } from 'react-icons/fa6';

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
          {/*<Col md={4} className="text-center">*/}
          {/*  <p className="mb-2 mb-md-0 footer">Follow us:</p>*/}
            {/*<div className="social-links d-flex justify-content-center">*/}
            {/*  <a href="https://discord.gg/KMxjhabAxN" aria-label="Discord" className="social">*/}
            {/*    <FaDiscord size={30} style={{color: "black", paddingBottom: '4px'}} />*/}
            {/*  </a>*/}
            {/*  <a href="https://bsky.app/profile/tacc-uk.bsky.social"  className="mx-2">*/}
            {/*    <FaBluesky size={24} style={{color: "black"}}/>*/}
            {/*  </a>*/}
            {/*  <a href="https://www.threads.net/@tacc40566" aria-label="Threads">*/}
            {/*    <FaThreads size={24} style={{color: "black"}}/>*/}
            {/*  </a>*/}
            {/*  <a href="https://www.facebook.com/profile.php?id=61567774272432" className="mx-2" aria-label="Facebook">*/}
            {/*    <FaFacebook size={24} style={{color: "black"}}/>*/}
            {/*  </a>*/}
            {/*</div>*/}
          {/*</Col>*/}
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
