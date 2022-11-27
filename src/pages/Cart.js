import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../api';
import { ActivityForm } from '../components';
import { Button, Card, ListGroup, Modal, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';



// import React from 'react';

const Cart = () => {
    return (
        <>
            <div id="title">
                <h1>
                    Cart!
                </h1>
            </div>
        </>
    )
};

export default Cart;