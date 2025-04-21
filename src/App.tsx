import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Tasks from './pages/Tasks';
import Timer from './pages/Timer';
import Timetable from './pages/Timetable';
import VirtualStudy from './pages/VirtualStudy';
import Login from './pages/Login';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Footer from './components/layout/Footer';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when window resizes to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen transition-colors duration-200 dark:bg-gray-900 bg-gray-50">
          <Navbar toggleMobileMenu={toggleMobileMenu} />
          <div className="flex flex-1">
            <Sidebar isOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
            <main className="flex-1 p-4 lg:ml-64 transition-all duration-300 ease-in-out">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/timer" element={<Timer />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/virtual-study" element={<VirtualStudy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;