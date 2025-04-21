import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" }
];

const MotivationalQuote: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }, 30000); // Change quote every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <div className="flex items-start space-x-4">
        <Quote className="h-8 w-8 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
        <div>
          <p className="text-lg text-gray-800 dark:text-white font-medium mb-2">
            {currentQuote.text}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            — {currentQuote.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuote;