import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'medium',
  ...props 
}) => {
  const cardClass = [
    'card',
    hover ? 'card--hover' : '',
    `card--padding-${padding}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} {...props}>
      {children}
    </div>
  );
};

export default Card;