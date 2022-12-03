import React, { useState, useEffect } from 'react';
import { ListGroup, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartItemCard } from '../components/index';
import { getCart } from '../api'

const Cart = ({ jwt, products }) => {
  const [cartProducts, setCartProducts] = useState([]);

  async function allCartProducts() {
    setCartProducts(await getCart(jwt));
  }

  useEffect(() => {
    if (jwt) {
      allCartProducts();
    }
  }, [jwt]);

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '60px' }}>
        <Tab eventKey='activities' title='Shopping Cart'></Tab>
      </Tabs>
      <ListGroup variant='flush'>
        <div id='outerCheckout'>
          {cartProducts ? (
            cartProducts.map((product) => {
              return <CartItemCard products={products} product={product} key={product.id} />
            })
          ) : (
            <h1>No Products Found!</h1>
          )}
        </div>
      </ListGroup>
      <Link to="/Checkout">Submit</Link>
    </>
  );
};

export default Cart;
