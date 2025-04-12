
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { playMindfulnessBell } from '@/utils/audioUtils';

interface BreathingAnimationProps {
  duration?: number; // Duration for a complete cycle in ms
  rounds?: number; // Number of breathing rounds
  onComplete?: () => void;
}

type BreathPhase = 'inhale' | 'inhaleHold' | 'exhale' | 'exhaleHold';

const BreathingAnimation = ({ 
  duration = 24000, // Default to 24s for a complete cycle (6s per phase)
  rounds = 1, // Default to 1 round
  onComplete 
}: BreathingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<BreathPhase>('inhale');
  const [currentRound, setCurrentRound] = useState(1);
  const [shouldPlaySound, setShouldPlaySound] = useState(true);
  
  const phaseDuration = duration / 4; // Each phase is 1/4 of the total duration
  
  // Get instruction based on the current phase
  const getInstruction = () => {
    switch(phase) {
      case 'inhale': return 'Hít vào...';
      case 'inhaleHold': return 'Giữ...';
      case 'exhale': return 'Thở ra...';
      case 'exhaleHold': return 'Giữ...';
      default: return 'Hít vào...';
    }
  };
  
  // Calculate the progress for the circular animation (0-100%)
  const getCircleProgress = () => {
    if (phase === 'inhale') return (progress % 25) * 4;
    if (phase === 'inhaleHold') return 100;
    if (phase === 'exhale') return 100 - ((progress % 25) * 4);
    return 0; // exhaleHold
  };
  
  useEffect(() => {
    const interval = 100; // Update every 100ms for smoother animation
    const totalSteps = duration / interval;
    let currentStep = 0;
    
    // Play initial bell sound when starting
    if (shouldPlaySound) {
      playMindfulnessBell('inhale');
      setShouldPlaySound(false);
    }
    
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / totalSteps) * 100;
      setProgress(newProgress);
      
      // Determine the current phase (each phase is 25% of the total)
      const currentPhaseProgress = newProgress % 100;
      let newPhase: BreathPhase = 'inhale';
      
      if (currentPhaseProgress < 25) {
        newPhase = 'inhale';
      } else if (currentPhaseProgress < 50) {
        newPhase = 'inhaleHold';
      } else if (currentPhaseProgress < 75) {
        newPhase = 'exhale';
      } else {
        newPhase = 'exhaleHold';
      }
      
      // If phase changed, play the bell sound
      if (newPhase !== phase) {
        setPhase(newPhase);
        playMindfulnessBell(newPhase);
      }
      
      // Check if we need to increase the round counter
      if (currentStep % (totalSteps / rounds) === 0 && currentRound < rounds) {
        setCurrentRound(prev => prev + 1);
      }
      
      // Check if all rounds are complete
      if (currentStep >= totalSteps) {
        clearInterval(timer);
        if (onComplete) {
          setTimeout(() => onComplete(), 500);
        }
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [duration, onComplete, rounds, phase, shouldPlaySound]);

  // Animation size class based on the phase
  const getAnimationSize = () => {
    if (phase === 'inhale') return 'scale-110';
    if (phase === 'inhaleHold') return 'scale-110';
    if (phase === 'exhale') return 'scale-100';
    return 'scale-100'; // exhaleHold
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-64 h-64 mb-8">
        {/* Circular progress indicator */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5DEFF"
              strokeWidth="6"
              className="opacity-30"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#b38c65"
              strokeWidth="6"
              strokeDasharray="283"
              strokeDashoffset={283 - ((getCircleProgress() / 100) * 283)}
              className="transition-all duration-300 ease-linear"
            />
          </svg>
        </div>
        
        {/* Buddha illustration in center */}
        <div 
          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${getAnimationSize()}`}
        >
          <div className="w-40 h-40 relative">
            {/* Buddha SVG */}
            <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Head */}
              <circle cx="50" cy="45" r="25" fill="#F1D9B5" />
              
              {/* Face */}
              <circle cx="40" cy="40" r="2" fill="#333" /> {/* Left eye */}
              <circle cx="60" cy="40" r="2" fill="#333" /> {/* Right eye */}
              <path d="M45 50 Q50 55 55 50" stroke="#333" strokeWidth="1.5" fill="none" /> {/* Smile */}
              
              {/* Ears */}
              <path d="M25 45 Q20 30 25 25 Q30 23 32 40" fill="#F1D9B5" />
              <path d="M75 45 Q80 30 75 25 Q70 23 68 40" fill="#F1D9B5" />
              
              {/* Hair bun */}
              <circle cx="50" cy="25" r="10" fill="#333" />
              
              {/* Body - Robe */}
              <path d="M30 70 Q50 90 70 70 V110 H30 V70" fill="#b38c65" />
              
              {/* Shoulders */}
              <path d="M30 70 Q40 65 50 70 Q60 65 70 70" fill="#b38c65" stroke="#b38c65" strokeWidth="1" />
              
              {/* Hands in meditation */}
              <ellipse cx="50" cy="95" rx="15" ry="8" fill="#F1D9B5" />
            </svg>
          </div>
        </div>
      </div>
      
      <p className="text-sage-700 text-xl font-medium mb-4">{getInstruction()}</p>
      
      {/* Box breathing indicators */}
      <div className="flex gap-8 mb-6">
        <div className="text-center">
          <div className={`w-14 h-1 mb-2 rounded-full ${phase === 'inhale' ? 'bg-saffron-500' : 'bg-sage-200'}`}></div>
          <p className="text-xs text-sage-600">6s</p>
          <p className={`text-sm ${phase === 'inhale' ? 'text-saffron-600 font-medium' : 'text-sage-500'}`}>Hít vào</p>
        </div>
        <div className="text-center">
          <div className={`w-14 h-1 mb-2 rounded-full ${phase === 'inhaleHold' ? 'bg-saffron-500' : 'bg-sage-200'}`}></div>
          <p className="text-xs text-sage-600">6s</p>
          <p className={`text-sm ${phase === 'inhaleHold' ? 'text-saffron-600 font-medium' : 'text-sage-500'}`}>Giữ</p>
        </div>
        <div className="text-center">
          <div className={`w-14 h-1 mb-2 rounded-full ${phase === 'exhale' ? 'bg-saffron-500' : 'bg-sage-200'}`}></div>
          <p className="text-xs text-sage-600">6s</p>
          <p className={`text-sm ${phase === 'exhale' ? 'text-saffron-600 font-medium' : 'text-sage-500'}`}>Thở ra</p>
        </div>
        <div className="text-center">
          <div className={`w-14 h-1 mb-2 rounded-full ${phase === 'exhaleHold' ? 'bg-saffron-500' : 'bg-sage-200'}`}></div>
          <p className="text-xs text-sage-600">6s</p>
          <p className={`text-sm ${phase === 'exhaleHold' ? 'text-saffron-600 font-medium' : 'text-sage-500'}`}>Giữ</p>
        </div>
      </div>
      
      <div className="w-64 h-2 bg-sage-100 rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-saffron-300 rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>
      
      <p className="text-sm text-sage-500 mt-4">
        Vòng {currentRound}/{rounds}
      </p>
    </div>
  );
};

export default BreathingAnimation;
