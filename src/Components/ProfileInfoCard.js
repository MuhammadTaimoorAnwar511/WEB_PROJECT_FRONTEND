
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const ProfileInfoCard = () => {
  const [profileData, setProfileData] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/client/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Received profile data:', data);
          setProfileData(data);
 
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error during profile data fetch:', error);
      }
    };
    // Function to initialize Bootstrap components
    fetchProfileData();
  }, [token,profileData]);

  return (
    <div className="card">
      <div className="card-header">
        User Profile
      </div>
      <div className="card-body">
        {profileData &&  (
          <>
            <h5 className="card-title" style={{ position: 'relative' }}>
              {profileData.FullName}
              <span
                className="edit-icon"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 0,
                  transform: 'translateY(-50%)',
                  marginLeft: '10px', 
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </span>
            </h5>
            <p className="card-text">Email: {profileData.Email}</p>
            <p className="card-text">Role: {profileData.Role}</p>
            <p className="card-text">Interests: {profileData.Interests.join(', ')}</p>
            <p className="card-text">Account Balance: {profileData.AccountBalance}</p>
            <p className="card-text">Freeze Balance: {profileData.FreezeBalance}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileInfoCard;
