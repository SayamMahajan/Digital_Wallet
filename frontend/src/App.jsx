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
import Graph from './pages/graph/Graph.jsx';
import './App.css';
import NewOtp from './pages/signup/NewOtp.jsx';
import PrivateRoute from './components/PrivateRoute.jsx'; 

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
        

        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/transactions" element={<PrivateRoute element={<Transaction />} />} />
        <Route path="/requests" element={<PrivateRoute element={<Request />} />} />
        <Route path="/graphs" element={<PrivateRoute element={<Graph />} />} />
      </Routes>
    </Router>
  );
};

export default App;
