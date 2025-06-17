import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`spinner spinner--${size} spinner--${color}`}>
      <div className="spinner__circle"></div>
    </div>
  );
};

export default LoadingSpinner;