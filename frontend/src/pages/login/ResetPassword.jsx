import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { axiosInstance } from '../../utils/api.js';
import './ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/api/auth/reset-password/${token}`, { newPassword });
      alert(response.data.message || 'Password reset successful');
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
        <div className="reset-password-container">
          <form onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <input
              id="new-reset-password"
              name="new-reset-password"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              aria-label="New Password"
              autoComplete="new-password"
            />
            <input
              id="confirm-reset-password"
              name="confirm-reset-password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="Confirm Password"
              autoComplete="new-password"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
        <div className="reset-password-image-container"></div>
      </div>
    </div>
  );
};

export default ResetPassword;
