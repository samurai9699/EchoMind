import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAppContext } from './context/AppContext';

// Components
import DisguisedHome from './pages/DisguisedHome';
import EmergencyActivation from './pages/EmergencyActivation';
import BreathingSupport from './pages/BreathingSupport';
import ContactsSetup from './pages/ContactsSetup';
import Settings from './pages/Settings';
import AIChat from './pages/AIChat';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const { isDisguised, inEmergency } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect based on app state
  useEffect(() => {
    if (isDisguised) {
      navigate('/');
    } else if (inEmergency && location.pathname === '/') {
      navigate('/emergency');
    }
  }, [isDisguised, inEmergency, navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-neutral-lightest font-rounded text-neutral-darkest">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DisguisedHome />} />
          <Route 
            path="/emergency" 
            element={
              <ProtectedRoute>
                <EmergencyActivation />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/breathing" 
            element={
              <ProtectedRoute>
                <BreathingSupport />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contacts" 
            element={
              <ProtectedRoute>
                <ContactsSetup />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;