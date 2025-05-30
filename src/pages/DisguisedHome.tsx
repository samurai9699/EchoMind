import React from 'react';
import { useAppContext } from '../context/AppContext';
import Calculator from '../components/Calculator/Calculator';
import PageContainer from '../components/Layout/PageContainer';

const DisguisedHome: React.FC = () => {
  const { toggleDisguise } = useAppContext();

  return (
    <PageContainer className="py-4">
      <div className="w-full max-w-md mx-auto">
        {/* Hidden trigger area - a triple tap or secret pattern here will unlock the app */}
        <div 
          className="w-full h-10 mb-4" 
          onClick={toggleDisguise}
          aria-hidden="true"
        />
        
        {/* Calculator disguise */}
        <Calculator />
        
        {/* Info text that looks like a calculator app note */}
        <div className="mt-8 p-4 text-center text-sm text-neutral-medium">
          <p>Standard Calculator v1.2</p>
          <p className="mt-2">© 2025 Calc Tools Inc.</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default DisguisedHome;