import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle, Circle, Trash2, ChevronDown, ChevronUp, Calendar } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('studysync-tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    completed: false,
    dueDate: '',
    priority: 'medium',
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt'>('dueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studysync-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      completed: false,
      dueDate: '',
      priority: 'medium',
    });
    setShowForm(false);
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const handleSort = (sortType: 'dueDate' | 'priority' | 'createdAt') => {
    if (sortBy === sortType) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortType);
      setSortDirection('asc');
    }
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      if (!a.dueDate) return sortDirection === 'asc' ? 1 : -1;
      if (!b.dueDate) return sortDirection === 'asc' ? -1 : 1;
      return sortDirection === 'asc' 
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }
    
    if (sortBy === 'priority') {
      const priorityValue = { high: 3, medium: 2, low: 1 };
      return sortDirection === 'asc'
        ? priorityValue[a.priority] - priorityValue[b.priority]
        : priorityValue[b.priority] - priorityValue[a.priority];
    }
    
    // Sort by creation date
    return sortDirection === 'asc'
      ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'text-red-600 dark:text-red-400 border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'text-yellow-600 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'text-green-600 dark:text-green-400 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800';
    }
  };
  
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="pt-16 pb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tasks</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
        >
          <Plus size={16} />
          <span>{showForm ? 'Cancel' : 'Add Task'}</span>
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add New Task</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                placeholder="Task title"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description (optional)
              </label>
              <textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                placeholder="Task description"
                rows={3}
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date (optional)
                </label>
                <input
                  type="datetime-local"
                  id="dueDate"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={addTask}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'all'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'active'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'completed'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Completed
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => handleSort('dueDate')}
              className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm ${
                sortBy === 'dueDate'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Calendar size={14} />
              <span>Due Date</span>
              {sortBy === 'dueDate' && (
                sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
              )}
            </button>
            <button
              onClick={() => handleSort('priority')}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === 'priority'
                  ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Priority
              {sortBy === 'priority' && (
                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1" /> : <ChevronDown size={14} className="inline ml-1" />
              )}
            </button>
          </div>
        </div>
        
        {sortedTasks.length > 0 ? (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedTasks.map(task => (
              <li key={task.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                <div className="flex items-start">
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="flex-shrink-0 mt-1"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  <div className="ml-3 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h3 className={`font-medium ${
                          task.completed 
                            ? 'text-gray-500 dark:text-gray-400 line-through' 
                            : 'text-gray-800 dark:text-white'
                        }`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {task.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                          aria-label="Delete task"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {task.dueDate && (
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        <span>Due: {formatDate(task.dueDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            {filter === 'all' ? 'No tasks yet. Add a task to get started!' : `No ${filter} tasks found.`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;