import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserDetails from '../components/User/UserDetails';
import NewTransaction from '../components/Transactions/NewTransaction';
import TransactionList from '../components/Transactions/TransactionList';
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
