import React, { useState } from 'react';
import { addProductToCart,  } from '../api';
import { Card, ListGroup, Button, Tab, Tabs, Container, Row, Col} from 'react-bootstrap';


const ProductCard = ({ jwt , product}) => {
const { id, title, imageurl, description, price, author, genre } = product;
const [qty, setQty] = useState(1);
return (
<ListGroup.Item
    key={id}
    className='px-0 py-3 mx-3 d-flex flex-column'>
    <Card.Text>
      <Container >
      <h1 className='ms-1 pb-3 pt-4 d-flex justify-content-start'>{title}</h1>

      <Row className='d-flex flex-shrink'>
    <Col className='pt-2'xs lg="2">
    <img src={imageurl} className='pb-3'/>
    <br></br>Author: {author}
    </Col>
    <Col>
    {description}
    </Col>
      </Row>
    </Container>
    <Container >
      <Tabs
      defaultActiveKey="price"
      id="uncontrolled-tab-example"
      className='mx-3 pt-0 d-flex justify-content-end'>
      <Tab className='pe-4 pt-2 float-end' eventKey="genre" title="Genre">
      {genre}
      </Tab>
      <Tab className='pe-4 pt-2  float-end' eventKey="price" title="Price">
      ${price}
      </Tab>
      </Tabs>
      
     {jwt ? (
       <Card.Text className='mt-5 pt-2 pb-4 d-flex justify-content-end'>
       <input className='me-2' min="0" type="number" value={qty} onChange={(event) => setQty(event.target.value)}></input>
        <Button variant="outline-primary" onClick={async () => {
          const product = await addProductToCart(jwt, { productId: id, qty })
          console.log(product)
        }
        
      }>Add to Cart</Button>
      </Card.Text>
        ) : null
      }
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