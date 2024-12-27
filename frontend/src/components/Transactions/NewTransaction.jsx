import React, { useState } from 'react';
import { createTransaction } from '../../utils/api.jsx';
import "./NewTransaction.css";

const NewTransaction = () => {
  const [senderUpi, setSenderUpi] = useState('');
  const [receiverUpi, setReceiverUpi] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await createTransaction(senderUpi, receiverUpi, amount);
      setMessage(response.message);
      setAmount('');
      setReceiverUpi('');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Transaction failed!');
    }
  };

  return (
    <div>
      <h3>Create a New Transaction</h3>
      <form onSubmit={handleTransaction}>
        <input
          type="text"
          placeholder="Your UPI ID"
          value={senderUpi}
          onChange={(e) => setSenderUpi(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Receiver's UPI ID"
          value={receiverUpi}
          onChange={(e) => setReceiverUpi(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Send Money</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NewTransaction;
