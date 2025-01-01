import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login.jsx'; 
import Signup from './pages/signup/Signup.jsx'; 
import EmailConfirmation from './pages/signup/EmailConfirmation.jsx'; 
import ForgotPassword from './pages/login/ForgotPassword.jsx'; 
import ResetPassword from './pages/login/ResetPassword.jsx';
import Home from './pages/home/Home.jsx';
import Transaction from './pages/transaction/Transaction.jsx';
import Request from './pages/request/Request.jsx';
import './App.css';
import NewOtp from './pages/signup/NewOtp.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';  // Import the PrivateRoute component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailConfirmation />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-otp" element={<NewOtp />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Route */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/transactions" element={<PrivateRoute element={<Transaction />} />} />
        <Route path="/request" element={<PrivateRoute element={<Request />} />} />
      </Routes>
    </Router>
  );
};

export default App;
