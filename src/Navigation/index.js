import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";

const Navigation = () => {

  return (
    <Navbar bg="main" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="ml-auto mr-sm-2">
          <Nav.Link as={NavLink} to="discover">Discover</Nav.Link>
          <Nav.Link as={NavLink} to="queue">My Queue</Nav.Link>
          <Nav.Link as={NavLink} to="profile">My Profile</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default Navigation;
