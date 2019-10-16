import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {

  return (
    <Navbar bg="main" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse className="d-flex justify-content-end" id="main-navbar-nav">
        <Nav className="mr-sm-2">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">My Queue</Nav.Link>
          <Nav.Link href="#">My Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default Navigation;
