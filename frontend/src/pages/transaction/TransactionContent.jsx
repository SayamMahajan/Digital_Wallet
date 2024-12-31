import React, { useState } from 'react';
import { axiosInstance } from '../../utils/api.js';
import './TransactionContent.css';

const TransactionContent = ({ transactionData, users }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSendForm, setShowSendForm] = useState(false);
  const [receiverUPI, setReceiverUPI] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [receiverName, setReceiverName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSendClick = () => {
    setShowSendForm(true);
    setReceiverName(null);
    setErrorMessage('');
  };

  const handleVerifyReceiver = async () => {
    const cleanedUPI = receiverUPI.trim();
  
    try {
      const response = await axiosInstance.get(`/api/users/upi/${cleanedUPI}`, { withCredentials: true });
      setReceiverName(response.data.name);
      setErrorMessage('');
    } catch (error) {
      setReceiverName(null);
      setErrorMessage('Receiver not found. Please check the UPI ID.');
    }
  };
  
  const handleSendTransaction = async () => {
    const cleanedReceiverUPI = receiverUPI.trim();
    const cleanedAmount = parseFloat(amount);
  
    try {
      const response = await axiosInstance.post(
        '/api/transactions',
        {
          sender_upi_id: users.upi_id,
          receiver_upi_id: cleanedReceiverUPI,
          amount: cleanedAmount,
          description,
        },
        { withCredentials: true }
      );
      alert(response.data.message);
      setReceiverUPI('');
      setAmount('');
      setDescription('');
      setReceiverName(null);
      setErrorMessage('');
      setShowSendForm(false);
    } catch (error) {
      alert('Transaction failed. Please try again.');
    }
  };
  

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 20) {
      setDescription(e.target.value);
    }
  };

  const filteredTransactions = transactionData && transactionData.length > 0
  ? transactionData.filter((transaction) =>
      transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.sender_upi_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.receiver_upi_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.timestamp &&
        new Date(transaction.timestamp).toLocaleDateString().includes(searchQuery)) ||
      (transaction._id && transaction._id.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : [];


  const sortedTransactions = filteredTransactions.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="transaction-content-container">
      <div className="transaction-header">
        <h2 className="transaction-h2">Transactions</h2>
        <div className="transaction-search">
          <input
            id="transaction-search-input"
            name='searchBar'
            type="text"
            placeholder="Search by transaction id, UPI, date, or description"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="transaction-buttons">
          <button>Deposit</button>
          <button onClick={handleSendClick}>Send</button>
        </div>
      </div>
      <hr />
      <div className="transaction-list-container">
        <div className="transaction-list">
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map((transaction, index) => {
              const transactionType =
                transaction.sender_upi_id === users.upi_id ? "Debit" : "Credit";
              return (
                <div key={index} className="transaction-item">
                  <div className="transaction-item-row">
                    <span className="transaction-item-label">Transaction Id:</span>
                    <span>{transaction._id}</span>
                  </div>
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
                    <span>{transactionType}</span> 
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
              );
            })
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

      {showSendForm && (
        <div className="send-form-modal">
          <div className="send-form">
            <h3>Send Money</h3>
            <span className="close-btn" onClick={() => setShowSendForm(false)}>&times;</span>
            <input
              id="receiver-upi-id"
              name="receiverUPI"
              type="text"
              placeholder="Receiver's UPI ID"
              value={receiverUPI}
              onChange={(e) => setReceiverUPI(e.target.value)}
              onBlur={handleVerifyReceiver}
              autoComplete="off"
            />
            {receiverName && <p>Receiver Name: {receiverName}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
            />
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Short description (20 letters max) (Optional)"
              value={description}
              onChange={handleDescriptionChange}
              autoComplete="off"
            />
            <button onClick={handleSendTransaction}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionContent;
