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
  { 
    id: '1', 
    name: 'Mom',
    phone: '555-123-4567',
    relation: 'Family - Emergency Contact'
  },
  { 
    id: '2',
    name: 'Sarah (Therapist)',
    phone: '555-987-6543',
    relation: 'Healthcare Provider'
  },
  {
    id: '3',
    name: 'Crisis Helpline',
    phone: '1-800-273-8255',
    relation: 'Emergency Services'
  }
];

// Enhanced AI responses with more variety and emotional support
const aiResponses = [
  {
    type: 'empathy',
    responses: [
      "I hear how difficult this is. You're not alone, and we'll get through this together.",
      "I can sense you're going through a lot right now. It's okay to feel this way.",
      "You're so strong for reaching out. I'm here to support you however you need.",
      "Take all the time you need. There's no rush, and you're safe here.",
    ]
  },
  {
    type: 'grounding',
    responses: [
      "Let's try something gentle: Can you name 3 things you can see right now?",
      "Take a slow breath with me. Feel your feet on the ground. You're anchored and safe.",
      "Focus on something you can touch - maybe something soft or smooth nearby.",
      "If you'd like, we can do a quick breathing exercise together.",
    ]
  },
  {
    type: 'encouragement',
    responses: [
      "You're doing the right thing by seeking support. That takes real courage.",
      "Each small step matters. You're handling this with such strength.",
      "Remember: this moment will pass. You've gotten through difficult times before.",
      "I believe in you. Let's take this one tiny step at a time.",
    ]
  },
  {
    type: 'practical',
    responses: [
      "Would you like to try a calming technique, or would you prefer to just talk?",
      "Is there someone in your support network you'd like to reach out to?",
      "What would help you feel a bit safer right now?",
      "We can explore some gentle coping strategies whenever you're ready.",
    ]
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDisguised, setIsDisguised] = useState(true);
  const [inEmergency, setInEmergency] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi, I'm here to listen and support you. How are you feeling right now?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [lastResponseTypes, setLastResponseTypes] = useState<string[]>([]);

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

  const getRandomResponse = () => {
    // Avoid repeating the last few response types
    const availableTypes = aiResponses.filter(
      (response) => !lastResponseTypes.includes(response.type)
    );
    
    const responseGroup = availableTypes.length > 0
      ? availableTypes[Math.floor(Math.random() * availableTypes.length)]
      : aiResponses[Math.floor(Math.random() * aiResponses.length)];
    
    // Update last response types (keep last 2)
    setLastResponseTypes(prev => {
      const updated = [responseGroup.type, ...prev];
      return updated.slice(0, 2);
    });
    
    const responses = responseGroup.responses;
    return responses[Math.floor(Math.random() * responses.length)];
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
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(),
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