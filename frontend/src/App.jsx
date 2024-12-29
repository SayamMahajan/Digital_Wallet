import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/login.jsx'; 
import Signup from './pages/signup/Signup.jsx'; 
import EmailConfirmation from './pages/signup/EmailConfirmation.jsx'; 
import ForgotPassword from './pages/login/ForgotPassword.jsx'; 
import ResetPassword from './pages/login/ResetPassword.jsx';
// import Home from './pages/Home/Home.jsx';
import './App.css';
import NewOtp from './pages/signup/NewOtp.jsx';

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
        
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
