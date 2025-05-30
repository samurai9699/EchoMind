import React, { createContext, useContext, useState, useEffect } from 'react';
import { Contact, ChatMessage, AppSettings } from '../types';

interface AppContextType {
  isDisguised: boolean;
  toggleDisguise: () => void;
  inEmergency: boolean;
  triggerEmergency: () => void;
  resolveEmergency: () => void;
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
  removeContact: (id: string) => void;
  chatMessages: ChatMessage[];
  sendMessage: (text: string) => void;
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

const defaultSettings: AppSettings = {
  disguiseMode: 'calculator',
  triggerPattern: 'triple-tap',
  triggerCode: '911',
  soundEnabled: false,
  darkMode: false,
  autoLock: true,
  autoLockTime: 60,
};

const defaultContacts: Contact[] = [
  { id: '1', name: 'Emergency Contact', phone: '555-123-4567', relation: 'Family' },
  { id: '2', name: 'Trusted Friend', phone: '555-987-6543', relation: 'Friend' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDisguised, setIsDisguised] = useState(true);
  const [inEmergency, setInEmergency] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hello, I'm here to help. How are you feeling right now?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // AI responses for the simulated chat
  const aiResponses = [
    "I understand this is difficult. You're not alone, and we'll get through this together.",
    "Take a deep breath. Focus on something you can see, touch, and hear right now.",
    "You're doing great by reaching out. What would help you feel safer right now?",
    "Remember that this moment will pass. What's one small thing you can do for yourself?",
    "I'm here with you. Would it help to try a quick breathing exercise together?",
    "You've shown strength by speaking up. What kind of support do you need most now?",
  ];

  const toggleDisguise = () => {
    setIsDisguised((prev) => !prev);
  };

  const triggerEmergency = () => {
    setInEmergency(true);
    setIsDisguised(false);
  };

  const resolveEmergency = () => {
    setInEmergency(false);
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = {
      ...contact,
      id: Date.now().toString(),
    };
    setContacts((prev) => [...prev, newContact]);
  };

  const removeContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const sendMessage = (text: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setChatMessages((prev) => [...prev, userMessage]);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setChatMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const value = {
    isDisguised,
    toggleDisguise,
    inEmergency,
    triggerEmergency,
    resolveEmergency,
    contacts,
    addContact,
    removeContact,
    chatMessages,
    sendMessage,
    settings,
    updateSettings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};