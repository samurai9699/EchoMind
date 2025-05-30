import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';
import AppHeader from '../components/Layout/AppHeader';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import BreathingCircle from '../components/BreathingExercise/BreathingCircle';
import BottomNavigation from '../components/Layout/BottomNavigation';
import { useAppContext } from '../context/AppContext';

const BreathingSupport: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { settings, updateSettings } = useAppContext();
  
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

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  return (
    <PageContainer>
      <AppHeader title="Breathing Exercise" />
      
      <div className="max-w-md mx-auto pt-2 pb-20">
        <Card className="p-5 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
              settings.darkMode ? 'text-primary-light' : 'text-primary-dark'
            }`}>
              4-7-8 Breathing
            </h2>
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full transition-colors duration-300 ${
                settings.darkMode 
                  ? 'hover:bg-dark-border text-neutral-lighter' 
                  : 'hover:bg-neutral-lighter text-neutral-darker'
              }`}
              aria-label={settings.soundEnabled ? 'Disable sound' : 'Enable sound'}
            >
              {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
          
          <p className={`transition-colors duration-300 ${
            settings.darkMode ? 'text-neutral-lighter' : 'text-neutral-darker'
          } mb-4`}>
            This calming breathing technique helps reduce anxiety and promote relaxation:
          </p>
          
          <ul className="space-y-3 mb-4">
            <li className="flex items-start space-x-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                settings.darkMode 
                  ? 'bg-primary-dark text-dark-text' 
                  : 'bg-primary-light text-primary-dark'
              }`}>1</span>
              <span className={`transition-colors duration-300 ${
                settings.darkMode ? 'text-neutral-lighter' : 'text-neutral-darker'
              }`}>
                Breathe in quietly through your nose for 4 seconds
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                settings.darkMode 
                  ? 'bg-primary-dark text-dark-text' 
                  : 'bg-primary-light text-primary-dark'
              }`}>2</span>
              <span className={`transition-colors duration-300 ${
                settings.darkMode ? 'text-neutral-lighter' : 'text-neutral-darker'
              }`}>
                Hold your breath gently for 7 seconds
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                settings.darkMode 
                  ? 'bg-primary-dark text-dark-text' 
                  : 'bg-primary-light text-primary-dark'
              }`}>3</span>
              <span className={`transition-colors duration-300 ${
                settings.darkMode ? 'text-neutral-lighter' : 'text-neutral-darker'
              }`}>
                Exhale completely through your mouth for 8 seconds
              </span>
            </li>
          </ul>
          
          <p className={`text-sm transition-colors duration-300 ${
            settings.darkMode ? 'text-neutral-medium' : 'text-neutral-dark'
          }`}>
            Practice this pattern for 2-3 minutes or until you feel calmer
          </p>
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
            <h3 className={`text-lg font-medium transition-colors duration-300 ${
              settings.darkMode ? 'text-success-light' : 'text-success-dark'
            }`}>
              Well done!
            </h3>
            <p className={`transition-colors duration-300 ${
              settings.darkMode ? 'text-neutral-lighter' : 'text-neutral-dark'
            }`}>
              You've completed the breathing exercise. How do you feel?
            </p>
            <div className="space-x-3">
              <Button 
                onClick={handleReset} 
                leftIcon={<RotateCcw size={16} />}
              >
                Start Again
              </Button>
            </div>
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
                size="lg"
              >
                {isCompleted ? 'Start Again' : 'Begin Exercise'}
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