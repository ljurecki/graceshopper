import React from 'react';
import { Link } from 'react-router-dom';
<link rel="stylesheet" href="checkout.css"></link>
import './checkout.css';


const Checkout = () => {
    return (
        <>
            <div id="address">
                <h1>
                    Billing Address
                </h1>
                <form id="addressOne">
                    <label>Name </label><input type="text" required/>
                    <label>Address Line 1: </label> <input type="text" required/>
                    <label>State </label><input type="text" required/>
                    <label>Zipcode </label><input type="text" required/>
                </form>
                <h1>
                    Credit Card/Debit Card Info
                </h1>
                <form id="addressTwo">
                <label>Name </label> <input type="text"/>
                    <label>Address Line 1: </label><input type="text" required/>
                    <label>State </label><input type="text" required/>
                    <label>Zipcode </label><input type="text"required/>
                    <label>Card Number </label><input type="text"required/>
                    <label>CVC </label><input type="text" required/>
                    <label>Experation Date </label><input type="text" required/>
                </form>
                <Link to="/Ordernumber">Submit Order</Link>
            </div>
        </>
    )
};

export default Checkout;
