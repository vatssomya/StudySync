import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, FileText, CheckSquare, Timer, Calendar, Video, Info, Shield } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  closeMobileMenu: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeMobileMenu }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/notes', name: 'Notes', icon: <FileText size={18} /> },
    { path: '/tasks', name: 'Tasks', icon: <CheckSquare size={18} /> },
    { path: '/timer', name: 'Pomodoro Timer', icon: <Timer size={18} /> },
    { path: '/timetable', name: 'Timetable', icon: <Calendar size={18} /> },
    { path: '/virtual-study', name: 'Virtual Study Room', icon: <Video size={18} /> },
    { path: '/about', name: 'About', icon: <Info size={18} /> },
    { path: '/privacy', name: 'Privacy Policy', icon: <Shield size={18} /> },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto`}
      >
        <div className="flex lg:hidden justify-end p-4">
          <button 
            onClick={closeMobileMenu}
            className="text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-200"
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <span className={isActive(item.path) ? 'text-indigo-600 dark:text-indigo-400' : ''}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;