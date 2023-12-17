import React, { useState } from 'react';

function TopupButtonComponent() {
  const token = localStorage.getItem('token');
  const [topupAmount, setTopupAmount] = useState(0);

  const handleTopup = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/client/topup-balance', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topUpAmount: parseFloat(topupAmount), // Convert to a number if needed
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'Invalid top-up amount') {
          // Display an alert message
          alert('Invalid top-up amount. Please enter a valid amount.');
        } else {
          throw new Error('Failed to top-up balance');
        }
      } else {
        const data = await response.json();
        console.log(data.message); // Output the server response
        // You can update state, display a success message, or perform any other necessary actions.
      }
    } catch (error) {
      console.error(error.message);
    }
  };  
  return (
    <div>
      <p className="d-inline-flex gap-1">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          ADDBALANCE
        </button>
      </p>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="creditCardNumber" className="form-label">
                Credit Card Number
              </label>
              <input type="text" className="form-control" id="creditCardNumber" placeholder="Enter Credit Card Number" required />
            </div>
            <div className="mb-3">
              <label htmlFor="expiryDate" className="form-label">
                Expiry Date
              </label>
              <input type="date" className="form-control" id="expiryDate" placeholder="Select Expiry Date" required />
            </div>
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input type="text" className="form-control" id="cvv" placeholder="Enter CVV" required />
            </div>
            <div className="mb-3">
              <label htmlFor="cardType" className="form-label">
                Card Type
              </label>
              <select className="form-select" id="cardType">
                <option value="visa">Visa</option>
                <option value="mastercard">MasterCard</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="topupAmount" className="form-label">
                Topup Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="topupAmount"
                placeholder="Enter Topup Amount"
                required
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              type="button"
              onClick={handleTopup}
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              TOPUP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TopupButtonComponent;
