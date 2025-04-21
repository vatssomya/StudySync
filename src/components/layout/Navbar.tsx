import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, BookOpen } from 'lucide-react';

interface NavbarProps {
  toggleMobileMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMobileMenu }) => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 fixed w-full z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side: Logo and menu */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={toggleMobileMenu} 
            className="lg:hidden text-gray-700 focus:outline-none"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">StudySync</span>
          </Link>
        </div>

        {/* Right side: Login Button */}
        <div className="flex items-center">
          <button 
            onClick={() => alert('Login feature coming soon!')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
