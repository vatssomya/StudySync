import React from 'react';
import { Shield, Clock, Database, Info } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-16 pb-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Privacy Policy</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
        <div className="flex items-center mb-4">
          <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Data Protection</h2>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          StudySync is a frontend-only educational prototype. We prioritize your privacy and data security in the following ways:
        </p>
        
        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-2 flex-shrink-0">✓</span>
            <span>
              <strong>Local Storage Only:</strong> All your data (notes, tasks, timetable) is stored exclusively in your browser's local storage. 
              We don't store any of your information on external servers.
            </span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-2 flex-shrink-0">✓</span>
            <span>
              <strong>No Data Collection:</strong> We don't collect, track, or analyze your personal information or study habits.
            </span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-2 flex-shrink-0">✓</span>
            <span>
              <strong>No Third-Party Sharing:</strong> Since we don't collect data, we don't share anything with third parties.
            </span>
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 mr-2 flex-shrink-0">✓</span>
            <span>
              <strong>No Cookies:</strong> This application doesn't use cookies to track user behavior.
            </span>
          </li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <div className="flex items-center mb-4">
            <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Local Data Storage</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Your study data is stored only in your browser's local storage. This means your information stays on your device
            and is not transmitted to any servers. However, clearing your browser cache or using different browsers will
            result in separate sets of data.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <div className="flex items-center mb-4">
            <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Data Retention</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Since all data is stored locally on your device, it will remain there until you choose to clear your browser
            data or uninstall the application. You have complete control over the lifespan of your data.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <div className="flex items-center mb-4">
            <Info className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Future Updates</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            If this application ever evolves beyond the current prototype to include additional services, we will update this 
            privacy policy accordingly and notify users of any changes in data handling practices before implementation.
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Educational Purpose Statement</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This application was created as an educational project for a Software Engineering course.
          It is intended to demonstrate our development skills and is not a commercial product yet.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          For questions or concerns about this privacy policy, please contact the project team via 
          the GitHub repository linked in the About page.
        </p>
        
        <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
          <p className="text-sm text-indigo-700 dark:text-indigo-300 text-center">
            Last updated: May 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;