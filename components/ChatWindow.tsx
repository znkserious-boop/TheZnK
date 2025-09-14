
import React, { useState, useEffect, useRef } from 'react';
import { MockUser } from '../types';
import { useAppContext } from '../hooks/useAppContext';
import { TEXTS } from '../constants';

interface ChatWindowProps {
  user: MockUser;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ user, onClose }) => {
  const { language } = useAppContext();
  const texts = TEXTS[language];
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    // Initial message from the other user
    setMessages([
      { id: 1, text: `Hey! I see we both like ${user.interests[0]}.`, sender: 'them' }
    ]);
  }, [user.interests]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessages: Message[] = [
        ...messages,
        { id: Date.now(), text: inputValue, sender: 'me' },
      ];
      setMessages(newMessages);
      setInputValue('');
      
      // Simulate a reply
      setTimeout(() => {
        setMessages(prev => [...prev, {id: Date.now()+1, text: "That's cool! What's up?", sender: 'them'}]);
      }, 1500);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        handleSend();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-warm-gray-800 rounded-2xl shadow-2xl w-full max-w-lg h-[90vh] max-h-[700px] flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-warm-gray-200 dark:border-warm-gray-700">
          <div className="flex items-center">
            <img src={user.photoUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <span className="ml-3 font-bold text-warm-gray-800 dark:text-warm-gray-100">{user.name}</span>
          </div>
          <button onClick={onClose} className="text-warm-gray-500 hover:text-warm-gray-800 dark:hover:text-warm-gray-200 text-2xl">&times;</button>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl ${
                msg.sender === 'me'
                  ? 'bg-pastel-blue-DEFAULT text-white rounded-br-lg'
                  : 'bg-warm-gray-200 dark:bg-warm-gray-700 text-warm-gray-800 dark:text-warm-gray-100 rounded-bl-lg'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>
        
        <footer className="p-4 border-t border-warm-gray-200 dark:border-warm-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={texts.typeMessage}
              className="flex-1 px-4 py-2 bg-warm-gray-100 dark:bg-warm-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-pastel-blue-DEFAULT text-warm-gray-800 dark:text-warm-gray-100"
            />
            <button
              onClick={handleSend}
              className="bg-pastel-blue-DEFAULT text-white rounded-full p-3 hover:bg-pastel-blue-dark transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
