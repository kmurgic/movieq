import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";
import classes from './index.module.css';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  const handleSelect = () => {
    setExpanded(false);
  }

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(prev => !prev)}
    >
      <Navbar.Brand
        className={classes.brand}
        onClick={handleSelect}
        as={NavLink} to="/"
      >
        Movie Q
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="main-navbar-nav" />
      <Navbar.Collapse id="main-navbar-nav">
        <Nav className="ml-auto mr-sm-2">
          <Nav.Link
            onClick={handleSelect}
            as={NavLink}
            to="discover"
          >
            Discover
          </Nav.Link>
          <Nav.Link
            onClick={handleSelect}
            as={NavLink}
            to="search"
          >
            Search
          </Nav.Link>
          <Nav.Link
            onClick={handleSelect}
            as={NavLink}
            to="queues"
          >
            My Queues
          </Nav.Link>
          <Nav.Link
            onClick={handleSelect}
            as={NavLink}
            to="profile"
          >
            My Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default Navigation;
