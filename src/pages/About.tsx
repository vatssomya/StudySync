import React from 'react';
import { Github, Mail } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    { name: 'Somya Vats', role: 'Project Lead' },
    { name: 'Tanisha', role: 'UI/UX Designer' },
    { name: 'Hardik Bhardwaj', role: 'Frontend Developer' },
    { name: 'Aditya Amit Umre', role: 'Backend Developer' },
  ];
  
  return (
    <div className="pt-16 pb-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">About StudySync</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            StudySync aims to provide students with a comprehensive, all-in-one study management tool that helps
            organize study schedules, track tasks, and facilitate effective learning strategies without the complexity
            of multi-user systems.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            This project was developed as part of a Software Engineering course project, focusing on
            creating a simple but effective solution for student productivity and time management.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">Features</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 mr-2">1</span>
              <span>Personalized study dashboard with calendar and clock</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 mr-2">2</span>
              <span>Task management system for tracking assignments and deadlines</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 mr-2">3</span>
              <span>Notes creation and organization</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 mr-2">4</span>
              <span>Pomodoro timer for focused study sessions</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 mr-2">5</span>
              <span>Weekly timetable for organizing study schedules</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg text-center">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{member.name.charAt(0)}</span>
              </div>
              <h3 className="font-medium text-gray-800 dark:text-white">{member.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Project Information</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This is a Data Science student project created during Batch 1 & 2 of the Software Engineering course.
          StudySync demonstrates our project development skills and software design principles.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-600 dark:text-gray-300">
              Have questions or feedback? Reach out to us:
            </p>
            <a 
              href="mailto:Somya.119012@stu.upes.ac.in"
              className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mt-1"
            >
              <Mail size={16} className="mr-1" />
              contact@studysync-demo.com
            </a>
          </div>
          
          <a 
            href="https://github.com/vatssomya/StudySync"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Github size={18} className="mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;