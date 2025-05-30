import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Wind, MessageSquare, Users, Settings } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: Home, path: '/' },
    { label: 'Breathing', icon: Wind, path: '/breathing' },
    { label: 'Chat', icon: MessageSquare, path: '/chat' },
    { label: 'Contacts', icon: Users, path: '/contacts' },
    { label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-lighter py-2 px-4 shadow-lg">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center p-2 ${
              isActive(item.path)
                ? 'text-primary-dark'
                : 'text-neutral-medium hover:text-primary'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default BottomNavigation;