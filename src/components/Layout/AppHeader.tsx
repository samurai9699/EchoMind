import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  showClose?: boolean;
  showLock?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  title, 
  showBack = true, 
  showClose = false,
  showLock = true
}) => {
  const navigate = useNavigate();
  const { toggleDisguise } = useAppContext();

  const handleBack = () => {
    navigate(-1);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center space-x-2">
        {showBack && (
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-neutral-lighter transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-primary-dark" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-primary-dark">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        {showLock && (
          <button 
            onClick={toggleDisguise}
            className="p-2 rounded-full hover:bg-neutral-lighter transition-colors"
            aria-label="Lock app"
          >
            <Shield size={20} className="text-accent-dark" />
          </button>
        )}
        
        {showClose && (
          <button 
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-neutral-lighter transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-neutral-darker" />
          </button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;