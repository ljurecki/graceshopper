import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';
import { AddProductToCart } from '../components';
import { Button, Card, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = ({ jwt, user }) => {
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  async function allCartProducts() {
    setCartProductsToDisplay(await getAllCartProducts());
  }

  useEffect(() => {
    allCartProducts();
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

        {productsToDisplay ? (
          productsToDisplay.map(product => {
            const { id, title, qty } = product;
            return (
              <ListGroup.Item
                key={id}
                className='px-0 py-3 mx-3 d-flex flex-column'>
                <Card.Title
                  as='h2'
                  className='productLink'
                  onClick={() => openRelatedModal(product)}>
                  {title}
                </Card.Title>
                <Card.Text>Quantity: {qty}</Card.Text>
                {jwt ? (
                  <Link to={`/cart/${id}`} state={{ cart: Cart }}>
                    <Button variant='info'>Edit</Button>
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