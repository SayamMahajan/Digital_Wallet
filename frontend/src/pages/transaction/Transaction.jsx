import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import './Transaction.css';
import HeaderTitle from '../../components/HeaderTitle.jsx';
import TransactionContent from './TransactionContent.jsx';

const Transaction = () => {
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions/', {
      withCredentials: true, 
    })
      .then(response => setTransactionData(response.data.user))
      .catch(error => console.error("Error fetching profile data:", error));
  }, []);

  return (
    <div className="layout">
      <div className='sidebar'>
        <Sidebar />
      </div>
      <div className="body">
        <HeaderTitle />
        <div className="content">
        <TransactionContent transactionData={transactionData}/>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
