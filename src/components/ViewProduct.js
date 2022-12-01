import React, { useState } from 'react';
import { Button, Modal, Form, FloatingLabel, Row, Col } from 'react-bootstrap';
import addProductToCart from './AddProductToCart';

const ViewCart = ({ cartProduct }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button
        variant='success'
        onClick={() => {
          openModal();
        }}>
        View
      </Button>

      <Modal show={showModal} onHide={closeModal} size='lg'>
        <Modal.Header style={{ fontSize: '20px' }} closeButton>
          <Modal.Title className='w-100 text-center'>
            {product.name}
          </Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className='m-3'>
            <FloatingLabel label='Title'>
              <Form.Control
                as='textarea'
                id='cartProduct'
                plaintext
                readOnly
                style={{ height: '80px' }}
                defaultValue={cartProduct}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group as={Row} className='m-3'>
            <Col className='p-0'>
              <FloatingLabel label='Quantity'>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={quantity}
                />
              </FloatingLabel>
            </Col>

          <cartProducts cartProduct={cartProduct} />
          </Form.Group>
          <Form.Group className='m-3 d-flex justify-content-end'>
            <Button
              variant='secondary'
              className='mx-2'
              onClick={() => closeModal()}>
              Close
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </>
  )};

export default ViewCart;
