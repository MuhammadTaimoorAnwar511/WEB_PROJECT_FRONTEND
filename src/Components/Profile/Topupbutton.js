//4111111111111111
import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../Style/Profile/Topupbutton.css'; 

const MySwal = withReactContent(Swal);

const TopupButtonComponent = () => {

  //const Token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdkZGExMWJhNzUyZGEwMGZlYTdiZTEiLCJlbWFpbCI6IlRBSU1PT1JAZ21haWwuY29tIiwicm9sZSI6IkN1c3RvbWVyIiwiRnVsbE5hbWUiOiJUQUlNT09SIENVU1RPTUVSIiwiaWF0IjoxNzAzMTcyODYxLCJleHAiOjE3MzQ3MDg4NjF9.cynSojlPRLrJhR1IJvI31JT5UJZ7G1AerK6330W_A78";
 
  const Token = localStorage.getItem('token');//user token
  const publishableKey = 'pk_test_51OPldJFzPFUOK3imFOBg3pwRG1hGY5xrQFctU6e46OoKUd1uruLRlcoeYnEKDQnDqIVYmI3MZOEf2TNiXjPt1p7E00Av4w9JbM';

  const [topupAmount, setTopupAmount] = useState(0);

  const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };

  const payNow = async (token) => {
    try {
      const response = await axios({
        url: 'http://localhost:3001/payment',
        method: 'post',
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        data: {
          amount: topupAmount * 100, // Convert to cents
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="Topupcontainer">
      {/* <h2>Top-Up Balance</h2> */}
      <form className="Topupform">
        <label className="Topuplabel">
          Top-Up Amount (RS):
          <input className="Toputinput"
            type="number"
            value={topupAmount}
            onChange={(e) => setTopupAmount(parseFloat(e.target.value))}
            min="0"
           step="0.01"
          />
        </label>
      </form>
      <StripeCheckout 
        stripeKey={publishableKey}
        label="Top-Up Now"
        name="Top-Up Balance"
        billingAddress
        shippingAddress
        amount={topupAmount * 100} // Convert to cents
        description={`Top-Up Amount: RS${topupAmount.toFixed(2)}`}
        token={payNow}
      />
    </div>
  );
};

export default TopupButtonComponent;
