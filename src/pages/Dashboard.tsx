import React from 'react';
import Clock from '../components/dashboard/Clock';
import Calendar from '../components/dashboard/Calendar';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import MotivationalQuote from '../components/dashboard/MotivationalQuote';

const Dashboard: React.FC = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="pt-16 pb-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        {getGreeting()}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
        Welcome to your study dashboard
      </p>
      
      {/* Clock and Motivational Quote Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Clock />
        
        {/* Motivational Quote beside the Clock */}
        <div className="flex justify-center items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <MotivationalQuote />
        </div>
      </div>

      {/* Calendar Section (Larger Calendar) */}
      <div className="mb-6">
        <Calendar />
      </div>
      
      {/* Upcoming Tasks Section */}
      <div>
        <UpcomingTasks />
      </div>
    </div>
  );
};

export default Dashboard;
