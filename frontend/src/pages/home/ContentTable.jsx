import React from 'react';
import Paper from '@mui/material/Paper';
import './ContentTable.css';

const ContentTable = ({ users = [] }) => {
  if (!Array.isArray(users)) {
    console.error("Invalid data: 'users' is not an array", users);
    return <div>No valid user data available.</div>;
  }

  return (
    <div className="table-layout">
      {users.map((user, index) => (
        <Paper key={index} className="user-card">
          <div className="content-user-detail">
            <strong className="label">First Name:</strong>
            <span className="value">{user.firstName}</span>
          </div>
          <div className="content-user-detail">
            <strong className="label">Last Name:</strong>
            <span className="value">{user.lastName}</span>
          </div>
          <div className="content-user-detail">
            <strong className="label">Email:</strong>
            <span className="value">{user.email}</span>
          </div>
          <div className="content-user-detail">
            <strong className="label">UPI ID:</strong>
            <span className="value">{user.upi_id}</span>
          </div>
          <div className="content-user-detail">
            <strong className="label">Balance:</strong>
            <span className="value">₹{user.balance}</span>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default ContentTable;
