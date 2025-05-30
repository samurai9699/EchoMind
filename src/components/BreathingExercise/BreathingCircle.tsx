import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Total cycles based on duration
  const totalCycles = Math.floor((duration * 60) / 16); // Each cycle is 16 seconds
  
  // Breathing cycle timing in seconds
  const breatheInTime = 4;
  const holdTime = 4;
  const breatheOutTime = 6;
  const restTime = 2;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let phaseTimer: NodeJS.Timeout;
    
    if (isActive && !isCompleted) {
      // Start breathing cycle
      setPhase('in');
      
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
  }, [isActive, isCompleted, onComplete, totalCycles]);
  
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
      case 'in': return 'Breathe in...';
      case 'hold': return 'Hold...';
      case 'out': return 'Breathe out...';
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
      scale: 1.5,
      opacity: 1,
      transition: { duration: breatheInTime, ease: 'easeInOut' }
    },
    hold: {
      scale: 1.5,
      opacity: 1,
      transition: { duration: holdTime, ease: 'linear' }
    },
    out: {
      scale: 1,
      opacity: 0.7,
      transition: { duration: breatheOutTime, ease: 'easeInOut' }
    },
    rest: {
      scale: 1,
      opacity: 0.7,
      transition: { duration: restTime, ease: 'linear' }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          variants={circleVariants}
          animate={isActive ? phase : 'rest'}
          className="w-48 h-48 rounded-full bg-primary-light opacity-70"
        />
        <motion.div
          variants={circleVariants}
          animate={isActive ? phase : 'rest'}
          className="absolute w-36 h-36 rounded-full bg-primary opacity-80"
        />
        <motion.div
          variants={circleVariants}
          animate={isActive ? phase : 'rest'}
          className="absolute w-24 h-24 rounded-full bg-primary-dark opacity-90"
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
          <h3 className="text-2xl font-medium text-primary-dark mb-2">
            {isActive ? getInstruction() : 'Ready to begin'}
          </h3>
          {isActive && (
            <div className="text-sm text-neutral-dark">
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