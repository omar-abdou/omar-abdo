
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center bg-red-50 border border-red-200 rounded-lg">
      <div className="w-16 h-16 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-lg font-semibold text-red-700">حدث خطأ</p>
      <p className="text-slate-600">{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-colors"
      >
        المحاولة مرة أخرى
      </button>
    </div>
  );
};

export default ErrorDisplay;
