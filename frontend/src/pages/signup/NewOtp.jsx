import React, { useState } from 'react';
import { axiosInstance } from '../../utils/api.js';
import { useNavigate } from 'react-router-dom';
import './NewOtp.css';

const NewOtp = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/resend-verification-token', { email });
      alert(response.data.message || 'New otp was sent');
      navigate('/verify-email');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="split-container">
        <div className="new-otp-image-container"></div>
        <div className="new-otp-container">
          <form onSubmit={handleSubmit}>
            <h1>New Verification OTP</h1>
            <input
              id="new-otp"
              name="new-otp" 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
              autoComplete="email"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send New OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewOtp;
