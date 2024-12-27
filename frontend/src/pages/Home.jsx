import React from 'react';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1>Welcome to FastPay</h1>
      <Login />
      <Signup />
    </div>
  );
};

export default Home;
