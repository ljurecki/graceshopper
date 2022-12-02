import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { getUserData, getAllProducts } from './api';
import { Navbar } from './components';
import {
  Cart,
  Home,
  Login,
  Register,
  Products
} from './pages';


const App = () => {
  const [jwt, setJwt] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  function logOut() {
    window.localStorage.removeItem('jwt');
    setJwt('');
    setUser({});
    setIsLoggedIn(false);
  }

  async function persistLogin() {
    if (window.localStorage.getItem('jwt')) {
      setJwt(window.localStorage.getItem('jwt'));
    }
    if (jwt) {
      setIsLoggedIn(true);
      const response = await getUserData(jwt);
      if (!response.error) {
        setUser(response);
      } else {
        console.error(response.error);
      }
    }
  }
  useEffect(() => {
    persistLogin();
  }, [jwt]);

  async function allProducts() {
    setProducts(await getAllProducts());
  }


  useEffect(() => {
    allProducts();
  }, []);

  return (
    <>
      <div className='sticky-top'>
        <Navbar isLoggedIn={isLoggedIn} logOut={logOut} navigate={navigate} />
      </div>
      <Container className='px-0' fluid id='main-app'>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/cart'
            element={<Cart user={user} jwt={jwt} navigate={navigate} products={products} />}
          />
          <Route
            path='/products'
            element={<Products jwt={jwt} products={products} navigate={navigate} />}
          />
          <Route
            path='/register'
            element={<Register navigate={navigate} />}
          />
          <Route
            path='/login'
            element={<Login setJwt={setJwt} navigate={navigate} />}
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;