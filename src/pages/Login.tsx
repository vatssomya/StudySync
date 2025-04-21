import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show alert for coming soon feature
    alert('Login feature coming soon!');
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="pt-16 pb-4 flex justify-center">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Login to StudySync</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Access your study materials and schedules</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-500 dark:text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-500 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account? <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Sign up</a>
          </p>
        </div>
        
        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
            This is a demo app. The login functionality will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;