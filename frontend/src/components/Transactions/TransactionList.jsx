import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../../utils/api.jsx';
import "./TransactionList.css";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  return (
    <div>
      <h3>Your Transactions</h3>
      <ul>
        {transactions.map((tx) => (
          <li key={tx._id}>
            {tx.sender_upi_id} sent {tx.amount} to {tx.receiver_upi_id} on {new Date(tx.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
