import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import Input from '../ui/Input';
import './LoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-form__header">
        <img src="/images/Logo.png" alt="Website Logo" className="login-form__logo" />
        <h1>Login</h1>
      </div>

      {errors.submit && (
        <div className="login-form__error">
          {errors.submit}
        </div>
      )}

      <Input
        id="login-email"
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
      />

      <Input
        id="login-password"
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
      />

      <div className="login-form__links">
        <a href="/forgot-password" className="login-form__link">
          Forgot Password?
        </a>
        <a href="/new-otp" className="login-form__link">
          Haven't verified email yet? New OTP
        </a>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        loading={loading}
        className="login-form__submit"
      >
        Login
      </Button>

      <p className="login-form__signup">
        <a href="/signup">Haven't created an account yet? Signup</a>
      </p>
    </form>
  );
};

export default LoginForm;