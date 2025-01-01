import React, { useState, useEffect, useRef } from 'react';
import { axiosInstance } from '../../utils/api.js';
import { useNavigate, useLocation } from 'react-router-dom';
import './TransactionContent.css';

const TransactionContent = ({ transactionData, users }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSendForm, setShowSendForm] = useState(false);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [receiverUPI, setReceiverUPI] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [description, setDescription] = useState('');
  const [receiverName, setReceiverName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handledPaymentRef = useRef(new Set()); // Track processed payments

  // Handle PayPal success
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const payerId = queryParams.get('PayerID');

    if (paymentId && payerId) {
      const uniqueKey = `${paymentId}-${payerId}`;
      if (!handledPaymentRef.current.has(uniqueKey)) {
        handledPaymentRef.current.add(uniqueKey); // Mark as processed
        handlePaymentSuccess(paymentId, payerId);
      }
    }
  }, [location.search]);

  const handlePaymentSuccess = async (paymentId, payerId) => {
    try {
      const response = await axiosInstance.post(
        '/api/transactions/handlePaymentSuccess',
        { paymentId, payerId },
        { withCredentials: true }
      );
      alert(response.data.message);
      navigate('/transactions');
    } catch (error) {
      alert('Error verifying payment. Please try again.');
    }
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSendClick = () => {
    setShowSendForm(true);
    setReceiverName(null);
    setErrorMessage('');
  };

  const handleDepositClick = () => {
    setShowDepositForm(true);
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
    const cleanedAmount = parseFloat(sendAmount);

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
      setSendAmount('');
      setDescription('');
      setReceiverName(null);
      setErrorMessage('');
      setShowSendForm(false);
    } catch (error) {
      alert('Transaction failed. Please try again.');
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 40) {
      setDescription(e.target.value);
    }
  };

  const handlePaypalDeposit = async () => {
    if (isProcessing) return; // Prevent double clicks
    setIsProcessing(true); // Set a flag to prevent re-entry
  
    try {
      const response = await axiosInstance.post(
        '/api/transactions/deposit',
        { amount: depositAmount },
        { withCredentials: true }
      );
  
      const { approvalUrl } = response.data;
  
      if (approvalUrl) {
        window.location.href = approvalUrl; // Redirect to PayPal
      } else {
        alert('Failed to fetch PayPal approval URL.');
      }
    } catch (error) {
      alert('Error during payment processing. Please try again.');
    } finally {
      setIsProcessing(false); // Reset flag
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
            name="searchBar"
            type="text"
            placeholder="Search by transaction id, UPI, date, or description"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <div className="transaction-buttons">
          <button onClick={handleDepositClick}>Deposit</button>
          <button onClick={handleSendClick}>Send</button>
        </div>
      </div>
      <hr />
      <div className="transaction-list-container">
        <div className="transaction-list">
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map((transaction, index) => {
              let transactionType = '';
              if (transaction.sender_upi_id === users.upi_id && transaction.receiver_upi_id === users.upi_id) {
                transactionType = 'Deposit'; 
              } else if (transaction.sender_upi_id === users.upi_id) {
                transactionType = 'Debit'; 
              } else {
                transactionType = 'Credit';
              }

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
              id="send-amount"
              name="sendAmount"
              type="number"
              placeholder="Amount"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              autoComplete="off"
            />
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Short description (40 letters max) (Optional)"
              value={description}
              onChange={handleDescriptionChange}
              autoComplete="off"
            />
            <button onClick={handleSendTransaction}>Send</button>
          </div>
        </div>
      )}

      {showDepositForm && (
        <div className="deposit-form-modal">
          <div className="deposit-form">
            <h3>Deposit Money</h3>
            <span className="close-btn" onClick={() => setShowDepositForm(false)}>&times;</span>
            <input
              id="deposit-amount"
              name="depositAmount"
              type="number"
              placeholder="Amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              autoComplete="off"
            />
            {depositAmount > 0 && (
              <button onClick={handlePaypalDeposit}>Proceed with PayPal</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionContent;
