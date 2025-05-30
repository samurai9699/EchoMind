import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import Button from './CalculatorButton';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  
  const { triggerEmergency, settings } = useAppContext();

  // Reset tap count after a delay
  useEffect(() => {
    if (tapCount > 0) {
      const timeout = setTimeout(() => {
        setTapCount(0);
      }, 1500); // Reset after 1.5 seconds of inactivity
      
      return () => clearTimeout(timeout);
    }
  }, [tapCount]);

  // Check for triple tap or code trigger
  useEffect(() => {
    // Triple tap trigger
    if (settings.triggerPattern === 'triple-tap' && tapCount >= 3) {
      triggerEmergency();
      setTapCount(0);
    }
    
    // Code trigger
    if (settings.triggerPattern === 'code' && 
        settings.triggerCode && 
        display === settings.triggerCode) {
      triggerEmergency();
    }
  }, [tapCount, display, settings.triggerPattern, settings.triggerCode, triggerEmergency]);

  const inputDigit = (digit: string) => {
    const currentTime = Date.now();
    
    // Handle triple tap detection
    if (currentTime - lastTapTime < 800) { // 800ms between taps
      setTapCount(prev => prev + 1);
    } else {
      setTapCount(1);
    }
    setLastTapTime(currentTime);
    
    // Handle digit input
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    
    if (firstOperand === null) {
      setFirstOperand(display);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(String(result));
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = () => {
    const firstValue = parseFloat(firstOperand || '0');
    const secondValue = parseFloat(display);
    
    if (operator === '+') return firstValue + secondValue;
    if (operator === '-') return firstValue - secondValue;
    if (operator === '*') return firstValue * secondValue;
    if (operator === '/') return firstValue / secondValue;
    
    return secondValue;
  };

  const calculateResult = () => {
    if (!operator || firstOperand === null) return;
    
    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-calculator-display rounded-lg p-4 mb-2 text-right h-16 flex items-center justify-end overflow-hidden shadow-inner">
        <div className="text-2xl font-semibold text-neutral-darkest truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <Button variant="clear" onClick={clearDisplay}>AC</Button>
        <Button variant="operator" onClick={() => handleOperator('+/-')}>+/-</Button>
        <Button variant="operator" onClick={() => handleOperator('%')}>%</Button>
        <Button variant="operator" onClick={() => handleOperator('/')}>/</Button>
        
        <Button onClick={() => inputDigit('7')}>7</Button>
        <Button onClick={() => inputDigit('8')}>8</Button>
        <Button onClick={() => inputDigit('9')}>9</Button>
        <Button variant="operator" onClick={() => handleOperator('*')}>×</Button>
        
        <Button onClick={() => inputDigit('4')}>4</Button>
        <Button onClick={() => inputDigit('5')}>5</Button>
        <Button onClick={() => inputDigit('6')}>6</Button>
        <Button variant="operator" onClick={() => handleOperator('-')}>-</Button>
        
        <Button onClick={() => inputDigit('1')}>1</Button>
        <Button onClick={() => inputDigit('2')}>2</Button>
        <Button onClick={() => inputDigit('3')}>3</Button>
        <Button variant="operator" onClick={() => handleOperator('+')}>+</Button>
        
        <Button className="col-span-2" onClick={() => inputDigit('0')}>0</Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button variant="equals" onClick={calculateResult}>=</Button>
      </div>
    </div>
  );
};

export default Calculator;