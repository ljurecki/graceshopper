import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const CheckoutCartItemCard = ({ products, product }) => {
    const { productId} = product;

    if (productId) {
        const [cart_Product] = products.filter((product) => product.id === productId);
        const { id, imageurl} = cart_Product;

        console.log(cart_Product)
        return (
            <ListGroup.Item
                key={id}
                className='px-0 py-3 mx-3 d-flex flex-column'>
                <Card.Text>
                    <img src={imageurl} />
                </Card.Text>
            </ListGroup.Item>
        )
    }
};

export default CheckoutCartItemCard;