import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { axiosInstance } from '../../utils/api.js';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axiosInstance.post('/api/auth/signup', { name, email, password });
      if (response.data.success) {
        alert('Signup successful. Please verify your email.');
        navigate('/verify-email'); 
      }
    } catch (error) {
      console.error(error); 
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="main-container">
      <div className="split-container">
        <div className="signup-image-container"></div>

        <div className="signup-container">
          <form onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <input
              id="signup-name" // Add this line
              name="name" // Add this line
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
            <input
              id="signup-email" // Add this line
              name="email" // Add this line
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              id="signup-password" // Add this line
              name="password" // Add this line
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Signing up...' : 'Signup'}
            </button>
            <a href="/login" className="login-link">
              Already have an account? Login
            </a>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;
