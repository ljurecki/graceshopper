import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Navbar } from './components';
import {
  Cart,
  Home,
  Login,
  Register,
  Products,
  Ordernumber,
  Checkout
} from './pages';


  const App = () => {
    const [jwt, setJwt] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
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
        const response = await getUserData();
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
  
    return (
      <>
        <div className='sticky-top'>
          <Navbar />
        </div>
        <Container className='px-0' fluid id='main-app'>
          <Routes>
            <Route
              path='/'
              element={<Home/>}
            />
            <Route
              path='/cart'
              element={<Cart/>}
            />
            <Route
              path='/products'
              element={<Products user={user} jwt={jwt} isLoggedIn={isLoggedIn} />}
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