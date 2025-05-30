export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface EmergencyAlert {
  message: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  timestamp: Date;
  contacts: Contact[];
}

export interface AppSettings {
  disguiseMode: 'calculator' | 'notes';
  triggerPattern: 'triple-tap' | 'code' | 'gesture';
  triggerCode?: string;
  soundEnabled: boolean;
  darkMode: boolean;
  autoLock: boolean;
  autoLockTime: number; // in seconds
}