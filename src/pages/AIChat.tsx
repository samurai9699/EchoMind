import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';
import AppHeader from '../components/Layout/AppHeader';
import BottomNavigation from '../components/Layout/BottomNavigation';
import { useAppContext } from '../context/AppContext';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const { chatMessages, sendMessage } = useAppContext();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  return (
    <PageContainer className="p-0 flex flex-col h-screen">
      <div className="px-4">
        <AppHeader title="Support Chat" />
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-2 bg-neutral-lightest">
        <div className="max-w-md mx-auto space-y-4 pb-4">
          {chatMessages.map((msg, index) => (
            <MessageBubble key={msg.id} message={msg} delay={index * 0.1} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="p-4 bg-white border-t border-neutral-lighter">
        <div className="max-w-md mx-auto flex">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 resize-none border border-neutral-lighter rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`px-4 rounded-r-lg flex items-center justify-center ${
              message.trim()
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-neutral-lighter text-neutral-medium'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      <BottomNavigation />
    </PageContainer>
  );
};

interface MessageBubbleProps {
  message: ChatMessage;
  delay: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, delay }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isAI
            ? 'bg-white text-neutral-darkest shadow-sm'
            : 'bg-primary text-white'
        }`}
      >
        <p className="text-sm md:text-base">{message.text}</p>
        <p className="text-xs mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </motion.div>
  );
};

export default AIChat;