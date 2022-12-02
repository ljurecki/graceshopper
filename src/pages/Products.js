import React from 'react';
import { ListGroup, Tabs, Tab } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { ProductCard } from '../components/index';

const Products = ({jwt, products}) => {

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '60px' }}>
        <Tab className='pb-3' eventKey='activities' title='Find the Best Books'></Tab>
      </Tabs>

      <ListGroup variant='flush'>

        {products ? (
          products.map(product => {
           return <ProductCard jwt={jwt} product={product} key={product.id} />
          })
        ) : (
          <h1>No Products Found!</h1>
        )}
      </ListGroup>
    </>
  );
};

export default Products;