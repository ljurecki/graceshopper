import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';

const NavBar = ({ isLoggedIn, logOut, navigate }) => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Best Books</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/products')}>
              Products
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
            {/* <Button onClick={() => navigate('/cart')} variant="light"> //cart badge if we have time to make it a counter
              Cart <Badge bg="dark">9</Badge>
            </Button> */}
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