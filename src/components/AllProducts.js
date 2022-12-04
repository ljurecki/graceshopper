import React, { useState } from 'react';
import { addProductToCart, deleteProduct} from '../api';
import { Card, ListGroup, Button, Tab, Tabs, Container, Row, Col, Modal, Alert} from 'react-bootstrap';


const ProductCard = ({ jwt , product, user, navigate }) => {
const { id, title, imageurl, description, price, author, genre } = product;
const [qty, setQty] = useState(1);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [successMessage, setSuccessMessage] = useState('');

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

return (

<ListGroup.Item
    key={id}
    className='px-3 py-3 mx-3'>
    <Card.Text>
      <Container >
      <h1 className='ms-1 pt-4 d-flex justify-content-start'>
      {title}
      </h1>
      <span className='ms-1 pb-1 d-flex justify-content-start'>by {author}</span>
      <Row>
    <Col className='pt-2'xs lg="3">
    <img src={imageurl} className='pb-3'/>
    </Col>
      <Col>
      <Tabs
      defaultActiveKey="price"
      id="uncontrolled-tab-example"
      className='mx-3 pt-0 d-flex justify-content-end'>
      <Tab className='pe-4 pt-2 float-end' eventKey="description" title="Description">
        <Button variant="light" onClick={() => {
          handleShow();
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
      <h4 >${price}</h4>
      </Tab>
      </Tabs>
      
     {jwt ? (
      <>
       <Card.Text className='mt-5 pt-5 pb-4 d-flex justify-content-end flex-wrap'>
       <input className='me-2' id='input' min="1" max="100" type="number" value={qty} onChange={(event) => setQty(event.target.value)}></input>
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
     ) : null
      }
      {user.isAdmin ? (
      <>
      <Card.Text className='d-flex justify-content-end flex-wrap'>
        <Button className='mx-2' variant="danger" 
        onClick={() => {
          if (confirm('Are you sure you want to delete?')) {
            deleteProduct();
            navigate('./products');
            console.log('delete button pressed')
            }
          }}>
        Delete
      </Button>
      <Button variant="outline-info" 
        // onClick={event => {
        //   event.preventDefault();
        //         editProduct();}}
        >
        Edit
      </Button>
      </Card.Text>
     </> 
     ) : null } 
      </Col></Row>
      </Container>
      </Card.Text>
  </ListGroup.Item>
);
};

export default ProductCard;



// {user.isAdmin ? (
//     <div>
//      <input type="number" value={qty} onChange={(event) => setQty(event.target.value)}></input>
//       <Button variant='info' onClick={async () => {
//           const product = await addProductToCart(jwt, { productId: id, qty })
//       }
          
//           }>Add to Cart</Button>
//     </div>) : null
//   }

