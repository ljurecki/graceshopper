import React, { useState, useEffect } from 'react';
import { ListGroup, Tabs, Tab, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartItemCard } from '../components/index';
import { getCart } from '../api'

const Cart = ({ jwt, products, allProducts}) => {


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
        style={{ fontSize: '60px' }}>
        <Tab eventKey='activities' title='Great Book Finds!'></Tab>
      </Tabs>
      <Container>
        <ListGroup variant='flush'>
          <Row>
            <Col>
              {cartProducts ? (
                cartProducts.map((product) => {
                  return <CartItemCard jwt={jwt} products={products} product={product} allProducts={allProducts} key={product.id} />
                })
              ) : (
                <span style={{ fontSize: '60px' }}>No Products Found!</span>
              )}
            </Col>
            <Col>
              <Link to="/Checkout">Checkout</Link>

            </Col>
          </Row>
        </ListGroup>
      </Container>
    </>
  );
};

export default Cart;