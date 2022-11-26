import React from 'react';
<link rel="stylesheet" href="checkout.css"></link>
function time(){
    var number = Math.floor(Math.random() * 30);
   
  }

const Ordernumber = ({time}) => {
    return (
        <>
            <div id="address">
                <h1>
                    Your Order Number is
                </h1>
              <h3>
             {time}
              </h3>
            </div>
        </>
    )
};

export default Ordernumber;