import React, { useState } from 'react';
import { createProduct } from '../api';
import { Button, Modal, Form, FloatingLabel, Alert } from 'react-bootstrap';

const CreateProduct = ({ jwt, user }) => {
  const [title, setTitle] = useState('');
  const [imageurl, setImageurl] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setTitle('');
    setImageurl(''); 
    setDescription('');
    setPrice('');
    setAuthor('');
    setGenre('');
  };

  async function handleSubmit() {
    const newProduct = {
      title,
      imageurl,
      description,
      price,
      author,
      genre,
    };
    const result = await createProduct(jwt, user, newProduct );
    if (result) {
      setSuccessMessage('Product Created!');
      setErrorMessage('');
      setTimeout(() => {
        closeModal();
      }, 1000);
    } else {
      console.error(error);
      setErrorMessage(error);
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
                style={{ height: '150px' }}
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Price'>
              <Form.Control
                id='productPrice'
                placeholder='Price'
                required
                onChange={e => setPrice(e.target.value)}
                value={price}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Author'>
              <Form.Control
                id='productAuthor'
                placeholder='Author'
                required
                onChange={e => setAuthor(e.target.value)}
                value={author}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Genre'>
              <Form.Control
                id='productGenre'
                placeholder='Genre'
                required
                onChange={e => setGenre(e.target.value)}
                value={genre}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='m-3'>
            <FloatingLabel label='imageURL'>
              <Form.Control
                as='textarea'
                id='imageUrl'
                placeholder='imageurl'
                required
                style={{ height: '80px' }}
                onChange={e => {setImageurl(e.target.value)}}
                value={imageurl}
              />
            </FloatingLabel>
          </Form.Group>


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