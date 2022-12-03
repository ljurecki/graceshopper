import React, { useState } from 'react';
import { register } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterForm = ({ navigate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const registerUser = async () => {
    const results = await register(username, password);
    if (!results.error) {
      setSuccessMessage('Welcome to Best Books!');
      setErrorMessage('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      console.error(results.error);
      setErrorMessage(results.error);
    }
  };

  return (
    <Form
      id='forms'
      onSubmit={event => {
        event.preventDefault();
        registerUser();
      }}>
      <Form.Group className='mb-3' style={{ margin: '3% 25% 0px 25%' }}>
        <Form.Control
          placeholder='Create username'
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className='mb-3' style={{ margin: '2% 25% 0px 25%' }}>
        <Form.Control
          type='password'
          placeholder='Create Password'
          minLength={8}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group style={{ margin: '2% 25% 0px 25%' }}>
        <Button
          variant='success'
          type='submit'
          className='mx-2 justify-self-end'>
          Submit
        </Button>
        <Button
          variant='secondary'
          className='mx-2 justify-self-end'
          onClick={() => navigate('/login')}>
          Cancel
        </Button>
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
      </Form.Group>
    </Form>
  );
};

export default RegisterForm;
