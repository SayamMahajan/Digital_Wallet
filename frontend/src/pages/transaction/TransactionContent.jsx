import React from 'react';
import './TransactionContent.css';

const TransactionContent = () => {
  const dummyTransactions = [
    {
      sender_upi_id: 'user1@upi',
      receiver_upi_id: 'user2@upi',
      amount: 500,
      timestamp: '2024-12-01T10:00:00Z',
      transaction_type: 'debit',
      description: 'Payment for groceries',
    },
    {
      sender_upi_id: 'sayamuser12345678889963@oneclickaway',
      receiver_upi_id: 'sayamuser12345678889963@oneclickaway',
      amount: 1500,
      timestamp: '2024-12-05T15:30:00Z',
      transaction_type: 'credit',
      description: 'Refund for event booking',
    },
    {
      sender_upi_id: 'user2@upi',
      receiver_upi_id: 'user1@upi',
      amount: 200,
      timestamp: '2024-12-10T12:00:00Z',
      transaction_type: 'debit',
      description: 'Lunch payment',
    },
  ];

  return (
    <div className="transaction-content-container">
      <div className="transaction-header">
        <h2 className="transaction-h2">Transactions</h2>
        <div className="transaction-buttons">
          <button>Deposit</button>
          <button>Send</button>
        </div>
      </div>
      <hr />
      <div className="transaction-list-container">
        <div className="transaction-list">
          {dummyTransactions.length > 0 ? (
            dummyTransactions.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <div className="transaction-item-row">
                  <span className="transaction-item-label">Sender:</span>
                  <span>{transaction.sender_upi_id}</span>
                </div>
                <div className="transaction-item-row">
                  <span className="transaction-item-label">Receiver:</span>
                  <span>{transaction.receiver_upi_id}</span>
                </div>
                <div className="transaction-item-row">
                  <span className="transaction-item-label">Amount:</span>
                  <span>₹{transaction.amount}</span>
                </div>
                <div className="transaction-item-row">
                  <span className="transaction-item-label">Type:</span>
                  <span>{transaction.transaction_type}</span>
                </div>
                <div className="transaction-item-row">
                  <span className="transaction-item-label">Description:</span>
                  <span>{transaction.description}</span>
                </div>
                <div className="transaction-item-row">
                  <span className="transaction-item-label">Date:</span>
                  <span>{new Date(transaction.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-transaction">
              <img
                src="/images/TransactionImage.jpg"
                alt="No Transactions"
                className="no-transaction-image"
              />
              <p>No transactions to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionContent;
