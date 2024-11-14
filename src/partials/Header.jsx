import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar
      expand="md"
      className="navbar-expand-md"
      style={{
        backgroundColor: "#5BCEFA",
        borderBottom: "3px solid #C77D9B",
        padding: "16px",
        color: "#E0E0E0",
      }}
    >
      <Container>
        <Navbar.Brand href="/" aria-label="Trans Advocacy and Complaint Collective Logo">
          <img
            src="/media/tacc.png"
            width="50"
            alt="Trans Advocacy and Complaint Collective Logo"
            style={{ borderRadius: "50%" }}
          />
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
            <Nav.Link
              href="/"
              style={{ color: "#121212" }}
              onMouseOver={(e) => (e.target.style.color = "#121212")}
              onMouseOut={(e) => (e.target.style.color = "#121212")}
            >
              Home
            </Nav.Link>

            <Nav.Link
              href="/articles/page/0.html"
              style={{ color: "#121212" }}
              onMouseOver={(e) => (e.target.style.color = "#121212")}
              onMouseOut={(e) => (e.target.style.color = "#121212")}
            >
              Articles
            </Nav.Link>

            <Nav.Link
              href="/press_release/page/0.html"
              style={{ color: "#121212" }}
              onMouseOver={(e) => (e.target.style.color = "#121212")}
              onMouseOut={(e) => (e.target.style.color = "#121212")}
            >
              Press Release
            </Nav.Link>

            <NavDropdown title="More" id="nav-dropdown" style={{ color: "#121212" }}>
              <NavDropdown.Item href="/about.html">About</NavDropdown.Item>
              <NavDropdown.Item href="/contact.html">Contact</NavDropdown.Item>
              <NavDropdown.Item href="/get-involved.html">Get Involved</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
