import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';
import { AddProductToCart } from '../components';
import { Button, Card, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cart = ({ jwt, user }) => {
  const [productsToDisplay, setProductsToDisplay] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [relatedRoutines, setRelatedRoutines] = useState([]);

//   const openRelatedModal = async activity => {
//     setRelatedRoutines(await getRoutinesByActivity(activity));
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setRelatedRoutines([]);
//   };

  async function allProducts() {
    setProductsToDisplay(await getAllProducts());
  }

  useEffect(() => {
    allProducts();
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
            const { id, title, qty } = cartProduct;
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
                  <Link to={`/cart/${id}`} state={{ cart: cart }}>
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

      <Modal show={showModal} onHide={closeModal} id='relatedRoutinesModal'>
        <Modal.Header closeButton>
          <Modal.Title className='w-100 text-center'>
            Routines Featuring Activity
          </Modal.Title>
        </Modal.Header>
        {relatedRoutines && relatedRoutines.length ? (
          <>
            {relatedRoutines.map(routine => {
              const { id, name, creatorName, goal } = routine;
              return (
                <Modal.Body key={id}>
                  <ListGroup.Item>
                    <Card.Title>Name: {name}</Card.Title>
                    <Card.Text>Goal: {goal}</Card.Text>
                    <Card.Subtitle className='text-muted pb-1'>
                      Creator: {creatorName}
                    </Card.Subtitle>
                  </ListGroup.Item>
                </Modal.Body>
              );
            })}
          </>
        ) : (
          <Modal.Body className='text-center'>No Routines Found</Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default Cart;


