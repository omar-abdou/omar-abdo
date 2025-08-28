
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-brand-gray-medium border border-brand-gray-light rounded-lg shadow-lg p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
