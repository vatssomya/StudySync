import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckSquare, Timer, Calendar, Video } from 'lucide-react';

const QuickAccess: React.FC = () => {
  const quickLinks = [
    { to: '/notes', name: 'Notes', icon: <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />, bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
    { to: '/tasks', name: 'Tasks', icon: <CheckSquare className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />, bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { to: '/timer', name: 'Timer', icon: <Timer className="h-8 w-8 text-red-600 dark:text-red-400 mb-2" />, bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { to: '/timetable', name: 'Timetable', icon: <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2" />, bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
    { to: '/virtual-study', name: 'Study Room', icon: <Video className="h-8 w-8 text-teal-600 dark:text-teal-400 mb-2" />, bgColor: 'bg-teal-50 dark:bg-teal-900/20' },
  ];

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Access</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${link.bgColor} hover:shadow-md transition-all duration-200 transform hover:scale-105`}
          >
            {link.icon}
            <span className="text-sm font-medium text-gray-800 dark:text-white">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;