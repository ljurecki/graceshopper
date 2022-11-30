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
        style={{ fontSize: '25px' }}>
        <Tab eventKey="Register" title="Register!"></Tab>
      </Tabs>
    <Container>
      <RegisterForm navigate={navigate} />
    </Container>
    </>
  );
};

export default Register;
