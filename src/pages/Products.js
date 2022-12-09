import React from 'react';
import { ListGroup, Tabs, Tab, Card } from 'react-bootstrap';
import { ProductCard, CreateProduct } from '../components/index';

const Products = ({ jwt, products, user, navigate, allProducts }) => {


  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '60px' }}>
        <Tab className='pb-1' eventKey='activities' title='The Best Books on Everything'></Tab>
      </Tabs>
      <Card.Text className='mt-4' style={{ textAlign: 'center', fontSize: '30px', fontWeight: '800' }}>
        <img src='https://st.depositphotos.com/1008768/3366/i/450/depositphotos_33667401-stock-photo-free-shipping-sign.jpg' width='6%' />
        Enjoy Free Shipping on All Orders!
      </Card.Text>
      <ListGroup variant='flush'>
        {user.isAdmin && <CreateProduct user={user} jwt={jwt} allProducts={allProducts} />}
        <div id='outer div element'>
          {products ? (
            products.map(product => {
              return <ProductCard user={user} jwt={jwt} product={product} key={product.id} navigate={navigate} allProducts={allProducts} />
            })
          ) : (
            <h1>No Products Found!</h1>
          )}
        </div>
      </ListGroup>
    </>
  );
};

export default Products;