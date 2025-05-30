import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { Contact, EmergencyAlert } from '../types';
import { useAppContext } from '../context/AppContext';
import PageContainer from '../components/Layout/PageContainer';
import AppHeader from '../components/Layout/AppHeader';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import ContactSelector from '../components/EmergencyResponse/ContactSelector';
import AlertPreview from '../components/EmergencyResponse/AlertPreview';
import BottomNavigation from '../components/Layout/BottomNavigation';

const EmergencyActivation: React.FC = () => {
  const navigate = useNavigate();
  const { contacts, resolveEmergency } = useAppContext();
  const [step, setStep] = useState<'initial' | 'contacts' | 'preview' | 'sent'>('initial');
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [message, setMessage] = useState('I need help. This is an emergency.');
  const [isSending, setIsSending] = useState(false);
  
  // Mock location data
  const location = {
    latitude: 37.7749,
    longitude: -122.4194,
    address: '123 Main Street, San Francisco, CA',
  };
  
  const handleContinue = () => {
    if (step === 'initial') {
      setStep('contacts');
    } else if (step === 'contacts') {
      setStep('preview');
    } else if (step === 'preview') {
      sendAlert();
    } else if (step === 'sent') {
      resolveEmergency();
      navigate('/breathing');
    }
  };
  
  const handleBack = () => {
    if (step === 'contacts') {
      setStep('initial');
    } else if (step === 'preview') {
      setStep('contacts');
    }
  };
  
  const handleContactSelectionChange = (contacts: Contact[]) => {
    setSelectedContacts(contacts);
  };
  
  const sendAlert = () => {
    setIsSending(true);
    
    // Simulate sending the alert
    setTimeout(() => {
      setIsSending(false);
      setStep('sent');
    }, 2000);
  };
  
  const emergencyAlert: EmergencyAlert = {
    message,
    location,
    timestamp: new Date(),
    contacts: selectedContacts,
  };
  
  const buttonText = {
    initial: 'Continue',
    contacts: 'Preview Alert',
    preview: 'Send Alert',
    sent: 'Go to Breathing Exercise',
  };
  
  return (
    <PageContainer>
      <AppHeader 
        title="Emergency Response" 
        showBack={step !== 'initial' && step !== 'sent'}
        showClose={false}
      />
      
      <div className="flex flex-col items-center justify-between h-[calc(100vh-8rem)]">
        <div className="w-full max-w-md mx-auto pt-4">
          {step === 'initial' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Card animate className="p-4 border-l-4 border-error">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-error mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Emergency Mode Activated</h3>
                    <p className="text-neutral-darker mb-4">
                      You've activated emergency mode. We can help you alert your trusted contacts.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card animate delay={0.1} className="p-4">
                <h3 className="font-medium mb-2">Emergency Message</h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-neutral-lighter rounded-md p-3 min-h-24 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-transparent"
                  placeholder="Enter your emergency message here..."
                />
              </Card>
              
              <Card animate delay={0.2} className="p-4">
                <h3 className="font-medium mb-2">Location</h3>
                <p className="text-sm text-neutral-dark mb-1">Your current location will be shared:</p>
                <p className="bg-neutral-lightest p-2 rounded text-sm">
                  {location.address}
                </p>
              </Card>
            </motion.div>
          )}
          
          {step === 'contacts' && (
            <Card className="w-full">
              <ContactSelector onSelectionChange={handleContactSelectionChange} />
            </Card>
          )}
          
          {step === 'preview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium mb-3">Preview Alert</h3>
              <AlertPreview alert={emergencyAlert} />
              
              <p className="mt-4 text-sm text-neutral-dark">
                Review your emergency alert above. When ready, tap Send Alert to notify your selected contacts.
              </p>
            </motion.div>
          )}
          
          {step === 'sent' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-success-dark" />
              </div>
              
              <h2 className="text-xl font-semibold mb-2">Alert Sent Successfully</h2>
              <p className="text-neutral-dark mb-6">
                Your emergency alert has been sent to {selectedContacts.length} contact{selectedContacts.length !== 1 ? 's' : ''}.
              </p>
              
              <Card className="p-4 text-left mb-4">
                <h3 className="font-medium mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary-light text-primary-dark w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span>Your contacts will receive your message with your location</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary-light text-primary-dark w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span>Try the breathing exercises to help stay calm</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary-light text-primary-dark w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span>Use the AI chat for emotional support</span>
                  </li>
                </ul>
              </Card>
            </motion.div>
          )}
        </div>
        
        <div className="w-full max-w-md mb-4 px-4">
          <Button
            fullWidth
            size="lg"
            variant={step === 'preview' ? 'danger' : 'primary'}
            onClick={handleContinue}
            isLoading={isSending}
            leftIcon={step === 'preview' ? <Send size={18} /> : undefined}
          >
            {buttonText[step]}
          </Button>
          
          {step === 'initial' && (
            <Button
              fullWidth
              variant="ghost"
              className="mt-2"
              onClick={() => {
                resolveEmergency();
                navigate('/breathing');
              }}
            >
              Cancel and go to breathing exercise
            </Button>
          )}
        </div>
      </div>
      
      {step === 'sent' && <BottomNavigation />}
    </PageContainer>
  );
};

export default EmergencyActivation;