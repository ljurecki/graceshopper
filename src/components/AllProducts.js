import React, { useState } from 'react';
import { addProductToCart, deleteProduct } from '../api';
import { Card, ListGroup, Button, Tab, Tabs, Container, Row, Col, Modal, Alert } from 'react-bootstrap';
import { EditProduct } from '../components';
// import { Link } from 'react-router-dom';

const ProductCard = ({ jwt, product, user, allProducts, navigate }) => {
  const { id, title, imageurl, description, price, author, genre } = product;
  const [qty, setQty] = useState(1);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');



  async function addToCart() {
    const newCartProduct = {
      productId: id,
      qty
    };
    const result = await addProductToCart(jwt, newCartProduct);
    if (result.error) {
      console.error(result.error);
    } else {
      setSuccessMessage('Great Choice! Book added to your cart');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    }
  }

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShow(true);


  const handleShow = () => {
    setErrorMessage('');
    setSuccessMessage('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    allProducts()
  };


  async function handleDelete() {
    const result = await deleteProduct(jwt, id);
    if (result) {
      setSuccessMessage('Product Deleted!');
      setErrorMessage('');
      setTimeout(() => {
        closeModal();     
      }, 1000);
    } else {
      setErrorMessage('');
    }
  };



  return (

    <ListGroup.Item
      key={id}
      className='px-3 py-3 mx-3'>
      <Card.Text>
        <Container >
          <span className='ms-1 pt-4 d-flex justify-content-start' style={{ fontSize: '30px', fontWeight: '500' }}>
            {title}
          </span>
          <span className='ms-1 pb-1 d-flex justify-content-start'>by {author}</span>
          <Row>
            <Col className='pt-2' xs lg="3">
              <img src={imageurl} className='pb-3' />
            </Col>
            <Col>
              <Tabs
                defaultActiveKey="price"
                id="uncontrolled-tab-example"
                className='mx-3 pt-0 d-flex justify-content-end'>
                <Tab className='pe-4 pt-2 float-end' eventKey="description" title="Description">
                  <Button variant="light" onClick={() => {
                    openModal();
                  }}>Read Full Description</Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header style={{ fontSize: '20px' }} closeButton>
                      {title}, by {author}
                    </Modal.Header>
                    <Modal.Body>
                      {description}
                    </Modal.Body>
                  </Modal>
                </Tab>
                <Tab className='pe-4 pt-2 float-end' eventKey="genre" title="Genre">
                  {genre}
                </Tab>
                <Tab className='pe-4 pt-2 float-end' eventKey="price" title="Price">
                  <h4>${price}</h4>
                </Tab>
              </Tabs>

              {jwt ? (
                <>
                  <Card.Text className='mt-5 pt-5 pb-4 d-flex justify-content-end flex-wrap'>
                    Qty: <input className='me-2 mx-2' id='input' min="1" max="100" type="number" value={qty}
                      onChange={(event) => setQty(event.target.value)}></input>
                    <Button variant="outline-primary"
                      onClick={event => {
                        event.preventDefault();
                        addToCart();
                      }}>
                      Add to Cart
                    </Button>
                  </Card.Text>
                  <Card.Text className='d-flex justify-content-end flex-wrap'>
                    {successMessage && (
                      <Alert id='addprodalert' variant='success'>
                        {successMessage}
                      </Alert>
                    )}
                  </Card.Text>
                </>
              ) : <Card.Text className='mt-5 pt-5 pb-4 d-flex justify-content-end flex-wrap'>
                <Button variant="outline-primary" 
                onClick={() => {navigate('/login')}}
                >
                  Log-in to add to cart
                  </Button>
                  </Card.Text>
              }
              {user.isAdmin ? (
                <>
                  <Card.Text className='d-flex justify-content-end flex-wrap'>
                    <Button className='mx-2' variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete();
                        allProducts()
                      }
                      }>
                      Delete
                    </Button>
                    <Button variant="outline-secondary"
                      onClick={event => {
                        event.preventDefault();
                        handleShow();
                        allProducts()
                      }}
                    >
                      Edit
                    </Button>
                    <>
                      <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header style={{ fontSize: '20px' }} closeButton>
                          <Modal.Title className='w-100 text-center'>Update Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <EditProduct jwt={jwt} product={product} allProducts={allProducts} />
                        </Modal.Body>
                      </Modal>
                    </>
                  </Card.Text>
                </>
              ) : null}
            </Col></Row>
            {errorMessage && (
            <Alert variant='danger' className='mt-3'>
              {errorMessage}
            </Alert>
          )}
        </Container>
      </Card.Text>
    </ListGroup.Item>
  );
};

export default ProductCard;

