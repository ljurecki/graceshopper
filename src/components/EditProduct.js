import React, { useState } from 'react';
import { updateProduct } from '../api';
import { Button, Form, FloatingLabel, Alert } from 'react-bootstrap';

const EditProduct = ({ jwt, product, allProducts }) => {
  const { id, title, imageurl, description, price, author, genre } = product;

  const [newTitle, setNewTitle] = useState(title);
  const [newImageurl, setNewImageurl] = useState(imageurl);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newGenre, setNewGenre] = useState(genre);
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [showModal, setShowModal] = useState();


  async function handleSubmit() {
    const updatedProduct = {
      id, 
      title: newTitle,
      imageurl: newImageurl,
      description: newDescription,
      price: newPrice,
      author: newAuthor,
      genre: newGenre,
    };
    const result = await updateProduct(jwt, updatedProduct );
    if (result) {
      setSuccessMessage('Product Updated!');
      setErrorMessage('');
      setTimeout(() => {
        closeModal();
        allProducts()
      }, 1000);
    } else {
      console.error(error);
      setErrorMessage(error);
    }
  };

  
const closeModal = () => {
  setShowModal(false);
};


  return (
    <>
        <Form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}>
          <Form.Group className='m-3'>
            <FloatingLabel label='Title'>
              <Form.Control
                placeholder={title}
                onChange={e => setNewTitle(e.target.value)}
                value={newTitle}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Description'>
              <Form.Control
                as='textarea'
                id='newProductDescription'
                placeholder={description}
                style={{ height: '150px' }}
                onChange={e => setNewDescription(e.target.value)}
                value={newDescription}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Price'>
              <Form.Control
                id='newProductPrice'
                placeholder={price}
                onChange={e => setNewPrice(e.target.value)}
                value={newPrice}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Author'>
              <Form.Control
                id='newProductAuthor'
                placeholder={author}
                onChange={e => setNewAuthor(e.target.value)}
                value={newAuthor}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Genre'>
              <Form.Control
                id='productGenre'
                placeholder={genre}
                onChange={e => setNewGenre(e.target.value)}
                value={newGenre}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='m-3'>
            <FloatingLabel label='imageURL'>
              <Form.Control
                as='textarea'
                id='newImageUrl'
                placeholder={imageurl}
                style={{ height: '80px' }}
                onChange={e => {setNewImageurl(e.target.value)}}
                value={newImageurl}
              />
            </FloatingLabel>
          </Form.Group>


          <Form.Group className='m-3 d-flex justify-content-end'>
            <Button variant='outline-primary' type='submit'>
              Update Product
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
    </>
  );
};

export default EditProduct;