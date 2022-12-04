import React from 'react';
<link rel="stylesheet" href="checkout.css"></link>
import './checkout.css';
function getRandomInt() {
    return Math.floor(Math.random() * 500  + 10000);
  }

const Ordernumber = ({time}) => {
    return (
        <>
            <div id="address">
                <h1 id="orderNumber">
                    Your Order Number is
                </h1>
              <h3 id="orderNumberReturn">
             {getRandomInt() + "BB"}
             </h3>
            
              
              <img src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
     />       </div>
        </>
    )
};

export default Ordernumber;