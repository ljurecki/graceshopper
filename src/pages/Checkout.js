import React from 'react';
import { Form, Button, FloatingLabel, Tabs, Tab, Container, Row, Col } from 'react-bootstrap';

const Checkout = ({ navigate }) => {

    return (
        <>
            <Tabs
                justify='true'
                variant='pills'
                className='bg-dark'
                style={{ fontSize: '60px' }}>
                <Tab eventKey="Login" title="Almost Yours, Checkout!"></Tab>
            </Tabs>
            <Container className='mb-5'>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className='m-3 mt-5'>
                                <Form.Label><h1>Shipping Information</h1></Form.Label>
                                <FloatingLabel label='Full Name'>
                                    <Form.Control
                                        style={{ width: '45%' }}
                                        placeholder='Full Name' />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='m-3'>
                                <FloatingLabel label='Email Address'>
                                    <Form.Control
                                        style={{ width: '75%' }}
                                        placeholder='Email Address' />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='m-3'>

                                <FloatingLabel label='Address Line'>
                                    <Form.Control
                                        style={{ width: '75%' }}
                                        placeholder='Address' />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='m-3'>
                                <FloatingLabel label='City'>
                                    <Form.Control
                                        style={{ width: '45%' }}
                                        placeholder='City' />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='m-3'>
                                <FloatingLabel label='State'>
                                    <Form.Control
                                        style={{ width: '45%' }}
                                        placeholder='State' />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='m-3'>
                                <FloatingLabel label='Zipcode'>
                                    <Form.Control
                                        id='zipcode'
                                        style={{ width: '100px' }}
                                        placeholder='zipcode' />
                                </FloatingLabel>
                            </Form.Group>

                            <Form.Group className='m-3 mt-5'>
                                <Form.Label><h1>Billing Information</h1></Form.Label>

                                <Form.Group className='m-3'>
                                    <FloatingLabel label='Card Number'>
                                        <Form.Control
                                            style={{ width: '40%' }}
                                            placeholder='Card Number' />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className='m-3'>
                                    <FloatingLabel label='CVC'>
                                        <Form.Control
                                            style={{ width: '40%' }}
                                            placeholder='cvc' />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className='m-3'>
                                    <FloatingLabel label='Expiration Code'>
                                        <Form.Control
                                            style={{ width: '40%' }}
                                            placeholder='Expiration Code' />
                                    </FloatingLabel>
                                </Form.Group>

                                <Form.Group className="mb-3 mx-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Billing Address Same as Shipping Address" defaultChecked={true} />
                                </Form.Group>

                            </Form.Group>
                        </Form></Col>
                    <Col id='checkoutcard'>
                        <div className='mt-5 me-5 mx-5'>
                            <Row className='mb-3' style={{ fontSize: '28px' }}>
                                <Col>Shopping Cart:</Col>
                            </Row>
                            <Row>
                                <Col className='pe-5'>The Silent Patient</Col>
                                <Col className='pe-0'>Qty: 2</Col>
                                <Col className='pe-0'>$25.00 </Col>
                            </Row>
                            <Row className='pt-2'>
                                <Col className='pe-5'>Love on the Brain</Col>
                                <Col className='pe-0'>Qty: 3</Col>
                                <Col className='pe-0'>$36.00</Col>
                            </Row>
                            <Row className='pt-2'>
                                <Col className='pe-5'>Book Lovers</Col>
                                <Col className='pe-0'>Qty: 1</Col>
                                <Col className='pe-0'>$14.50</Col>
                            </Row>
                            <Row className='pt-2'>
                                <Col className='pe-5'>One Last Stop</Col>
                                <Col className='pe-0'>Qty: 4</Col>
                                <Col className='pe-0'>$42.00</Col>
                            </Row>
                            <Row className='mt-5'>
                                <Col className='pe-5'></Col>
                                <Col style={{ fontWeight: '500' }}>Shipping: FREE</Col>
                            </Row>
                            <Row className='mt-1'>
                                <Col className='pe-5'></Col>
                                <Col className='pe-0'>Total: $117.50</Col>
                            </Row>
                            <Row className='me-5 mx-5 mt-4 mb-5'>
                                <Button variant="light"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/Ordernumber')
                                    }}>
                                    Submit Order
                                </Button>
                                <Button className='mt-3' variant="light"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/cart')
                                    }}>
                                    Back to Cart
                                </Button>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Checkout;


{/* 

    return (
        <>
            <div id="address">
                <h1>
                    Billing Address
                </h1>
                <form id="addressOne">
                    <label>name <input type="text"/></label>
                    <label>Address Line 1: <input type="text"/></label>
                    <label>State <input type="text"/></label>
                    <label>Zipcode <input type="text"/></label>
                </form>
                <h1>
                    Credit Card/Debit Card Info
                </h1>
                <form id="addressTwo">
                <label>name <input type="text"/></label>
                    <label>Address Line 1: <input type="text"/></label>
                    <label>State <input type="text"/></label>
                    <label>Zipcode <input type="text"/></label>
                    <label>Card Number <input type="text"/></label>
                    <label>CVC <input type="text"/></label>
                    <label>Experation Date <input type="text"/></label>
                </form>
                <Link to="/Ordernumber">Submit</Link>
            </div>
        </>
    )
}; */}


