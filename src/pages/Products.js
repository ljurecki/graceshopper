import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';
import { Card, ListGroup, Tab, Tabs } from 'react-bootstrap';
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
        <Tab eventKey='cart' title='Products'></Tab>
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
                  {/* {jwt ? (
                  <Link to={`/activities/${id}`} state={{ activity: activity }}>
                    <Button variant='info'>Edit</Button>
                  </Link>
                ) : null} */}
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