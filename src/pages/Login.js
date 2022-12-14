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
        style={{ fontSize: '60px' }}>
        <Tab eventKey="Login" title="Log-In to Shop Best Books!"></Tab>
      </Tabs>
      <Container>
        <LoginForm navigate={navigate} setJwt={setJwt} />
      </Container>
    </>
  );
};

export default Login;
