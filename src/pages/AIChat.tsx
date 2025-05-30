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
    { text: "I'm feeling anxious", icon: Heart, color: 'text-[#F5C6CB]' },
    { text: "Help me feel grounded", icon: Sparkles, color: 'text-[#E6E6FA]' },
    { text: "I need to breathe", icon: Wind, color: 'text-[#A3BFFA]', action: () => navigate('/breathing') },
    { text: "Just listen please", icon: Brain, color: 'text-[#A9DFBF]' },
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
    <div className="flex flex-col h-screen min-h-screen bg-[#FDFAF6] dark:bg-dark-bg font-rounded">
      <div className="flex-shrink-0 bg-white/80 backdrop-blur-sm dark:bg-dark-bg/80 px-4 pb-2 shadow-sm">
        <AppHeader title="Support Chat" />
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <div className="max-w-2xl mx-auto h-full flex flex-col justify-between">
          <div className="space-y-4 py-4">
            <AnimatePresence mode="popLayout">
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
                  <Card className="px-4 py-2 bg-white/80 backdrop-blur-sm dark:bg-dark-card/80">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#A3BFFA] animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-[#A3BFFA] animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 rounded-full bg-[#A3BFFA] animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </Card>
                </motion.div>
              )}
              {showQuickResponses && chatMessages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <p className="text-sm text-neutral-dark dark:text-neutral-lighter font-medium pl-2">
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
                        className="justify-start bg-white/80 backdrop-blur-sm dark:bg-dark-card/80 hover:bg-white dark:hover:bg-dark-border"
                      >
                        {response.text}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 border-t border-neutral-lighter dark:border-dark-border bg-white/80 backdrop-blur-sm dark:bg-dark-card/80">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-end gap-2 bg-white dark:bg-dark-bg rounded-xl p-2 shadow-sm">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 min-h-[44px] max-h-32 rounded-lg p-3 resize-y bg-transparent
                focus:outline-none placeholder-neutral-medium dark:placeholder-neutral-medium
                text-neutral-darkest dark:text-dark-text"
              rows={1}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="px-4 h-[44px] flex-shrink-0 bg-[#A3BFFA] hover:bg-[#8AA7F8] dark:bg-[#A3BFFA] dark:hover:bg-[#8AA7F8]"
            >
              <Send size={20} />
            </Button>
          </div>
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
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm backdrop-blur-sm ${
          isAI
            ? settings.darkMode
              ? 'bg-dark-card/80 text-dark-text'
              : 'bg-white/80 text-neutral-darkest'
            : 'bg-[#A3BFFA]/90 text-white'
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