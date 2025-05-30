import React, { forwardRef } from 'react';
import { useAppContext } from '../../context/AppContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, fullWidth = false, className = '', ...props }, ref) => {
    const { settings } = useAppContext();
    
    const inputWrapperClasses = `
      relative flex items-center
      ${fullWidth ? 'w-full' : ''}
      ${error ? 'mb-6' : 'mb-4'}
    `;

    const inputClasses = `
      block px-4 py-2
      transition-all duration-300
      rounded-md 
      focus:outline-none focus:ring-2 focus:border-transparent
      ${settings.darkMode 
        ? 'bg-dark-card border-dark-border text-dark-text placeholder-neutral-medium'
        : 'bg-white border-neutral-light text-neutral-darkest placeholder-neutral-medium'
      }
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
      ${error 
        ? 'border-error focus:ring-error/30' 
        : settings.darkMode
          ? 'border-dark-border focus:ring-primary/30'
          : 'border-neutral-light focus:ring-primary/30'
      }
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className={`
            block text-sm font-medium mb-1
            transition-colors duration-300
            ${settings.darkMode ? 'text-dark-text' : 'text-neutral-darker'}
          `}>
            {label}
          </label>
        )}
        <div className={inputWrapperClasses}>
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-neutral-medium">
              {leftIcon}
            </div>
          )}
          <input ref={ref} className={inputClasses} {...props} />
          {rightIcon && (
            <div className="absolute right-3 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-error text-xs mt-1 absolute">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;