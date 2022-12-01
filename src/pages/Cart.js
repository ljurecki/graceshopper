import React, { useState, useEffect } from 'react';
import { getAllProducts, addProductToCart } from '../api';
// import { addProductToCart } from '../components';
import { Button, Card, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { getCartProductById } from '../../db';

const Cart = ({ jwt, user }) => {
  const [cartProductsToDisplay, setCartProductsToDisplay] = useState([]);

  async function addProductToCart() {
    setCartProductsToDisplay(await addProductToCart());
    console.log("see cart", allCartProducts)
  }

  useEffect(() => {
    addProductToCart();
  }, []);

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey='cart' title='Cart'></Tab>
      </Tabs>

      <ListGroup variant='flush'>
        {jwt && <CartForm user={user} jwt={jwt} />}

        {cartProductsToDisplay ? (
          cartProductsToDisplay.map(cartProduct => {
            const { id, title, qty } = cartProduct;
            return (
              <ListGroup.Item
                key={id}
                className='px-0 py-3 mx-3 d-flex flex-column'>
                <Card.Title
                  as='h2'
                  className='selectLink'
                  onClick={() => openRelatedModal(product)}>
                  {title}
                </Card.Title>
                <Card.Text>Quantity: {qty}</Card.Text>
                {jwt ? (
                  <Link to={`/cart/${id}`} state={{ cart: Cart }}>
                    <Button variant='info'>Select</Button>
                  </Link>
                ) : null}
              </ListGroup.Item>
            );
          })
        ) : (
          <h1>No Cart Found!</h1>
        )}
      </ListGroup>
      </>
  )};

export default Cart;