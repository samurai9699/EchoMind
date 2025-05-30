import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Bell, Moon, Clock, Code } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';
import AppHeader from '../components/Layout/AppHeader';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Card from '../components/UI/Card';
import { useAppContext } from '../context/AppContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useAppContext();
  
  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      updateSettings({ [key]: !settings[key] });
    }
  };
  
  const handleTriggerPatternChange = (pattern: 'triple-tap' | 'code' | 'gesture') => {
    updateSettings({ triggerPattern: pattern });
  };
  
  const handleTriggerCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ triggerCode: e.target.value });
  };
  
  const handleAutoLockTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ autoLockTime: parseInt(e.target.value) });
  };

  return (
    <PageContainer>
      <AppHeader title="Settings" />
      
      <div className="max-w-md mx-auto pb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <Card animate className="overflow-visible">
            <div className="p-4 border-b border-neutral-lighter">
              <h3 className="font-medium flex items-center">
                <Shield size={18} className="mr-2 text-primary-dark" />
                Disguise Settings
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Disguise Mode</p>
                  <p className="text-sm text-neutral-dark">How the app appears when locked</p>
                </div>
                <select
                  value={settings.disguiseMode}
                  onChange={(e) => updateSettings({ disguiseMode: e.target.value as 'calculator' | 'notes' })}
                  className="p-2 border border-neutral-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent"
                >
                  <option value="calculator">Calculator</option>
                  <option value="notes">Notes</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Lock</p>
                  <p className="text-sm text-neutral-dark">Lock app after period of inactivity</p>
                </div>
                <div 
                  className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                    settings.autoLock ? 'bg-primary' : 'bg-neutral-light'
                  }`}
                  onClick={() => handleToggle('autoLock')}
                >
                  <div 
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      settings.autoLock ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
              
              {settings.autoLock && (
                <div className="flex items-center justify-between pl-4 border-l-2 border-primary-light">
                  <div>
                    <p className="font-medium flex items-center">
                      <Clock size={16} className="mr-1 text-neutral-dark" />
                      Auto-Lock Time
                    </p>
                    <p className="text-sm text-neutral-dark">Time before auto-locking</p>
                  </div>
                  <select
                    value={settings.autoLockTime}
                    onChange={handleAutoLockTimeChange}
                    className="p-2 border border-neutral-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent"
                  >
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={300}>5 minutes</option>
                    <option value={600}>10 minutes</option>
                  </select>
                </div>
              )}
            </div>
          </Card>
          
          <Card animate delay={0.1}>
            <div className="p-4 border-b border-neutral-lighter">
              <h3 className="font-medium flex items-center">
                <Bell size={18} className="mr-2 text-primary-dark" />
                Emergency Trigger
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <p className="font-medium mb-2">Trigger Pattern</p>
                <div className="space-y-2">
                  <div 
                    className="flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-neutral-lightest"
                    onClick={() => handleTriggerPatternChange('triple-tap')}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        settings.triggerPattern === 'triple-tap' 
                          ? 'border-primary bg-primary' 
                          : 'border-neutral-light'
                      }`}
                    >
                      {settings.triggerPattern === 'triple-tap' && (
                        <span className="block w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span>Triple Tap (tap calculator screen 3 times)</span>
                  </div>
                  
                  <div 
                    className="flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-neutral-lightest"
                    onClick={() => handleTriggerPatternChange('code')}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        settings.triggerPattern === 'code' 
                          ? 'border-primary bg-primary' 
                          : 'border-neutral-light'
                      }`}
                    >
                      {settings.triggerPattern === 'code' && (
                        <span className="block w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span>Secret Code (enter specific number)</span>
                  </div>
                  
                  <div 
                    className="flex items-center space-x-2 p-2 rounded-md cursor-pointer hover:bg-neutral-lightest opacity-50"
                    onClick={() => {}}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        settings.triggerPattern === 'gesture' 
                          ? 'border-primary bg-primary' 
                          : 'border-neutral-light'
                      }`}
                    >
                      {settings.triggerPattern === 'gesture' && (
                        <span className="block w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span>Gesture (Coming soon)</span>
                  </div>
                </div>
              </div>
              
              {settings.triggerPattern === 'code' && (
                <div className="pl-4 border-l-2 border-primary-light">
                  <label className="block mb-1 font-medium flex items-center">
                    <Code size={16} className="mr-1 text-neutral-dark" />
                    Secret Code
                  </label>
                  <input
                    type="text"
                    value={settings.triggerCode}
                    onChange={handleTriggerCodeChange}
                    placeholder="e.g., 911"
                    className="p-2 border border-neutral-lighter rounded-md w-full focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-dark mt-1">
                    Enter this code in the calculator to trigger emergency mode
                  </p>
                </div>
              )}
            </div>
          </Card>
          
          <Card animate delay={0.2}>
            <div className="p-4 border-b border-neutral-lighter">
              <h3 className="font-medium flex items-center">
                <Moon size={18} className="mr-2 text-primary-dark" />
                Appearance
              </h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-neutral-dark">Use dark theme</p>
                </div>
                <div 
                  className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                    settings.darkMode ? 'bg-primary' : 'bg-neutral-light'
                  }`}
                  onClick={() => handleToggle('darkMode')}
                >
                  <div 
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      settings.darkMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sound Effects</p>
                  <p className="text-sm text-neutral-dark">Enable app sounds</p>
                </div>
                <div 
                  className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${
                    settings.soundEnabled ? 'bg-primary' : 'bg-neutral-light'
                  }`}
                  onClick={() => handleToggle('soundEnabled')}
                >
                  <div 
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </div>
              </div>
            </div>
          </Card>
          
          <div className="text-center text-xs text-neutral-medium pt-4">
            <p>EchoMind v0.1.0</p>
            <p>© 2025 SafetyTech Inc.</p>
          </div>
        </motion.div>
      </div>
      
      <BottomNavigation />
    </PageContainer>
  );
};

export default Settings;