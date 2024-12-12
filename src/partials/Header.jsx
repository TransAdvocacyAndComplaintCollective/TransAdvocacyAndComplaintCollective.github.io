import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {FaBluesky, FaDiscord, FaFacebook, FaThreads} from "react-icons/fa6";

const Header = () => {
  return (
    <Navbar expand="md" className="navbar-expand-md">
        <Container>
        <Navbar.Brand href="/">
          <img className="logo" src="/media/tacc.png" alt="Trans Advocacy and Complaint Collective Logo"/>
        </Navbar.Brand>

        {/* Toggle button for mobile view with baked-in Bootstrap JS */}
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            aria-controls="navbar-menu"
            aria-expanded="false"
            aria-label="Toggle navigation"

        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar-menu">
          <Nav className="mb-auto">

            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link href="/articles/page/0.html">Articles</Nav.Link>

            {/*<Nav.Link href="/press_release/page/0.html">Press Release</Nav.Link>*/}

            <Nav.Link href="/Events.html">Events</Nav.Link>

            <Nav.Link href="/about.html">About</Nav.Link>

            <Nav.Link href="/get-involved.html">Get Involved</Nav.Link>

            <Nav.Link href="/email.html">Contact Us</Nav.Link>

          </Nav>
        </div>
        {/*<div className="social-links d-flex justify-content-center">*/}
        {/*  <a href="https://discord.gg/KMxjhabAxN" aria-label="Discord" className="social">*/}
        {/*    <FaDiscord size={30} style={{color: "#1976d", paddingBottom: '4px'}}/>*/}
        {/*  </a>*/}
        {/*  <a href="https://bsky.app/profile/tacc-uk.bsky.social" className="mx-2" aria-label="Bluesky">*/}
        {/*    <FaBluesky size={24} style={{color: "#1976d"}}/>*/}
        {/*  </a>*/}
        {/*  <a href="https://www.threads.net/@tacc40566" aria-label="Threads">*/}
        {/*    <FaThreads size={24} style={{color: "#1976d"}}/>*/}
        {/*  </a>*/}
        {/*  <a href="https://www.facebook.com/profile.php?id=61567774272432" className="mx-2" aria-label="Facebook">*/}
        {/*    <FaFacebook size={24} style={{color: "#1976d"}}/>*/}
        {/*  </a>*/}
        {/*</div>*/}
      </Container>
    </Navbar>
  );
};

export default Header;
