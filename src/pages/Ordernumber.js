import React from 'react';
<link rel="stylesheet" href="checkout.css"></link>
function getRandomInt() {
    return Math.floor(Math.random() * 500  + 10000);
  }

const Ordernumber = ({time}) => {
    return (
        <>
            <div id="address">
                <h1>
                    Your Order Number is
                </h1>
              <h3>
             {getRandomInt() + "BB"}
              </h3>
            </div>
        </>
    )
};

export default Ordernumber;
