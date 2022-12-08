import React, { useState, useEffect } from 'react';
import { ListGroup, Tabs, Tab, Container, Col, Row, Button, Card } from 'react-bootstrap';
import { CartItemCard } from '../components/index';
import { getCart } from '../api'

const Cart = ({ jwt, products, navigate }) => {


  const [cartProducts, setCartProducts] = useState([]);


  async function allCartProducts() {
    setCartProducts(await getCart(jwt));
  }

  useEffect(() => {
    if (jwt) {
      allCartProducts();
    }
  }, [jwt]);

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '60px'}}>
        <Tab eventKey='activities' title='WooHoo! Great Book Finds!'></Tab>
      </Tabs>
      <Container>
        <ListGroup variant='flush' >
          <Card.Text className='mt-4' style={{ textAlign: 'center', fontSize: '30px', fontWeight: '800' }}>
            <img src='https://st.depositphotos.com/1008768/3366/i/450/depositphotos_33667401-stock-photo-free-shipping-sign.jpg' width='8%' />
            Enjoy Free Shipping on All Orders!
          </Card.Text>
          <Row>
            <Col id='cartbooks'>
              {cartProducts ? (
                cartProducts.map((product) => {
                  return <CartItemCard jwt={jwt} products={products} product={product} key={product.id} />
                })
              ) : (
                <span style={{ fontSize: '60px' }}>No Products Found!</span>
              )}
            </Col>
            <Col id='checkoutcard'>
              <div className='mt-5 me-5 mx-5'>
                <Row className='mb-3' style={{ fontSize: '28px' }}>
                  <Col>Shopping Cart:</Col>
                </Row>
                <Row>
                  <Col className='pe-5'>The Silent Patient</Col>
                  <Col className='pe-0'>Qty: 2</Col>
                  <Col className='pe-0'>$25.00 </Col>
                </Row>
                <Row className='pt-2'>
                  <Col className='pe-5'>Love on the Brain</Col>
                  <Col className='pe-0'>Qty: 3</Col>
                  <Col className='pe-0'>$36.00</Col>
                </Row>
                <Row className='pt-2'>
                  <Col className='pe-5'>Book Lovers</Col>
                  <Col className='pe-0'>Qty: 1</Col>
                  <Col className='pe-0'>$14.50</Col>
                </Row>
                <Row className='pt-2'>
                  <Col className='pe-5'>One Last Stop</Col>
                  <Col className='pe-0'>Qty: 4</Col>
                  <Col className='pe-0'>$42.00</Col>
                </Row>
                <Row className='mt-4'>
                  <Col className='pe-5'></Col>
                  <Col style={{ fontWeight: '500' }}>Shipping: FREE</Col>
                </Row>
                <Row className='mt-1'>
                  <Col className='pe-5'></Col>
                  <Col className='pe-0'>Total: $117.50</Col>
                </Row>
                <Row className='me-5 mx-5 mt-4 mb-5'>
                  <Button variant="light"
                    onClick={() => { navigate('/checkout') }}>
                    Checkout
                  </Button>
                </Row>

              </div>
            </Col>
          </Row>
        </ListGroup>
      </Container>
    </>
  );
};

export default Cart;