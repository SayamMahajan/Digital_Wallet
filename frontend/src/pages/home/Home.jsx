import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/api.js';
import Sidebar from '../../components/Sidebar';
import './Home.css';
import HeaderTitle from '../../components/HeaderTitle';
import HomeCentent from './HomeContent';

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/api/users/profile', { withCredentials: true });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
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
