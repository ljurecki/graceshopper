import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const CartItemCard = ({ products, product }) => {
    const { productId, qty } = product;

    if (productId) {
    const [cart_Product] = products.filter((product) => product.id === productId);
    const { id, title, imageurl, description, price, author, genre } = cart_Product;

    console.log(cart_Product)
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
                Qty:<input type="number" value={qty} onChange={(event) => setQty(event.target.value)}></input>
            </Card.Text>
        </ListGroup.Item>
    )} else {
        <h1> No items in cart...</h1>
    };
};

export default CartItemCard;