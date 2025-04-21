import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto py-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} StudySync. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              About
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              Privacy Policy
            </Link>
            <a 
              href="https://github.com/vatssomya/StudySync" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;