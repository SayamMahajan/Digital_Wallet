import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/api.js';
import './EmailConfirmation.css';

const EmailConfirmation = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/verify-email', { otp });
      if (response.data.success) {
        alert('Email verified successfully!');
        navigate('/login'); 
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="split-container">
        <div className="email-confirmation-image-container"></div>

        <div className="email-confirmation-container">
          <form onSubmit={handleSubmit}>
            <h1>Email Confirmation</h1>
            <p>Enter the 6-digit OTP sent to your email:</p>
            <input
              id="otp"
              name="otp"
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              autoComplete="off"
              pattern="\d{6}" 
              title="Enter a 6-digit OTP"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
