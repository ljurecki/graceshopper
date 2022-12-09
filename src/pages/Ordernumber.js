import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, ListGroup, Card } from 'react-bootstrap';
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
                <Tab eventKey="Login" title="Happy Reading!"></Tab>
            </Tabs>
            <Container>
                <div id='orderinfo'>
                <ListGroup variant='flush' className='mt-5'>
                <Card.Text style={{fontSize:'25px', fontWeight:'600'}}>Thank you, your order has been placed.</Card.Text> 
                <Card.Text style={{fontSize:'25px', fontWeight:'600'}}>Please check your email for tracking information.</Card.Text> 
                <Card.Text className='mt-4' style={{fontSize:'45px', fontWeight:'600'}}> Your Order Number Is:</Card.Text>
                <Card.Text style={{fontSize:'50px', fontWeight:'700', color:'#2258A1'}}> {getRandomInt() + "BB"}</Card.Text> 
                </ListGroup>
                <Card.Text className='mt-5' style={{fontSize:'30px', fontWeight:'600'}}>These Books Will See You Soon:</Card.Text>
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