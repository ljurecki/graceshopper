import React from 'react';
import { ListGroup, Tabs, Tab} from 'react-bootstrap';
import { ProductCard, CreateProduct } from '../components/index';

const Products = ({jwt, products, user, navigate}) => {

 return (
  <>
    <Tabs
      justify='true'
      variant='pills'
      className='bg-dark'
      style={{ fontSize: '60px' }}>
      <Tab className='pb-1' eventKey='activities' title='Find the Best Books'></Tab>
    </Tabs>

    <ListGroup variant='flush'>
    {user.isAdmin && <CreateProduct user={user} jwt={jwt} />}
      <div id='outer div element'>
      {products ? (
        products.map(product => {
         return <ProductCard user={user} jwt={jwt} product={product} key={product.id} navigate={navigate}/>
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
