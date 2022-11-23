import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { LoginForm } from '../components';

const Login = ({ navigate, setJwt }) => {

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey="Login" title="Login!"></Tab>
      </Tabs>
    <Container>
      <LoginForm navigate={navigate} setJwt = {setJwt} />
    </Container>
    </>
  );
};

export default Login;
