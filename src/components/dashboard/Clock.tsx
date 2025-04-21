import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());
  
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => clearInterval(timerId);
  }, []);
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="flex flex-col items-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-200">
      <div className="text-6xl font text-indigo-600 dark:text-indigo-400 mb-4">
        {formatTime(time)}
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 text-center">
        {formatDate(time)}
      </div>
    </div>
  );
};

export default Clock;
