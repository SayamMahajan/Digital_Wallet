import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils/api.js';
import Sidebar from '../../components/Sidebar';
import './Transaction.css';
import HeaderTitle from '../../components/HeaderTitle.jsx';
import TransactionContent from './TransactionContent.jsx';

const Transaction = () => {
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
        <TransactionContent transactionData={transactionData} setTransactionData={setTransactionData} users= {usersData}/>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
