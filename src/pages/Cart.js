import React from 'react';
import { Link } from 'react-router-dom';
const Cart = () => {
    return (
        <>
            <div id="title">
                <h1>
                    Cart!
                </h1>
                <Link to="/Checkout">Submit</Link>
            </div>
        </>
    )
};

export default Cart;