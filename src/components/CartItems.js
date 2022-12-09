import React, { useState } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { deleteCartProduct, updateCartProduct } from '../api'

const CartItemCard = ({ jwt, products, product }) => {
    const { productId, qty } = product;
    const [newQty, setNewQty] = useState(qty);


    if (productId) {
        const [cart_Product] = products.filter((product) => product.id === productId);
        const { id, imageurl, price } = cart_Product;

        return (
            <ListGroup.Item
                key={id}
                className='px-0 py-3 mx-3 d-flex flex-column'>
                <Card.Text>
                    <img src={imageurl} />
                    <Card.Text className='mt-3' style={{fontSize:'18px', fontWeight:'500'}}>
                        Price: ${price}
                    </Card.Text>
                    <Card.Text> Qty: <input id='input' min="1" max="100" type="number" placeholder={qty}
                        onChange={(event) => {
                            setNewQty(event.target.value);
                            updateCartProduct(jwt, productId, parseInt(newQty) + 1)
                        }}>
                    </input>
                        <Button className='mx-2 mt-3' variant="outline-warning"
                            onClick={() => {
                                deleteCartProduct(jwt, productId);
                               
                            }}>
                            Remove
                        </Button>
                    </Card.Text>
                </Card.Text>
            </ListGroup.Item>
        )
    } else {
        <h1> No items in cart...</h1>
    };
};

export default CartItemCard;