import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import './Home.css';
import HeaderTitle from '../../components/HeaderTitle';
import HomeCentent from './HomeContent';

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
    //   <button onClick={() => window.location.href = '/user-update-profile'}>Update Profile</button>

    <div className="layout">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className="body">
        <HeaderTitle />
        <div className="content">
        <HomeCentent users = {userData}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
