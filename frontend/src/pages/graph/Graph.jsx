import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/api.js';
import Sidebar from '../../components/Sidebar.jsx';
import './Graph.css';
import HeaderTitle from '../../components/HeaderTitle.jsx';
import GraphContent from './GraphContent.jsx';

const Graph = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axiosInstance.get('/api/transactions/', { withCredentials: true });
        setTransactionData(response.data.transactions);
        setUsersData(response.data.user);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactionData();
  }, []);
  
  return (
    <div className="layout">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className="body">
        <HeaderTitle />
        <div className="content">
        <GraphContent transactionData={transactionData} setTransactionData={setTransactionData} users= {usersData}/>
        </div>
      </div>
    </div>
  );
};

export default Graph;
