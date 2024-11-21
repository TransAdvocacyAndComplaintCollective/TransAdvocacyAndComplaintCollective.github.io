import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

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
          style={{ borderColor: "#C77D9B" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar-menu">
          <Nav className="me-auto">

            <Nav.Link href="/">Home</Nav.Link>

            <Nav.Link href="/articles/page/0.html">Articles</Nav.Link>

            <Nav.Link href="/press_release/page/0.html">Press Release</Nav.Link>

            <Nav.Link href="/Events.html">Events</Nav.Link>

            <Nav.Link href="/about.html">About</Nav.Link>

            <Nav.Link href="/contact.html">Contact</Nav.Link>

            <Nav.Link href="/get-involved.html">Get Involved</Nav.Link>

          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
