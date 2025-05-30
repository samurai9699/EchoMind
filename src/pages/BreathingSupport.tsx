import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';
import AppHeader from '../components/Layout/AppHeader';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import BreathingCircle from '../components/BreathingExercise/BreathingCircle';
import BottomNavigation from '../components/Layout/BottomNavigation';

const BreathingSupport: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const handleStart = () => {
    setIsActive(true);
    setIsCompleted(false);
  };
  
  const handlePause = () => {
    setIsActive(false);
  };
  
  const handleReset = () => {
    setIsActive(false);
    setIsCompleted(false);
  };
  
  const handleComplete = () => {
    setIsActive(false);
    setIsCompleted(true);
  };

  return (
    <PageContainer>
      <AppHeader title="Breathing Exercise" />
      
      <div className="max-w-md mx-auto pt-2 pb-20">
        <Card className="p-5 mb-6">
          <h2 className="text-xl font-semibold text-primary-dark mb-4 text-center">
            Calming Breath
          </h2>
          
          <p className="text-neutral-darker mb-4">
            This exercise uses a 4-4-6-2 breathing pattern to help calm your nervous system:
          </p>
          
          <ul className="space-y-2 mb-4 text-sm">
            <li className="flex items-start space-x-2">
              <span className="bg-primary-light text-primary-dark w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span>Breathe in through your nose for 4 seconds</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-primary-light text-primary-dark w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span>Hold your breath for 4 seconds</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-primary-light text-primary-dark w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span>Exhale through your mouth for 6 seconds</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="bg-primary-light text-primary-dark w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <span>Rest for 2 seconds, then repeat</span>
            </li>
          </ul>
        </Card>
        
        <div className="py-6">
          <BreathingCircle 
            isActive={isActive} 
            onComplete={handleComplete}
            duration={2} 
          />
        </div>
        
        {isCompleted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mt-6"
          >
            <h3 className="text-lg font-medium text-success-dark">Great job!</h3>
            <p className="text-neutral-dark">
              You've completed the breathing exercise. How do you feel?
            </p>
            <Button 
              onClick={handleReset} 
              leftIcon={<RotateCcw size={16} />}
            >
              Start Again
            </Button>
          </motion.div>
        ) : (
          <div className="flex justify-center space-x-4 mt-6">
            {isActive ? (
              <Button 
                onClick={handlePause} 
                leftIcon={<Pause size={16} />}
              >
                Pause
              </Button>
            ) : (
              <Button 
                onClick={handleStart} 
                leftIcon={<Play size={16} />}
              >
                {isCompleted ? 'Start Again' : 'Start'}
              </Button>
            )}
            
            {isActive && (
              <Button 
                variant="ghost" 
                onClick={handleReset}
                leftIcon={<RotateCcw size={16} />}
              >
                Reset
              </Button>
            )}
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </PageContainer>
  );
};

export default BreathingSupport;