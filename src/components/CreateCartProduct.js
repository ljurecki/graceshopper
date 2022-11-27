import React, { useState } from 'react';
import { Button, Modal, Form, FloatingLabel, Alert } from 'react-bootstrap';
import { createCartProduct } from '../api';

const CreateCartProduct = ({ jwt, user}) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  async function addProductToCart() {
    const newProduct = {
      title,
      qty,
    };
    const result = await createCartProduct(jwt, user, newProduct);
    if (result.error) {
      console.error(result.error);
      setErrorMessage(result.error);
    } else {
      setSuccessMessage('Cart Product Created!');
      setErrorMessage('');
      setTimeout(() => {
        handleClose();
      }, 1000);
    }
  }

  return (
    <>
      <Button
        variant='success'
        className='position-fixed sticky-bottom rounded-pill shadow'
        size='lg'
        style={{ bottom: '25px', right: '25px' }}
        onClick={() => {
          handleShow();
        }}>
        Create Cart Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ fontSize: '20px' }} closeButton>
          <Modal.Title className='w-100 text-center'>
            Create Cart Product
          </Modal.Title>
        </Modal.Header>
        <Form
          id='forms'
          onSubmit={event => {
            event.preventDefault();
            addCartProduct();
          }}>
          <Form.Group className='m-3'>
            <FloatingLabel label='Name'>
              <Form.Control
                placeholder=''
                required
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
            </FloatingLabel>

          </Form.Group>
          <Form.Group className='m-3'>
            <FloatingLabel label='Quantity'>
              <Form.Control
                placeholder=''
                required
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setQuantity(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3 d-flex justify-content-end'>
            <Button
              variant='success'
              type='submit'
              onClick={event => {
                event.preventDefault();
                addCartProduct();
              }}>
              Create Cart Product
            </Button>
          </Form.Group>
          {errorMessage && (
            <Alert variant='danger'>
              Product Already Added to Cart!
            </Alert>
          )}
          {successMessage && (
            <Alert variant='success' className='mt-3'>
              {successMessage}
            </Alert>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default CreateCartProduct;
