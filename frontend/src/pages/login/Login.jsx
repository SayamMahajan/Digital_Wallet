import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/api.js';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      if (response.data.success) {
        navigate('/'); 
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="main-container">
      <div className="split-container">
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <div className="logo-header-container">
              <img src="/images/Logo.png" alt="Website Logo" className="website-logo" />
              <h1>Login</h1>
            </div>
            <input
              id="login-email" // Add this line
              name="email" // Add this line
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email Address"
              autoComplete="email"
            />
            <input
              id="login-password" // Add this line
              name="password" // Add this line
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
              autoComplete="current-password"
            />
            <a href="/forgot-password" className="forgot-password-link">Forgot Password?</a>
            <a href="/new-otp" className="forgot-password-link">Haven't verified email yet? New OTP</a>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <p className="signup-link">
              <a href="/signup">Haven't created an account yet? Signup</a>
            </p>
          </form>
        </div>
        <div className="login-image-container"></div>
      </div>
    </div>
  );
};

export default Login;
