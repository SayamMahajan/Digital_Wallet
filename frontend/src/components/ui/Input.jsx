import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({ 
  label,
  error,
  helperText,
  className = '',
  type = 'text',
  ...props 
}, ref) => {
  const inputClass = [
    'input',
    error ? 'input--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {label && (
        <label className="input__label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputClass}
        {...props}
      />
      {error && (
        <span className="input__error">{error}</span>
      )}
      {helperText && !error && (
        <span className="input__helper">{helperText}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;