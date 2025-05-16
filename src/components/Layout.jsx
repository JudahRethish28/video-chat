import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
