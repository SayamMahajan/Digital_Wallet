import React from 'react';
import Login from '../components/Auth/Login.jsx';
import Signup from '../components/Auth/Signup.jsx';
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
