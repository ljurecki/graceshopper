import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, ListGroup } from 'react-bootstrap';
import { CheckoutCartItemCard } from '../components';
import { getCart } from '../api'

const Ordernumber = ({ jwt, products }) => {

    const [cartProducts, setCartProducts] = useState([]);

    function getRandomInt() {
        return Math.floor(Math.random() * 500 + 10000);
    }

    async function allCartProducts() {
        setCartProducts(await getCart(jwt));
    }

    useEffect(() => {
        if (jwt) {
            allCartProducts();
        }
    }, [jwt]);

    return (
        <>
            <Tabs
                justify='true'
                variant='pills'
                className='bg-dark'
                style={{ fontSize: '60px' }}>
                <Tab eventKey="Login" title="Thank You, Happy Reading!"></Tab>
            </Tabs>
            <Container>
                <div id='orderinfo'>
                    <h1 className='mt-5'>
                        Your Order Number Is:
                    </h1>
                    <h3>{getRandomInt() + "BB"}</h3>
                    <h2 className='mt-5'>These Books Will See You Soon:</h2>
                    <ListGroup variant='flush'>
                        <div id='orderedbooks'>
                            {cartProducts ? (
                                cartProducts.map((product) => {
                                    return <CheckoutCartItemCard products={products} product={product} key={product.id} />
                                })
                            ) : (
                                <h1>No Products Found!</h1>
                            )}
                        </div>
                    </ListGroup>
                </div>
            </Container >
        </>
    )
};

export default Ordernumber;
