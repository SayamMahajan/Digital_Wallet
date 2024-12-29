import React, { useState } from 'react';
import { axiosInstance } from '../../utils/api.js';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/forgot-password', { email });
      alert(response.data.message || 'Password reset link sent');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="split-container">
        <div className="forgot-password-container">
          <form onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
            <input
              id="forgot-password" // Add this line
              name="forgot-password" // Add this line
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
              autoComplete="email"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        </div>
        <div className="forgot-password-image-container"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
