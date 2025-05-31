import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

function NavbarComponent() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Coding Journal</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

