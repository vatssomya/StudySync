import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';

const Timer: React.FC = () => {
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreaks: false,
    autoStartPomodoros: false,
  });
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  
  const timerRef = useRef<number | null>(null);
  
  // Set the timer when mode changes
  useEffect(() => {
    switch (mode) {
      case 'pomodoro':
        setTimeLeft(settings.pomodoro * 60);
        break;
      case 'shortBreak':
        setTimeLeft(settings.shortBreak * 60);
        break;
      case 'longBreak':
        setTimeLeft(settings.longBreak * 60);
        break;
    }
    
    // Reset the running state
    setIsRunning(false);
    
    // Clear any existing interval
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [mode, settings]);
  
  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            // Timer complete
            clearInterval(timerRef.current!);
            timerRef.current = null;
            
            // Play notification sound if available
            const audio = new Audio('/notification.mp3');
            audio.play().catch(() => {
              // Fallback if audio fails (e.g., file not found)
              console.log('Timer completed!');
            });
            
            // Handle timer completion
            if (mode === 'pomodoro') {
              const newPomodorosCompleted = pomodorosCompleted + 1;
              setPomodorosCompleted(newPomodorosCompleted);
              
              // After 4 pomodoros, take a long break
              if (newPomodorosCompleted % 4 === 0) {
                setMode('longBreak');
                if (settings.autoStartBreaks) {
                  setIsRunning(true);
                }
              } else {
                setMode('shortBreak');
                if (settings.autoStartBreaks) {
                  setIsRunning(true);
                }
              }
            } else {
              // Break is over, start a new pomodoro
              setMode('pomodoro');
              if (settings.autoStartPomodoros) {
                setIsRunning(true);
              }
            }
            
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, mode, pomodorosCompleted, settings]);
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    switch (mode) {
      case 'pomodoro':
        setTimeLeft(settings.pomodoro * 60);
        break;
      case 'shortBreak':
        setTimeLeft(settings.shortBreak * 60);
        break;
      case 'longBreak':
        setTimeLeft(settings.longBreak * 60);
        break;
    }
  };
  
  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  
  const handleSettingChange = (setting: string, value: number | boolean) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getProgressPercent = (): number => {
    let totalSeconds;
    switch (mode) {
      case 'pomodoro':
        totalSeconds = settings.pomodoro * 60;
        break;
      case 'shortBreak':
        totalSeconds = settings.shortBreak * 60;
        break;
      case 'longBreak':
        totalSeconds = settings.longBreak * 60;
        break;
    }
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };
  
  return (
    <div className="pt-16 pb-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Pomodoro Timer</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden max-w-md mx-auto transition-colors duration-200">
        <div className="p-1 flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setMode('pomodoro')}
            className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
              mode === 'pomodoro'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => setMode('shortBreak')}
            className={`flex-1 py-2 text-center transition-colors ${
              mode === 'shortBreak'
                ? 'bg-green-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Short Break
          </button>
          <button
            onClick={() => setMode('longBreak')}
            className={`flex-1 py-2 text-center rounded-t-lg transition-colors ${
              mode === 'longBreak'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Long Break
          </button>
        </div>
        
        <div className="p-8 flex flex-col items-center">
          <div className="relative w-48 h-48 mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="5"
                className="dark:stroke-gray-600"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={mode === 'pomodoro' ? '#4f46e5' : (mode === 'shortBreak' ? '#16a34a' : '#2563eb')}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="282.7"
                strokeDashoffset={282.7 - (282.7 * getProgressPercent()) / 100}
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-linear"
              />
              <text
                x="50"
                y="50"
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-2xl font-bold fill-gray-800 dark:fill-white"
              >
                {formatTime(timeLeft)}
              </text>
            </svg>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={toggleTimer}
              className={`p-3 rounded-full ${
                isRunning
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                  : 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
              }`}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <RotateCcw size={24} />
            </button>
            <button
              onClick={toggleSettings}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            >
              <Settings size={24} />
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Pomodoros completed today: <span className="font-bold">{pomodorosCompleted}</span>
            </p>
          </div>
        </div>
      </div>
      
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full m-4 transition-colors duration-200">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Timer Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Pomodoro Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={settings.pomodoro}
                  onChange={(e) => handleSettingChange('pomodoro', parseInt(e.target.value) || 25)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Short Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.shortBreak}
                  onChange={(e) => handleSettingChange('shortBreak', parseInt(e.target.value) || 5)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Long Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={settings.longBreak}
                  onChange={(e) => handleSettingChange('longBreak', parseInt(e.target.value) || 15)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoStartBreaks"
                  checked={settings.autoStartBreaks}
                  onChange={(e) => handleSettingChange('autoStartBreaks', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="autoStartBreaks" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Auto-start breaks
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoStartPomodoros"
                  checked={settings.autoStartPomodoros}
                  onChange={(e) => handleSettingChange('autoStartPomodoros', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="autoStartPomodoros" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Auto-start pomodoros
                </label>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={toggleSettings}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;