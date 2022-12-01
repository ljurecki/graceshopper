import React, { useState, useEffect, jwt } from 'react';
import { getAllProducts} from '../api';

import { Card, ListGroup, Tab, Tabs, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {
  const [productsToDisplay, setProductsToDisplay] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function allProducts() {
    setProductsToDisplay(await getAllProducts());
    console.log("see something",getAllProducts)
  }

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <>
      <Tabs
        justify='true'
        variant='pills'
        className='bg-dark'
        style={{ fontSize: '25px' }}>
        <Tab eventKey='Products' title='Products'></Tab>
      
          {/* <Tab eventKey='deleteproducts' title='deleteProducts'>
            <Products
              Products={Products}
              deleteProduct={deleteProduct}
            />
          </Tab> */}
        
        </Tabs>

      <ListGroup variant='flush'>

        {productsToDisplay ? (
          productsToDisplay.map(product => {
            const { id, title, imageurl, description, price, author, genre } = product;
            return (
              <ListGroup.Item
                key={id}
                className='px-0 py-3 mx-3 d-flex flex-column'>
                <Card.Title>
                  {title}
                </Card.Title>
                <Card.Text>
                  <img src={imageurl}/>,
                  Description: {description},
                  Price: {price},
                  Author: {author},
                  Genre: {genre}
                </Card.Text>
                
                  <Link to={`/Products/${id}`}>
                    <Button variant='info'>Edit</Button>
                  </Link>
                  <Link to={`/Cart/${id}`}>
                    <Button variant='info'>Select</Button>
                  </Link>
                
              </ListGroup.Item>
            );
          })
        ) : (
          <h1>No Products Found!</h1>
        )}
      </ListGroup>
    </>
  );
};

export default Products;