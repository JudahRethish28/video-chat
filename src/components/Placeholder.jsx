import React from 'react';

const Placeholder = ({ text = 'Loading video and transcript...' }) => (
  <div className="flex flex-col items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
    <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-4" />
    <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
    <div className="mt-4 text-gray-400">{text}</div>
  </div>
);

export default Placeholder;
