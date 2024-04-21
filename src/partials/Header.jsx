import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = ({}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3 mb-3">
      <Container>
        <Navbar.Brand href="/" aria-label="Pirate Party Logo" >
          <img
            src="/media/PP.svg"
            width="50"
            className="img-thumbnail"
            alt="Pirate Party Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/article/page-0.html">Articles</Nav.Link>
            <Nav.Link href="/about.html">About</Nav.Link>
            <Nav.Link href="/contact.html">Contact</Nav.Link>
            <Nav.Link href="/policy/readme.html">Policy</Nav.Link>
            {/* Additional Nav Links can go here */}
          </Nav>
          <div className="dropdown text-end">
            <div id="userStatusContainer">HI</div> 
          </div>
  
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
