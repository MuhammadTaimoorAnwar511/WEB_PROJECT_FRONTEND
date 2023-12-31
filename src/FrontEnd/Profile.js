import { useState, useEffect } from 'react';
import Navebar from '../Components/Navebar';
import ProfileInfoCard from '../Components/Profile/ProfileInfoCard';
import TopupButtonComponent from '../Components/Profile/Topupbutton';
import '../Style/Profile/Profile.css';

function Profile() {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // State to store the top-up history
  const [topupHistory, setTopupHistory] = useState([]);
  // State to store the payment history
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    console.log("topup history  use effect trigger");
    // Function to fetch top-up history
    const fetchTopupHistory = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/client/topup-balance-history', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch top-up history');
        }

        const data = await response.json();
        setTopupHistory(data.topUpHistory);
      } catch (error) {
        console.error(error.message);
      }
    };

    // Call the fetch function
    fetchTopupHistory();
  }, [token,topupHistory]); // Call the effect when the token changes

  useEffect(() => {
    console.log("payment history  use effect for payment history trigger");
    // Function to fetch payment history
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/client/getallPaymentHistory', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payment history');
        }

        const data = await response.json();
        setPaymentHistory(data.paymentHistory); // Update state with the correct property
      } catch (error) {
        console.error(error.message);
      }
    };

    // Call the fetch function
    fetchPaymentHistory();
  }, [token,paymentHistory]); // Call the effect when the token changes

  return (
    <>
      <div>
        {/* define in component */}
        <Navebar />
        {/* define in component */}
        <ProfileInfoCard />
      </div>
      <div style={{ background: 'linear-gradient(to right, #000000, #3533CD)', padding: '20px', minHeight: '15vh', fontFamily: 'Arial, sans-serif', color: '#ffffff', }}>
        {/* DEFINE IN COMPONENTS */}
        <TopupButtonComponent />
        <h2>TOPUP's HISTORY</h2>
        <div className="history-container">
          {topupHistory.map((item, index) => (
            <div key={index} className="history-item">
              <p className="history-date">Date: {item.timestamp}</p>
              <p className="history-amount">Amount: RS{item.amount}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'linear-gradient(to right, #000000, #3533CD)', padding: '20px', minHeight: '15vh', fontFamily: 'Arial, sans-serif', color: '#ffffff', }}>
        <h2>Payments HISTORY</h2>
        <div className="history-container">
          {paymentHistory.map((item, index) => (
            <div key={index} className="history-item">
              <p className="history-date">Date: {item.createdAt}</p>
              <p className="history-message">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
