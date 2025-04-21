import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, UserPlus, MessageSquare, X } from 'lucide-react';

const VirtualStudy: React.FC = () => {
  const [showJoinForm, setShowJoinForm] = useState(true);
  const [roomCode, setRoomCode] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const createRoom = () => {
    const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(generatedCode);
    setShowJoinForm(false);
  };
  
  const joinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    setShowJoinForm(false);
  };
  
  const toggleVideo = async () => {
    if (isVideoOn) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          if (track.kind === 'video') {
            track.stop();
          }
        });
      }
      setIsVideoOn(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsVideoOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access your camera. Please check your permissions.');
      }
    }
  };
  
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };
  
  const invitePeers = () => {
    navigator.clipboard.writeText(roomCode)
      .then(() => {
        alert(`Room code ${roomCode} copied to clipboard!`);
      })
      .catch(err => {
        console.error('Failed to copy room code:', err);
      });
  };
  
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  return (
    <div className="pt-16 pb-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Virtual Study Room</h1>
      
      {showJoinForm ? (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">How it works</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-semibold">1</span>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 dark:text-white">Create or Join a Room</h3>
                  <p className="text-gray-600 dark:text-gray-400">Start your own study room or join an existing one with a room code</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-semibold">2</span>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 dark:text-white">Set Up Your Space</h3>
                  <p className="text-gray-600 dark:text-gray-400">Configure your camera and microphone settings</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-semibold">3</span>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 dark:text-white">Start Studying</h3>
                  <p className="text-gray-600 dark:text-gray-400">Focus on your studies in a collaborative environment</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Create a Room</h3>
                <button
                  onClick={createRoom}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
                >
                  Create New Room
                </button>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Join a Room</h3>
                <form onSubmit={joinRoom}>
                  <input
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter room code"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors duration-200"
                  >
                    Join Room
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden aspect-video relative">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                ></video>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center text-gray-400">
                    <VideoOff size={48} className="mx-auto mb-2" />
                    <p>Camera is off</p>
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-full ${
                    isVideoOn
                      ? 'bg-white text-gray-900'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
                </button>
                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-full ${
                    isAudioOn
                      ? 'bg-white text-gray-900'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
                </button>
                <button
                  onClick={invitePeers}
                  className="p-3 rounded-full bg-green-600 text-white"
                >
                  <UserPlus size={24} />
                </button>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className={`p-3 rounded-full ${
                    showChat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <MessageSquare size={24} />
                </button>
              </div>
            </div>
            
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Study Room Information</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                <span className="font-medium">Room:</span> Study Session {roomCode}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Participants:</span> You (Host)
              </p>
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-md">
                <p>Group study features coming soon! You'll be able to:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Connect with multiple study partners</li>
                  <li>Share your screen or documents</li>
                  <li>Use the collaborative whiteboard</li>
                  <li>Set group pomodoro timers</li>
                </ul>
              </div>
            </div>
          </div>
          
          {showChat && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-[500px] transition-colors duration-200">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="font-semibold text-gray-800 dark:text-white">Chat</h2>
                <button 
                  onClick={() => setShowChat(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                  <p>Group chat feature coming soon!</p>
                  <p className="mt-2">Stay tuned!</p>
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex">
                  <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Type a message..."
                    disabled
                  />
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-r"
                    disabled
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VirtualStudy;