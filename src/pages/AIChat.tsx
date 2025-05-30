import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, Brain, Sparkles, Wind } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';
import AppHeader from '../components/Layout/AppHeader';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { useAppContext } from '../context/AppContext';
import { ChatMessage } from '../types';
import { useNavigate } from 'react-router-dom';

const AIChat: React.FC = () => {
  const { chatMessages, sendMessage, settings } = useAppContext();
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showQuickResponses, setShowQuickResponses] = useState(true);
  const navigate = useNavigate();
  
  const quickResponses = [
    { text: "I'm feeling anxious", icon: Heart, color: 'text-error' },
    { text: "Help me feel grounded", icon: Sparkles, color: 'text-accent' },
    { text: "I need to breathe", icon: Wind, color: 'text-primary', action: () => navigate('/breathing') },
    { text: "Just listen please", icon: Brain, color: 'text-secondary' },
  ];

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
      setShowQuickResponses(false);
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        scrollToBottom();
      }, 2000);
    }
  };
  
  const handleQuickResponse = (text: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      sendMessage(text);
      setShowQuickResponses(false);
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        scrollToBottom();
      }, 2000);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0 bg-white dark:bg-dark-bg px-4 pb-2">
        <AppHeader title="Support Chat" />
      </div>
      <div className="flex-1 overflow-y-auto px-4 bg-neutral-lightest dark:bg-dark-bg">
        <div className="max-w-2xl mx-auto h-full flex flex-col justify-between">
          <div className="space-y-4 py-4">
            {chatMessages.map((msg, index) => (
              <MessageBubble key={msg.id} message={msg} delay={index * 0.1} />
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <Card className="px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </Card>
              </motion.div>
            )}
            {showQuickResponses && chatMessages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-2"
              >
                <p className={`text-sm mb-3 transition-colors duration-300 ${
                  settings.darkMode ? 'text-neutral-lighter' : 'text-neutral-dark'
                }`}>
                  How can I help you today?
                </p>
                {quickResponses.map((response, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      fullWidth
                      leftIcon={<response.icon size={18} className={response.color} />}
                      onClick={() => handleQuickResponse(response.text, response.action)}
                      className="justify-start"
                    >
                      {response.text}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 border-t bg-white dark:bg-dark-card dark:border-dark-border">
        <div className="max-w-2xl mx-auto flex items-end gap-2 p-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={`flex-1 min-h-[44px] max-h-32 rounded-lg p-3 resize-y transition-colors duration-300
              focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent
              ${settings.darkMode 
                ? 'bg-dark-bg border-dark-border text-dark-text placeholder-neutral-medium' 
                : 'bg-neutral-lightest border border-neutral-lighter text-neutral-darkest placeholder-neutral-medium'
              }`}
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="px-4 h-[44px] flex-shrink-0"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
      <div className="flex-shrink-0">
        <BottomNavigation />
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: ChatMessage;
  delay: number;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, delay }) => {
  const { settings } = useAppContext();
  const isAI = message.sender === 'ai';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 transition-colors duration-300 ${
          isAI
            ? settings.darkMode
              ? 'bg-dark-card text-dark-text'
              : 'bg-white text-neutral-darkest shadow-md'
            : 'bg-primary text-white shadow-md'
        }`}
      >
        <p className="text-sm md:text-base">{message.text}</p>
        <p className={`text-xs mt-1 ${
          isAI
            ? settings.darkMode
              ? 'text-neutral-medium'
              : 'text-neutral-dark'
            : 'text-white/70'
        }`}>
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