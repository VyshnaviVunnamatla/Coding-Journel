import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header({ onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand><h1>Coding Journal</h1></Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link><span className="space-right"><h3>Home</h3></span></Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add-problem">
              <Nav.Link><h3>Add Problem</h3></Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
