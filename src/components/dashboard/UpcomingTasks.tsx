import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const UpcomingTasks: React.FC = () => {
  // Sample tasks data - in a real app, this would come from state or context
  const tasks: Task[] = [
    { id: '1', title: 'Complete Math Assignment', dueDate: '2025-04-25T18:00:00', completed: false, priority: 'high' },
    { id: '2', title: 'Review Physics Notes', dueDate: '2025-04-28T15:30:00', completed: false, priority: 'medium' },
  ];

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
           ' at ' + 
           date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'low':
        return 'text-green-600 dark:text-green-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Upcoming Tasks</h2>
      {tasks.length > 0 ? (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-start p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle size={20} className={`${task.completed ? 'text-green-500' : 'text-gray-400'}`} />
              </div>
              <div className="ml-3 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="font-medium text-gray-800 dark:text-white">{task.title}</span>
                  <span className={`text-xs ${getPriorityColor(task.priority)} capitalize`}>
                    {task.priority} priority
                  </span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <Clock size={14} className="mr-1" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No upcoming tasks</p>
      )}
      <div className="mt-4 text-center">
        <Link to="/tasks" className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
          View all tasks
        </Link>
      </div>
    </div>
  );
};

import { Link } from 'react-router-dom';

export default UpcomingTasks;