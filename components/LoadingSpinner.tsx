
import React from 'react';

interface LoadingSpinnerProps {
    message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <div className="w-16 h-16 border-4 border-t-4 border-t-sky-500 border-slate-200 rounded-full animate-spin"></div>
      <p className="text-lg font-semibold text-slate-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
