import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../Style/Notification.css';

const Navebar = () => {
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log("Notification use effect trigger");
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/client/allnotifications', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // console.log('Received data:', data);

          // Update this line to extract the 'notifications' array
          setNotifications(data.notifications || []);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error during notification fetch:', error);
      }
    };

    if (dropdownOpen) {
      // Fetch notifications when the dropdown is opened
      fetchNotifications();
    }
  }, [dropdownOpen, token,notifications]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/Profile" className="navbar-brand">
            <FontAwesomeIcon icon={faUser} /> {/* Profile icon */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
                <Link to="/Home" className="nav-link" aria-current="page">
                  <FontAwesomeIcon icon={faHome} /> {/* Home icon */}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={toggleDropdown}
                >
                  <FontAwesomeIcon icon={faBell} /> {/* Notification icon */}
                </Link>
                <ul className="dropdown-menu">
                  {notifications.map((notification) => (
                    <li key={notification.id}>
                      <a className="dropdown-item" href="#">
                        {notification.message}
                      </a>
                    </li>
                  ))}
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/FreeLancerMarketPlace" className="nav-link">
                  FreeLancer MarketPlace
                </Link>
              </li>
              <Link to="/SellerMarketPlace" className="nav-link">
                Seller MarketPlace
              </Link>
              <Link to="/PurchasedProduct" className="nav-link">
                PurchasedProduct
              </Link>

            </ul>

            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navebar;
