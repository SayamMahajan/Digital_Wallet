import React, { useState } from 'react';
import { axiosInstance } from '../../utils/api.js';
import './RequestContent.css';

const RequestContent = ({ requestData, setRequestData, users }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [receiverUPI, setReceiverUPI] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [requestAmount, setRequestAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTab, setSelectedTab] = useState('sent'); 

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get('/api/requests/', { withCredentials: true });
      setRequestData(response.data.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleRequestClick = () => {
    setShowRequestForm(true);
    setErrorMessage('');
  };

  const handleVerifyReceiver = async () => {
    const cleanedUPI = receiverUPI.trim();
    if (users.upi_id === cleanedUPI) {
      setReceiverName(`${users.firstName} ${users.lastName}`);
      setErrorMessage('Cannot request money from yourself.');
      return;
    }

    try {
      const response = await axiosInstance.get(`/api/users/upi/${cleanedUPI}`, { withCredentials: true });
      setReceiverName(response.data.name);
      setErrorMessage('');
    } catch (error) {
      setReceiverName(null);
      setErrorMessage('Receiver not found. Please check the UPI ID.');
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 40) {
      setDescription(e.target.value);
    }
  };

  const roundToFiveDecimalPlaces = (value) => {
    return Math.round(value * 100000) / 100000;
  };

  const handleRequest = async () => {
    const cleanedReceiverUPI = receiverUPI.trim();
    const cleanedAmount = roundToFiveDecimalPlaces(parseFloat(requestAmount));

    try {
      const response = await axiosInstance.post(
        '/api/requests/send-request',
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
      setRequestAmount('');
      setDescription('');
      setReceiverName(null);
      setErrorMessage('');
      setShowRequestForm(false);
      await fetchRequests();
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Request failed. Please try again.');
    }
  };

  const handleAction = async (action, requestId, senderUPI, receiverUPI, amount) => {
    try {
      const response = await axiosInstance.post(
        'api/requests/update-status',
        {
          requestId,     
          action,         
          sender_upi_id: senderUPI,  
          receiver_upi_id: receiverUPI,  
          amount,  
        },
        { withCredentials: true }
      );
      alert(response.data.message);
      await fetchRequests();
    } catch (error) {
      console.error(`Error ${action === 'accept' ? 'accepting' : 'rejecting'} request:`, error);
    }
  };
  

  const filteredRequests =
  selectedTab === 'sent'
    ? (requestData || []).filter((req) => req.sender_upi_id === users.upi_id)
    : (requestData || []).filter((req) => req.receiver_upi_id === users.upi_id);


  return (
    <div className="request-content-container">
      <div className="request-header">
        <h2 className="request-h2">Requests</h2>
        <div className="request-button">
          <button onClick={handleRequestClick}>Request</button>
        </div>
      </div>
      <hr />
      <div className="request-button-container">
        <button
          className={`sent-button ${selectedTab === 'sent' ? 'active' : ''}`}
          onClick={() => handleTabChange('sent')}
        >
          Sent
        </button>
        <button
          className={`received-button ${selectedTab === 'received' ? 'active' : ''}`}
          onClick={() => handleTabChange('received')}
        >
          Received
        </button>
      </div>
      <br />
      <hr />
      <div className="request-list-container">
        <div className="request-list">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <div key={request._id} className="request-item">
                <div className="request-item-row">
                  <span className="request-item-label">Sender:</span>
                  <span>{request.sender_upi_id}</span>
                </div>
                <div className="request-item-row">
                  <span className="request-item-label">Receiver:</span>
                  <span>{request.receiver_upi_id}</span>
                </div>
                <div className="request-item-row">
                  <span className="request-item-label">Amount:</span>
                  <span>₹{request.amount}</span>
                </div>
                <div className="request-item-row">
                  <span className="request-item-label">Description:</span>
                  <span>{request.description}</span>
                </div>
                <div className="request-item-row">
                  <span className="request-item-label">Status:</span>
                  <span>{request.status}</span>
                </div>
                <div className="request-item-row">
                  <span className="request-item-label">Date:</span>
                  <span>{request.timestamp}</span>
                </div>
                {selectedTab === 'received' && request.status === 'pending' && (
                  <div className="request-item-actions">
                    <button
                      onClick={() =>
                        handleAction('accept', request._id, request.sender_upi_id, request.receiver_upi_id, request.amount)
                      }
                      className="accept-btn"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() =>
                        handleAction('reject', request._id, request.sender_upi_id, request.receiver_upi_id, request.amount)
                      }
                      className="reject-btn"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-request">
                <img
                  src="/images/RequestImage.png"
                  alt="No Data Found"
                  className="no-transaction-image"
                />
                <p>No data to display</p>
              </div>
          )}
        </div>
      </div>
      {showRequestForm && (
        <div className="request-form-modal">
          <div className="request-form">
            <h3>Request Money</h3>
            <span className="close-btn" onClick={() => setShowRequestForm(false)}>
              &times;
            </span>
            <input
              type="text"
              placeholder="Receiver's UPI ID"
              value={receiverUPI}
              onChange={(e) => setReceiverUPI(e.target.value)}
              onBlur={handleVerifyReceiver}
            />
            {receiverName && <p>Receiver Name: {receiverName}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input
              type="number"
              placeholder="Amount"
              value={requestAmount}
              onChange={(e) => setRequestAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Short description (Optional)"
              value={description}
              onChange={handleDescriptionChange}
              maxLength={40}
            />
            <button onClick={handleRequest}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestContent;
