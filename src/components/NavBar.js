import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavBar = ({ user, setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand>Best Books</Navbar.Brand>
          <Nav className='me-auto'>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            {!user && (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
            {user && (
              <>
                <span>Welcome {user.email}!</span>
                {user.is_admin && (
                  <>
                    <Link to="/admin/products">Admin-Products</Link>
                    <Link to="/admin/users">Admin-Users</Link>
                  </>
                )}
                <Link onClick={handleLogout} to="/">
                  Logout
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;