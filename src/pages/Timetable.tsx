import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  location: string;
  color: string;
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 7 AM to 9 PM

const colors = [
  { name: 'Blue', value: 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200' },
  { name: 'Green', value: 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200' },
  { name: 'Purple', value: 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-200' },
  { name: 'Yellow', value: 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200' },
  { name: 'Red', value: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200' },
  { name: 'Teal', value: 'bg-teal-100 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-200' },
  { name: 'Orange', value: 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700 text-orange-800 dark:text-orange-200' },
  { name: 'Pink', value: 'bg-pink-100 dark:bg-pink-900/30 border-pink-300 dark:border-pink-700 text-pink-800 dark:text-pink-200' },
];

const Timetable: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(() => {
    const savedTimeSlots = localStorage.getItem('studysync-timetable');
    return savedTimeSlots ? JSON.parse(savedTimeSlots) : [];
  });
  
  const [showForm, setShowForm] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [formData, setFormData] = useState<Omit<TimeSlot, 'id'>>({
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    subject: '',
    location: '',
    color: colors[0].value,
  });
  
  // Save time slots to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studysync-timetable', JSON.stringify(timeSlots));
  }, [timeSlots]);
  
  const addTimeSlot = () => {
    if (!formData.subject.trim()) return;
    
    if (editingSlot) {
      // Update existing slot
      setTimeSlots(
        timeSlots.map(slot => 
          slot.id === editingSlot.id 
            ? { ...formData, id: editingSlot.id } 
            : slot
        )
      );
      setEditingSlot(null);
    } else {
      // Add new slot
      const newSlot: TimeSlot = {
        ...formData,
        id: Date.now().toString(),
      };
      setTimeSlots([...timeSlots, newSlot]);
    }
    
    setFormData({
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      subject: '',
      location: '',
      color: colors[0].value,
    });
    setShowForm(false);
  };
  
  const deleteTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };
  
  const editTimeSlot = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setFormData({
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      subject: slot.subject,
      location: slot.location,
      color: slot.color,
    });
    setShowForm(true);
  };
  
  const cancelForm = () => {
    setShowForm(false);
    setEditingSlot(null);
    setFormData({
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      subject: '',
      location: '',
      color: colors[0].value,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const getTimePosition = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours + minutes / 60 - 7; // Adjust for starting at 7 AM
  };
  
  const getDayIndex = (day: string): number => {
    return days.indexOf(day);
  };
  
  return (
    <div className="pt-16 pb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Timetable</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
        >
          <Plus size={16} />
          <span>{showForm ? 'Cancel' : 'Add Class'}</span>
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 transition-colors duration-200">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {editingSlot ? 'Edit Class' : 'Add New Class'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g., Mathematics"
                required
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location (optional)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g., Room 101"
              />
            </div>
            
            <div>
              <label htmlFor="day" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Day
              </label>
              <select
                id="day"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Color
              </label>
              <select
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                {colors.map(color => (
                  <option key={color.name} value={color.value}>{color.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={cancelForm}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={addTimeSlot}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
            >
              {editingSlot ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      )}
      
      {/* Weekly timetable */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto transition-colors duration-200">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-b border-gray-200 dark:border-gray-700">
            <div className="p-3 text-center font-medium text-gray-500 dark:text-gray-400">
              Time
            </div>
            {days.map(day => (
              <div key={day} className="p-3 text-center font-medium text-gray-800 dark:text-white">
                {day}
              </div>
            ))}
          </div>
          
          <div className="relative">
            {/* Time indicators */}
            {hours.map(hour => (
              <div key={hour} className="absolute w-full border-t border-gray-200 dark:border-gray-700" style={{ top: `${(hour - 7) * 60}px` }}>
                <div className="relative -top-3 left-0 w-[12.5%] text-center text-xs text-gray-500 dark:text-gray-400">
                  {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                </div>
              </div>
            ))}
            
            {/* Background grid */}
            <div className="grid grid-cols-8 h-[720px]"> {/* 12 hours * 60px */}
              <div className="border-r border-gray-200 dark:border-gray-700"></div>
              {days.map(day => (
                <div key={day} className="border-r border-gray-200 dark:border-gray-700"></div>
              ))}
            </div>
            
            {/* Class slots */}
            {timeSlots.map(slot => {
              const startPos = getTimePosition(slot.startTime) * 60; // 60px per hour
              const endPos = getTimePosition(slot.endTime) * 60;
              const height = endPos - startPos;
              const dayIndex = getDayIndex(slot.day) + 1; // +1 because of the time column
              
              return (
                <div
                  key={slot.id}
                  className={`absolute rounded-lg border p-2 ${slot.color}`}
                  style={{
                    top: `${startPos}px`,
                    height: `${height}px`,
                    left: `${(dayIndex / 8) * 100}%`,
                    width: `${(1 / 8) * 100}%`,
                  }}
                >
                  <div className="flex justify-between items-start h-full">
                    <div className="overflow-hidden">
                      <h3 className="font-medium text-sm truncate">{slot.subject}</h3>
                      {slot.location && (
                        <p className="text-xs truncate">{slot.location}</p>
                      )}
                      <p className="text-xs">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => editTimeSlot(slot)}
                        className="p-1 rounded hover:bg-white/50 dark:hover:bg-black/10"
                        title="Edit"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => deleteTimeSlot(slot.id)}
                        className="p-1 rounded hover:bg-white/50 dark:hover:bg-black/10"
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {timeSlots.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No classes added yet. Click the "Add Class" button to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Timetable;