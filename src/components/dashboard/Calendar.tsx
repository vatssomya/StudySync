import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();
    
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday = 
        today.getDate() === i && 
        today.getMonth() === month && 
        today.getFullYear() === year;
      
      days.push(
        <div 
          key={`day-${i}`} 
          className={`flex items-center justify-center h-12 w-12 rounded-full cursor-pointer 
            ${isToday ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-100 dark:hover:bg-indigo-900'}`}
        >
          {i}
        </div>
      );
    }
    
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Previous month"
          >
            <ChevronLeft size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
          <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
            {monthName} {year}
          </h3>
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Next month"
          >
            <ChevronRight size={24} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {days}
        </div>
      </>
    );
  };
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Calendar</h2>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;
