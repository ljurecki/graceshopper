import React, { useState } from 'react';
import { Button, Modal, Form, FloatingLabel, Alert } from 'react-bootstrap';
import { createAudiobook } from '../api';

const AudiobookForm = ({ jwt, user}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function addAudiobook() {
    const newAudiobook = {
      title,
      imageURL,
      description,
      price,
      author,
      genre
    };

    const result = await createAudiobook(jwt, user, newAudiobook);
    if (result.error) {
      console.error(result.error);
      setErrorMessage(result.error);
    } else {
      setSuccessMessage('Audiobook Created!');
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
        Create Audiobook
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ fontSize: '20px' }} closeButton>
          <Modal.Title className='w-100 text-center'>
            Create Audiobook
          </Modal.Title>
        </Modal.Header>
        <Form
          id='forms'
          onSubmit={event => {
            event.preventDefault();
            addAudiobook();
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
            <FloatingLabel label='Description'>
              <Form.Control
                placeholder=''
                required
                as='textarea'
                style={{ height: '80px' }}
                onChange={e => {
                  setDescription(e.target.value);
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
                addAudiobook();
              }}>
              Create Audiobook
            </Button>

          </Form.Group>
          {errorMessage && (
            <Alert variant='danger'>
              Sorry, Audiobook Title Already Exists!
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

export default AudiobookForm;