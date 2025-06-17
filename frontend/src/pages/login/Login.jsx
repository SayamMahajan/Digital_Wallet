import React from 'react';
import LoginForm from '../../components/forms/LoginForm';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-page__container">
        <div className="login-page__form">
          <LoginForm />
        </div>
        <div className="login-page__image"></div>
      </div>
    </div>
  );
};

export default Login;