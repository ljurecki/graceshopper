import React, { useState } from 'react';
import { Form, Button, Alert, Card, FloatingLabel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { updateProduct } from '../api';

const EditProduct = ({ jwt, navigate }) => {
  const loc = useLocation();
  const { product } = loc.state;
  const { id, title, description, price, author, genre, imageURL } = product;

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [newName, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newGenre, setNewGenre] = useState(genre);
  const [newimageurl, setNewImageurl] = useState("imageurl");
  


  async function editProduct() {
    const updatedProduct = {
      id,
      title: newTitle,
      description: newDescription,
      price: newPrice,
      author: newAuthor,
      genre: newGenre
    };

    const result = await updateProduct(jwt, updatedProduct);
    console.log(result);
    if (result.error) {
      console.error(result.error);
      setErrorMessage('Product with this Title Already Exists!');
    } else {
      setSuccessMessage('Product Updated!');
      setErrorMessage('');
      setTimeout(() => {
        navigate('./products');
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
          Update Product
        </Card.Header>
        <Form
          id='forms'
          onSubmit={event => {
            event.preventDefault();
            editActivity();
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
            <FloatingLabel label='Product Description'>
              <Form.Control
                placeholder='Description'
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setNewDescription(e.target.value);
                }}
                value={newDescription}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Product Price'>
              <Form.Control
                placeholder='Price'
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setNewPrice(e.target.value);
                }}
                value={newPrice}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Product Author'>
              <Form.Control
                placeholder='Author'
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setNewAuthor(e.target.value);
                }}
                value={newAuthor}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Product Genre'>
              <Form.Control
                placeholder='Genre'
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setNewGenre(e.target.value);
                }}
                value={newGenre}
              />
            </FloatingLabel>
          </Form.Group>

        {/* Not sure about this one:
          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Product imageurl'>
              <Form.Control
                placeholder='image'
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setNewImage(e.target.value);
                }}
                value={newImage}
              />
            </FloatingLabel>
          </Form.Group> */}

          <Form.Group
            className='m-3 d-flex justify-content-end'
            style={{ margin: '1% 1% 0px 1%' }}>
            <Button variant='success' type='submit'>
              Update Product
            </Button>

            <Button
              variant='secondary'
              className='mx-2'
              onClick={() => navigate('/products')}>
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

export default EditProduct;