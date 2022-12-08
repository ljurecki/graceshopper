import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <>
      <Container style={{
        textAlign: "center",
      }}>
        <Link to="/products">
          <img style={{ fontSize: "48px", padding: "3%" }}
            src="https://fivebooks.com/app/uploads/2021/03/five-books-homepage-best-books-on-everything-share-image-8.jpg"></img>
        </Link>
        <Card.Text className='mt-4'
          style={{ textAlign: 'center', fontSize: '40px', fontWeight: '800' }}>
          <img src='https://st.depositphotos.com/1008768/3366/i/450/depositphotos_33667401-stock-photo-free-shipping-sign.jpg' width='10%' />
          Enjoy Free Shipping on All Orders!
        </Card.Text>
      </Container>
    </>
  )
};

export default Home;
