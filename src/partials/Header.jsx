import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <Navbar
      expand="md"
      style={{
        backgroundColor: "#121212", // Darker background color
        borderBottom: "3px solid #3C9CD4", // Muted Trans Pride blue accent
        padding: "16px",
        color: "#E0E0E0", // Light gray color for text
      }}
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand href="/" aria-label="Trans Advocacy and Complaint Collective Logo">
          <img
            src="/media/tacc.png" // Replace with an actual Trans-themed logo or image
            width="50"
            alt="Trans Advocacy and Complaint Collective Logo"
            style={{
              borderRadius: "50%", // Rounded logo image
            }}
          />
        </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="/"
              style={{
                color: "#E0E0E0", // Light gray color for nav links
                marginRight: "16px",
              }}
              onMouseOver={(e) => (e.target.style.color = "#3C9CD4")} // Hover color to muted Trans Pride blue
              onMouseOut={(e) => (e.target.style.color = "#E0E0E0")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/articles/page/0.html"
              style={{
                color: "#E0E0E0",
                marginRight: "16px",
              }}
              onMouseOver={(e) => (e.target.style.color = "#3C9CD4")}
              onMouseOut={(e) => (e.target.style.color = "#E0E0E0")}
            >
              Articles
            </Nav.Link>
            <Nav.Link
              href="/press_release/page/0.html"
              style={{
                color: "#E0E0E0",
                marginRight: "16px",
              }}
              onMouseOver={(e) => (e.target.style.color = "#3C9CD4")}
              onMouseOut={(e) => (e.target.style.color = "#E0E0E0")}
            >
              Press Release
            </Nav.Link>
            <Nav.Link
              href="/about.html"
              style={{
                color: "#E0E0E0",
                marginRight: "16px",
              }}
              onMouseOver={(e) => (e.target.style.color = "#3C9CD4")}
              onMouseOut={(e) => (e.target.style.color = "#E0E0E0")}
            >
              About
            </Nav.Link>
            <Nav.Link
              href="/contact.html"
              style={{
                color: "#E0E0E0",
                marginRight: "16px",
              }}
              onMouseOver={(e) => (e.target.style.color = "#3C9CD4")}
              onMouseOut={(e) => (e.target.style.color = "#E0E0E0")}
            >
              Contact
            </Nav.Link>
            <Nav.Link
              href="/get-involved.html"
              style={{
                color: "#E0E0E0",
                marginRight: "16px",
              }}
              onMouseOver={(e) => (e.target.style.color = "#3C9CD4")}
              onMouseOut={(e) => (e.target.style.color = "#E0E0E0")}
            >
              Get Involved
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
