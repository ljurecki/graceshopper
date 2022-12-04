import React, { useState } from 'react';
import { login } from '../api';
import { Form, Button, Alert } from 'react-bootstrap';

const LoginForm = ({ navigate, setJwt }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loginUser = async () => {
    const result = await login(username, password);
    if (!result.error) {
      if (result.token) {
        setJwt(result.token);
        window.localStorage.setItem('jwt', result.token);
        setSuccessMessage('Welcome Back to Best Books!');
        setErrorMessage('');
        setTimeout(() => {
        navigate('/products');
        }, 1000);
      } else {
        console.error('No token returned from server')
        setErrorMessage('Welcome new book lover!  Please register!')
       
      }
    } else {
      console.error(result.error);
      setErrorMessage('Incorrect Username or Password');
    }
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        loginUser();
      }}>
      <Form.Group className='mb-3' style={{ margin: '3% 25% 0px 25%' }}>
        <Form.Control
          placeholder='Username'
          onChange={e => {
            setUsername(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group className='mb-3' style={{ margin: '2% 25% 0px 25%' }}>
        <Form.Control
          type='password'
          placeholder='Password'
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group style={{ margin: '2% 25% 0px 25%' }}>
        <Button
          variant='success'
          type='submit'
          className='mx-2 justify-self-end'
          onSubmit={() => navigate('/products')}>
          Submit
        </Button>
        <Button
          variant='primary'
          className='mx-2 justify-self-end'
          onClick={() => navigate('/register')}>
          Register
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

export default LoginForm;