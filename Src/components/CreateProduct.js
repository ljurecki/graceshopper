import React, { useState } from 'react';
import { createProduct } from '../api';
import { Button, Modal, Form, FloatingLabel, Alert } from 'react-bootstrap';

const CreateProduct = ({ jwt, fetchAllProducts }) => {
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [imageURL, setImageURL] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const openModal = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setTitle('');
    setDescription('');
    setPrice('');
    setAuthor('');
    setGenre('');
    setImageURL(''); 
  };

  const handleSubmit = async () => {
    const product = {
      title,
      description,
      price,
      author,
      genre,
      imageURL
    };
    
    const response = await createProduct(product, jwt);
    if (!response.error) {
      setSuccessMessage('Product Created!');
      setErrorMessage('');
      setTimeout(() => {
        closeModal();
        fetchAllProducts();
      }, 1000);
    } else {
      console.error(response.error);
      setErrorMessage(response.error);
    }
  };

  return (
    <>
      <Button
        variant='success'
        className='position-fixed sticky-bottom rounded-pill shadow'
        size='lg'
        style={{ bottom: '25px', right: '25px' }}
        onClick={() => {
          openModal();
        }}>
        Create Product
      </Button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header style={{ fontSize: '20px' }} closeButton>
          <Modal.Title className='w-100 text-center'>New Product</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}>
          <Form.Group className='m-3'>
            <FloatingLabel label='Title'>
              <Form.Control
                id='productTitle'
                placeholder='Title'
                required
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Description'>
              <Form.Control
                as='textarea'
                id='productDescription'
                placeholder='Description'
                required
                style={{ height: '80px' }}
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Price'>
              <Form.Control
                as='textarea'
                id='productPrice'
                placeholder='Price'
                required
                style={{ height: '80px' }}
                onChange={e => setPrice(e.target.value)}
                value={price}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Author'>
              <Form.Control
                as='textarea'
                id='productAuthor'
                placeholder='Author'
                required
                style={{ height: '80px' }}
                onChange={e => setAuthor(e.target.value)}
                value={author}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Genre'>
              <Form.Control
                as='textarea'
                id='productGenre'
                placeholder='Genre'
                required
                style={{ height: '80px' }}
                onChange={e => setGenre(e.target.value)}
                value={genre}
              />
            </FloatingLabel>
          </Form.Group>

          {/* Not sure how to do image */}
          {/* <Form.Group className='m-3'>
            <FloatingLabel label='imageURL'>
              <Form.Control
                as='textarea'
                id=''
                placeholder='Description'
                required
                style={{ height: '80px' }}
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            </FloatingLabel>
          </Form.Group> */}


          <Form.Group className='m-3 d-flex justify-content-end'>
            <Button variant='success' type='submit'>
              Create Product
            </Button>
          </Form.Group>
          {errorMessage && (
            <Alert variant='danger' className='mt-3'>
              Sorry, Product Title Already Exists!
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

export default CreateProduct;