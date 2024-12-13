import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaBluesky, FaDiscord, FaFacebook, FaThreads } from "react-icons/fa6";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Navbar expand="md" className="navbar-expand-md">
      <Container>
        <Navbar.Brand href="/">
          <img
            className="logo"
            src="/media/tacc.png"
            alt="Trans Advocacy and Complaint Collective Logo"
          />
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Conditionally apply the "show" class based on menuOpen */}
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbar-menu"
        >
          <Nav className="mb-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about.html">About</Nav.Link>
            <Nav.Link href="/articles/page/0.html">Articles</Nav.Link>
            <Nav.Link href="/Events.html">Events</Nav.Link>
            <Nav.Link href="/jessicaNews/page/0.html">News by Jess</Nav.Link>
            {/*<Nav.Link href="/press_release/page/0.html">Press Release</Nav.Link>*/}
            <Nav.Link href="/get-involved.html">Get Involved</Nav.Link>
            <Nav.Link href="/email.html">Email Us</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
