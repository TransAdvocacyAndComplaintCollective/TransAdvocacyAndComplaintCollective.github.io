import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';

const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    console.log("expanded",expanded);
    setExpanded(!expanded);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="p-3 mb-3">
      <Container>
        <Navbar.Brand href="/" aria-label="Pirate Party Logo">
          <img
            src="/media/PP.svg"
            width="50"
            alt="Pirate Party Logo"
          />
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav" expanded={expanded}> */}
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/article/page-0.html">Articles</Nav.Link>
            <Nav.Link href="/about.html">About</Nav.Link>
            <Nav.Link href="/contact.html">Contact</Nav.Link>
            <Nav.Link href="/policy/readme.html">Policy</Nav.Link>
            {/* Additional Nav Links can go here */}
          </Nav>
          <div className="text-end">
            <div id="userStatusContainer">HI</div>
          </div>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default Header;
