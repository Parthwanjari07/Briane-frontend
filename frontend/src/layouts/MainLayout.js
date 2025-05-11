import React from 'react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../contexts/ThemeContext';

const MainLayout = ({ children }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-dark-200' : 'bg-gray-100'}`}>
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;