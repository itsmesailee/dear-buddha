
import React, { useState, useEffect } from 'react';

interface BreathingAnimationProps {
  duration?: number;
  onComplete?: () => void;
}

const BreathingAnimation = ({ 
  duration = 5000, 
  onComplete 
}: BreathingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [instruction, setInstruction] = useState('Hít vào...');

  useEffect(() => {
    const interval = 100; // Update every 100ms for smoother animation
    const steps = duration / interval;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);
      
      // Change instruction at halfway point
      if (newProgress < 50) {
        setInstruction('Hít vào...');
      } else {
        setInstruction('Thở ra...');
      }
      
      if (currentStep >= steps) {
        clearInterval(timer);
        if (onComplete) {
          onComplete();
        }
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [duration, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-32 mb-6">
        {/* Lotus animation */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: 'lotus-bloom 5s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-saffron-300">
            <path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 40C35.5228 40 40 35.5228 40 30C40 24.4772 35.5228 20 30 20C24.4772 20 20 24.4772 20 30C20 35.5228 24.4772 40 30 40Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        {/* Breathing circle animation */}
        <div
          className="absolute inset-0 bg-sage-100 rounded-full opacity-30"
          style={{
            transform: `scale(${0.8 + (progress < 50 ? progress/100 : (100-progress)/100)})`,
            transition: 'transform 0.5s ease-in-out'
          }}
        />
      </div>
      
      <p className="text-sage-700 text-lg">{instruction}</p>
      
      <div className="w-64 h-2 bg-sage-100 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-saffron-300 rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
    </div>
  );
};

export default BreathingAnimation;
