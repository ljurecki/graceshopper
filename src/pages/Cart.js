import React, {useState, useEffect} from 'react';
import { ListGroup, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartItemCard } from '../components/index';
import {getCart} from '../api'

const Cart = ({jwt, products}) => {
  const [cartProducts, setCartProducts] = useState([]);

  async function allCartProducts() {
    setCartProducts(await getCart(jwt));
  }

  useEffect(() => {
    if(jwt) {
      allCartProducts();
    }
  }, [jwt]);

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey='activities' title='Cart'></Tab>
      </Tabs>
<<<<<<< HEAD

      <ListGroup variant='flush'>

        {cartProducts ? (
          cartProducts.map(products => {
            return <CartItemCard products={products} />
=======
      <ListGroup variant='flush'>

        {cartProducts ? (
          cartProducts.map((product) => {
            return <CartItemCard products={products} product={product} key={product.id}/>
>>>>>>> 81ae97df20831b3a4ecb437ac69d40d639714793
          })
        ) : (
          <h1>No Products Found!</h1>
        )}
<<<<<<< HEAD
=======

>>>>>>> 81ae97df20831b3a4ecb437ac69d40d639714793
      </ListGroup>
<Link to="/Checkout">Submit</Link>
    </>
  );
};

export default Cart;
