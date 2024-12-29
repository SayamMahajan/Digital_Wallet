import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users/profile', {
      withCredentials: true, // Include credentials (cookies)
    })
      .then(response => setUserData(response.data.user))
      .catch(error => console.error("Error fetching profile data:", error));
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Upi Id:</strong> {userData.upi_id}</p>
      <p><strong>Balance:</strong> {userData.balance}</p>
      {/* Add any other user details you want to display */}
      <button onClick={() => window.location.href = '/user-update-profile'}>Update Profile</button>
    </div>
  );
};

export default Home;
