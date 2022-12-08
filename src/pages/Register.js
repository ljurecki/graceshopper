import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import { RegisterForm } from '../components';

const Register = ({ navigate }) => {
  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '60px' }}>
        <Tab eventKey="Register" title="Start Shopping Best Books!"></Tab>
      </Tabs>
    <Container>
      <RegisterForm navigate={navigate} />
    </Container>
    </>
  );
};

export default Register;
