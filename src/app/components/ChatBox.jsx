"use client"
import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi\n\nSure can you share me your interest so that I can check and keep some points up.",
      sender: 'user',
      time: '07:27 PM',
      date: '10 May 2025 Asia/Kolkata (GMT+05:30)'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'me',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('en-GB', { 
          day: 'numeric', 
          month: 'short', 
          year: 'numeric' 
        })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Udit Jain</h2>
            <p className="text-sm text-gray-500">Last online 5 hours ago</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div key={message.id}>
            {/* Date Divider */}
            {(index === 0 || messages[index - 1].date !== message.date) && (
              <div className="flex justify-center mb-4">
                <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {message.date}
                </span>
              </div>
            )}
            
            {/* Message Bubble */}
            <div className={`flex mb-4 ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              {message.sender === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3 flex-shrink-0">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Revanth" 
                    alt="Avatar" 
                    className="w-full h-full rounded-full"
                  />
                </div>
              )}
              
              <div className={`max-w-md ${message.sender === 'me' ? 'ml-auto' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.sender === 'me' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-900 rounded-bl-none shadow-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                </div>
                <div className="flex items-center mt-1 px-2">
                  <span className="text-xs text-gray-500">{message.time}</span>
                  {message.sender === 'me' && (
                    <svg className="w-4 h-4 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg mb-1">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message"
              className="w-full bg-transparent outline-none resize-none text-gray-900 placeholder-gray-500 text-sm"
              rows="1"
              style={{ maxHeight: '120px' }}
            />
          </div>
          
          <button 
            onClick={handleSend}
            className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors mb-1"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}