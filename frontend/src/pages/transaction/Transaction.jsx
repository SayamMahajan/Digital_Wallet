import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import Layout from '../../components/layout/Layout';
import TransactionContent from './TransactionContent';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Transaction = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const api = useApi();

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await api.get('/api/transactions/');
        setTransactionData(response.transactions);
        setUsersData(response.user);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactionData();
  }, []);

  if (api.loading || !transactionData || !usersData) {
    return (
      <Layout>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '400px' 
        }}>
          <LoadingSpinner size="large" color="white" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <TransactionContent 
        transactionData={transactionData} 
        setTransactionData={setTransactionData} 
        users={usersData}
      />
    </Layout>
  );
};

export default Transaction;