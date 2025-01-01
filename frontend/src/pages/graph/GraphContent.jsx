import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import './GraphContent.css';

const GraphContent = ({ transactionData, users }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (transactionData) {
      const formattedData = transactionData.map(transaction => {
        return {
          date: format(new Date(transaction.timestamp), 'MM/dd/yyyy'), 
          debit: transaction.sender_upi_id === users?.upi_id ? transaction.amount : 0, 
          credit: transaction.receiver_upi_id === users?.upi_id ? transaction.amount : 0, 
        };
      });

      setChartData(formattedData);
    }
  }, [transactionData, users]);

  return (
    <>
      {users && (
        <div className="content-header">
          <h2 className="user-welcome">Welcome, <span className="details-span">{users.firstName} {users.lastName}</span></h2>
          <p className="user-balance">Your current balance: <span className="details-span">{users.balance}</span></p>
        </div>
      )}
      <hr />
      <br />
      <div className="graph-container">
        {chartData.length === 0 ? (
          <div className="no-history">
            <img src="path/to/empty-history-image.png" alt="No transaction history" />
            <p>No transaction history available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="debit" stroke="#3F72AF" strokeWidth={3} />
              <Line type="monotone" dataKey="credit" stroke="#112D4E" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  );
};

export default GraphContent;
