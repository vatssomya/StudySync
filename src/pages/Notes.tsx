import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Save, Plus, X } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('studysync-notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  
  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studysync-notes', JSON.stringify(notes));
  }, [notes]);
  
  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setEditMode(true);
    setEditTitle(newNote.title);
    setEditContent(newNote.content);
  };
  
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    
    if (activeNote && activeNote.id === id) {
      setActiveNote(updatedNotes.length > 0 ? updatedNotes[0] : null);
      setEditMode(false);
    }
  };
  
  const startEditingNote = () => {
    if (activeNote) {
      setEditMode(true);
      setEditTitle(activeNote.title);
      setEditContent(activeNote.content);
    }
  };
  
  const saveNote = () => {
    if (activeNote) {
      const updatedNotes = notes.map(note => 
        note.id === activeNote.id 
          ? { 
              ...note, 
              title: editTitle, 
              content: editContent,
              updatedAt: new Date().toISOString(),
            } 
          : note
      );
      
      setNotes(updatedNotes);
      setActiveNote({
        ...activeNote,
        title: editTitle,
        content: editContent,
        updatedAt: new Date().toISOString(),
      });
      setEditMode(false);
    }
  };
  
  const cancelEdit = () => {
    setEditMode(false);
  };
  
  const selectNote = (note: Note) => {
    setActiveNote(note);
    setEditMode(false);
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }) + ' at ' + date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className="pt-16 pb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Notes</h1>
        <button
          onClick={createNewNote}
          className="flex items-center space-x-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
        >
          <Plus size={16} />
          <span>New Note</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes list */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Your Notes</h2>
          </div>
          
          <div className="overflow-y-auto max-h-[500px]">
            {notes.length > 0 ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {notes.map(note => (
                  <li key={note.id}>
                    <button
                      onClick={() => selectNote(note)}
                      className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                        activeNote?.id === note.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                      }`}
                    >
                      <h3 className="font-medium text-gray-800 dark:text-white truncate">{note.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{note.content}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Updated: {formatDate(note.updatedAt)}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notes yet. Create one to get started!
              </div>
            )}
          </div>
        </div>
        
        {/* Note editor or viewer */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200">
          {activeNote ? (
            <>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                {editMode ? (
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Note title"
                  />
                ) : (
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{activeNote.title}</h2>
                )}
                
                <div className="flex space-x-2">
                  {editMode ? (
                    <>
                      <button
                        onClick={saveNote}
                        className="p-1 text-green-600 dark:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Save"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Cancel"
                      >
                        <X size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={startEditingNote}
                        className="p-1 text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Edit"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => deleteNote(activeNote.id)}
                        className="p-1 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                {editMode ? (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full h-[400px] p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Write your note here..."
                  ></textarea>
                ) : (
                  <div className="prose dark:prose-invert max-w-none">
                    {activeNote.content ? (
                      <div className="whitespace-pre-wrap">{activeNote.content}</div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        No content. Click the edit button to add content.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Select a note or create a new one to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;