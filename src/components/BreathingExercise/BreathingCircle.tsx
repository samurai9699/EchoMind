import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

interface BreathingCircleProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number; // in minutes
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({
  isActive,
  onComplete,
  duration = 2,
}) => {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'rest'>('rest');
  const [count, setCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60); // in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const { settings } = useAppContext();
  
  // 4-7-8 breathing technique
  const breatheInTime = 4;
  const holdTime = 7;
  const breatheOutTime = 8;
  const restTime = 2;
  
  // Total cycles based on duration
  const totalCycles = Math.floor((duration * 60) / (breatheInTime + holdTime + breatheOutTime + restTime));
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let phaseTimer: NodeJS.Timeout;
    
    if (isActive && !isCompleted) {
      // Start breathing cycle
      setPhase('in');
      
      // Play sound if enabled
      if (settings.soundEnabled) {
        const audio = new Audio('/sounds/soft-bell.mp3'); // To be added later
        audio.volume = 0.3;
        audio.play().catch(() => {}); // Ignore autoplay restrictions
      }
      
      // Phase timer
      phaseTimer = setInterval(() => {
        setPhase(currentPhase => {
          switch (currentPhase) {
            case 'in':
              return 'hold';
            case 'hold':
              return 'out';
            case 'out':
              return 'rest';
            case 'rest':
              setCount(c => {
                const newCount = c + 1;
                if (newCount >= totalCycles) {
                  setIsCompleted(true);
                  if (onComplete) onComplete();
                }
                return newCount;
              });
              return 'in';
            default:
              return 'in';
          }
        });
      }, getPhaseTime());
      
      // Countdown timer
      interval = setInterval(() => {
        setTimeRemaining(time => {
          const newTime = time - 1;
          if (newTime <= 0) {
            setIsCompleted(true);
            if (onComplete) onComplete();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
      clearInterval(phaseTimer);
    };
  }, [isActive, isCompleted, onComplete, totalCycles, settings.soundEnabled]);
  
  // Reset state when exercise is restarted
  useEffect(() => {
    if (!isActive) {
      setPhase('rest');
      setCount(0);
      setTimeRemaining(duration * 60);
      setIsCompleted(false);
    }
  }, [isActive, duration]);
  
  function getPhaseTime() {
    switch (phase) {
      case 'in': return breatheInTime * 1000;
      case 'hold': return holdTime * 1000;
      case 'out': return breatheOutTime * 1000;
      case 'rest': return restTime * 1000;
      default: return 1000;
    }
  }
  
  function getInstruction() {
    switch (phase) {
      case 'in': return 'Breathe in slowly...';
      case 'hold': return 'Hold gently...';
      case 'out': return 'Release softly...';
      case 'rest': return 'Rest...';
      default: return '';
    }
  }
  
  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  const circleVariants = {
    in: {
      scale: [1, 1.5],
      opacity: [0.7, 1],
      transition: { 
        duration: breatheInTime,
        ease: 'easeInOut',
      }
    },
    hold: {
      scale: 1.5,
      opacity: 1,
      transition: { 
        duration: holdTime,
        ease: 'linear'
      }
    },
    out: {
      scale: [1.5, 1],
      opacity: [1, 0.7],
      transition: { 
        duration: breatheOutTime,
        ease: 'easeInOut'
      }
    },
    rest: {
      scale: 1,
      opacity: 0.7,
      transition: { 
        duration: restTime,
        ease: 'linear'
      }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center transition-colors duration-300 ${
      settings.darkMode ? 'text-dark-text' : 'text-neutral-darkest'
    }`}>
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          variants={circleVariants}
          animate={isActive ? phase : 'rest'}
          className={`w-48 h-48 rounded-full ${
            settings.darkMode ? 'bg-primary-dark opacity-30' : 'bg-primary-light opacity-70'
          }`}
        />
        <motion.div
          variants={circleVariants}
          animate={isActive ? phase : 'rest'}
          className={`absolute w-36 h-36 rounded-full ${
            settings.darkMode ? 'bg-primary opacity-40' : 'bg-primary opacity-80'
          }`}
        />
        <motion.div
          variants={circleVariants}
          animate={isActive ? phase : 'rest'}
          className={`absolute w-24 h-24 rounded-full ${
            settings.darkMode ? 'bg-primary-light opacity-50' : 'bg-primary-dark opacity-90'
          }`}
        />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h3 className={`text-2xl font-medium mb-2 ${
            settings.darkMode ? 'text-primary-light' : 'text-primary-dark'
          }`}>
            {isActive ? getInstruction() : 'Ready to begin'}
          </h3>
          {isActive && (
            <div className={`text-sm ${
              settings.darkMode ? 'text-neutral-lighter' : 'text-neutral-dark'
            }`}>
              <p>Cycle {count + 1} of {totalCycles}</p>
              <p>Time remaining: {formatTime(timeRemaining)}</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BreathingCircle;