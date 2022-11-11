import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = ({ isLoggedIn, logOut, navigate }) => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Fitness Trackr</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/products')}>
             Products
            </Nav.Link>
            {isLoggedIn ? (
              <Nav.Link
                onClick={() => {
                  navigate('/');
                  logOut();
                }}>
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;