import React, { useState } from 'react';
import { Form, Button, Alert, Card, FloatingLabel } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { updateAudiobook } from '../api';

const editAudiobook = ({ jwt, navigate }) => {
  const loc = useLocation();
  const { audiobook } = loc.state;
  const { id, title, description, price, author, genre } = audiobook;

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [newName, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newPrice, setNewPrice] = useState(price);
  const [newAuthor, setNewAuthor] = useState(author);
  const [newGenre, setNewGenre] = useState(genre);

  async function editAudiobook() {
    const updatedProduct = {
      id,
      title: newTitle,
      description: newDescription,
      price: newPrice,
      author: newAuthor,
      genre: newGenre
    };

    const result = await updateAudiobook(jwt, updatedAudiobook);
    console.log(result);
    if (result.error) {
      console.error(result.error);
      setErrorMessage('Audiobook with this Title Already Exists!');
    } else {
      setSuccessMessage('Audiobook Updated!');
      setErrorMessage('');
      setTimeout(() => {
        navigate('./audiobooks');
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
          Update Audiobook
        </Card.Header>
        <Form
          id='forms'
          onSubmit={event => {
            event.preventDefault();
            EditAudiobook();
          }}>

          <Form.Group className='mb-3' style={{ margin: '1% 1% 0px 1%' }}>
            <FloatingLabel label='Audiobook Title'>
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
            <FloatingLabel label='Audiobook Description'>
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
            <FloatingLabel label='Audiobook Price'>
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
            <FloatingLabel label='Audiobook Author'>
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
            <FloatingLabel label='Audiobook Genre'>
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

          <Form.Group
            className='m-3 d-flex justify-content-end'
            style={{ margin: '1% 1% 0px 1%' }}>
            <Button variant='success' type='submit'>
              Update Audiobook
            </Button>

            <Button
              variant='secondary'
              className='mx-2'
              onClick={() => navigate('/audiobooks')}>
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

export default editAudiobook;