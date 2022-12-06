import React, {useState} from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import {deleteCartProduct, updateCartProduct} from '../api'

const CartItemCard = ({ products, product }) => {
    const { productId, qty } = product;
    const [newQty, setNewQty] = useState(qty);

    if (productId) {
        const [cart_Product] = products.filter((product) => product.id === productId);
        const { id, title, imageurl, price } = cart_Product;

        return (
            <ListGroup.Item
                key={id}
                className='px-0 py-3 mx-3 d-flex flex-column'>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text>
                    <img src={imageurl} />,
                    Price: {price},
                    Qty:<input id='input' min="1" max="100" type="number" placeholder={qty}
                        onChange={(event) =>
                            setNewQty(event.target.value, updateCartProduct())}>
                    </input>
                    <Button className='mx-2' variant="outline-warning"
                        onClick={() => {
                            if (confirm('Are you sure you want to delete?')) {
                                deleteCartProduct();
                                console.log('delete cart button pressed')
                            }
                        }}>
                        Remove
                    </Button>
                </Card.Text>
            </ListGroup.Item>
        )
    } else {
        <h1> No items in cart...</h1>
    };
};

export default CartItemCard;