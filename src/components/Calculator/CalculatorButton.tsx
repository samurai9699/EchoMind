import React from 'react';

interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'equals' | 'clear';
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  children,
  onClick,
  variant = 'number',
  className = '',
}) => {
  const baseClasses = 'py-3 rounded-lg text-center font-medium shadow-sm active:translate-y-0.5 transition-transform';
  
  const variantClasses = {
    number: 'bg-calculator-button-number text-neutral-darkest hover:bg-neutral-lighter',
    operator: 'bg-calculator-button-operator text-neutral-darkest hover:bg-neutral-light',
    equals: 'bg-calculator-button-equals text-white hover:bg-primary-dark',
    clear: 'bg-calculator-button-clear text-error-dark hover:bg-red-100',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;