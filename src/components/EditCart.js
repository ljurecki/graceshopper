import React, { useState } from 'react';
import { Form, Button, Alert, Card, FloatingLabel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { updateCart } from '../api';

const EditCart = ({ jwt, navigate }) => {
  const loc = useLocation();
  const { cartProduct } = loc.state;
  const { id, title, qty } = cartProduct;

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [newTitle, setNewTitle] = useState(title);
  const [newQty, setNewQty] = useState(qty);

  async function editCart() {
    const updatedCart = {
      id,
      title: newTitle,
      qty: newQty,
    };
    const result = await updateCart(jwt, updatedCart);
    console.log(result);
    if (result.error) {
      console.error(result.error);
      setErrorMessage('Cart not updated!');
    } else {
      setSuccessMessage('Cart Updated!');
      setErrorMessage('');
      setTimeout(() => {
        navigate('./Cart');
      }, 1000);
    }
  }

  return (
    <>
      <Card className='flex-fill mt-3 mx-5 shadow'>
        <Card.Header
          as='h3'
          className='text-center'
          style={{ backgroundColor: '#0D6EFD', color: '#fff' }}>
          Update Cart
        </Card.Header>
        <Form
          id='forms'
          onSubmit={event => {
            event.preventDefault();
            editCart();
          }}>
          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Product Title'>
              <Form.Control
                placeholder={title}
                onChange={e => {
                  setNewTitle(e.target.value);
                }}
                value={newTitle}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Product Quantity'>
              <Form.Control
                placeholder='Quantity'
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setNewQuantity(e.target.value);
                }}
                value={newQuantity}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className='m-3 d-flex justify-content-end'
            style={{ margin: '1% 1% 0px 1%' }}>
            <Button variant='success' type='submit'>
              Update cart
            </Button>
            <Button
              variant='secondary'
              className='mx-2'
              onClick={() => navigate('/cart')}>
              Cancel
            </Button>
          </Form.Group>
          {errorMessage && (
            <Alert variant='danger' className='mt-3'>
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert variant='success' className='mt-3'>
              {successMessage}
            </Alert>
          )}
        </Form>
      </Card>
    </>
  );
};

export default EditCart;
