import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import UserDetails from '../components/User/UserDetails.jsx';
import NewTransaction from '../components/Transactions/NewTransaction.jsx';
import TransactionList from '../components/Transactions/TransactionList.jsx';
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Please log in to access the dashboard.</p>;

  return (
    <div>
      <h2>Dashboard</h2>
      <UserDetails />
      <NewTransaction />
      <TransactionList />
    </div>
  );
};

export default Dashboard;
