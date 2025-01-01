import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/api.js';
import Sidebar from '../../components/Sidebar';
import './Request.css';
import HeaderTitle from '../../components/HeaderTitle.jsx';
import RequestContent from './RequestContent.jsx'

const Request = () => {
  const [requestData, setRequestData] = useState(null);
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await axiosInstance.get('/api/requests/', { withCredentials: true });
        setRequestData(response.data.requests);
        setUsersData(response.data.user);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchRequestData();
  }, []);
  
  return (
    <div className="layout">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className="body">
        <HeaderTitle />
        <div className="content">
        <RequestContent requestData={requestData} setRequestData={setRequestData} users= {usersData}/>
        </div>
      </div>
    </div>
  );
};

export default Request;
