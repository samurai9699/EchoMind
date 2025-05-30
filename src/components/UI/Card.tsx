import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick,
  animate = false,
  delay = 0
}) => {
  const { settings } = useAppContext();
  
  const baseClasses = `
    transition-all duration-300
    ${settings.darkMode 
      ? 'bg-dark-card border border-dark-border'
      : 'bg-white border border-neutral-lighter'
    }
    rounded-lg shadow-md overflow-hidden
  `;
  
  const clickableClasses = onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : '';
  
  const cardClasses = `${baseClasses} ${clickableClasses} ${className}`;
  
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={cardClasses}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;