import React from 'react';
import { Form, Button, FloatingLabel, Tabs, Tab, Container } from 'react-bootstrap';

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
            <Container>
                <Form>
                    <Form.Group className='m-3 mt-5'>
                        <Form.Label><h1>Shipping Information</h1></Form.Label>
                        <FloatingLabel label='Full Name'>
                            <Form.Control
                                style={{ width: '40%' }}
                                placeholder='Full Name' />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='m-3'>
                        <FloatingLabel label='Address Line 1'>
                            <Form.Control
                                style={{ width: '75%' }}
                                placeholder='Address1' />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='m-3'>

                        <FloatingLabel label='Address Line 2'>
                            <Form.Control
                                style={{ width: '75%' }}
                                placeholder='Address2' />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='m-3'>
                        <FloatingLabel label='City'>
                            <Form.Control
                            style={{ width: '25%' }}
                                placeholder='City' />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='m-3'>
                        <FloatingLabel label='State'>
                            <Form.Control
                            style={{ width: '25%' }}
                                placeholder='State' />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='m-3'>
                        <FloatingLabel label='Zipcode'>
                            <Form.Control
                                id='zipcode'
                                style={{ width: '10%' }}
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
                        <Button className="mb-3 mx-3" variant="primary"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/Ordernumber')
                            }}>
                            Submit Order
                        </Button>
                    </Form.Group>
                </Form>
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


