
import React, { useState } from 'react';
import { Clock, PauseCircle, PlayCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const MeditationTracking = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(10);
  const [secondsLeft, setSecondsLeft] = useState(duration * 60);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleReset = () => {
    setIsActive(false);
    setSecondsLeft(duration * 60);
  };
  
  const handleDurationChange = (value: number[]) => {
    const newDuration = value[0];
    setDuration(newDuration);
    setSecondsLeft(newDuration * 60);
  };
  
  const progress = ((duration * 60 - secondsLeft) / (duration * 60)) * 100;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 animate-fade-up">
      <h2 className="section-heading">Meditation Timer</h2>
      
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="relative h-52 w-52 mb-6">
          {/* Progress ring */}
          <svg className="absolute inset-0" width="208" height="208" viewBox="0 0 208 208">
            {/* Background circle */}
            <circle 
              cx="104" 
              cy="104" 
              r="96" 
              fill="none" 
              stroke="#e6ece7" 
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle 
              cx="104" 
              cy="104" 
              r="96" 
              fill="none" 
              stroke="#8fa795" 
              strokeWidth="12" 
              strokeLinecap="round"
              strokeDasharray="603.2"
              strokeDashoffset={603.2 - (603.2 * progress) / 100}
              transform="rotate(-90 104 104)"
            />
          </svg>
          
          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-medium text-sage-800 font-mono">
              {formatTime(secondsLeft)}
            </div>
            <div className="text-sage-600 mt-2 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{duration} minutes</span>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button 
              onClick={handleReset} 
              variant="outline" 
              size="icon"
              className="rounded-full h-12 w-12 text-sage-500 border-sage-200 hover:bg-sage-50"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => setIsActive(!isActive)} 
              variant="default" 
              size="icon"
              className="rounded-full h-16 w-16 bg-sage-500 hover:bg-sage-600"
            >
              {isActive ? (
                <PauseCircle className="h-8 w-8" />
              ) : (
                <PlayCircle className="h-8 w-8" />
              )}
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-sage-600">Duration</span>
              <span className="text-sm font-medium text-sage-800">{duration} min</span>
            </div>
            <Slider
              defaultValue={[duration]}
              max={60}
              min={1}
              step={1}
              onValueChange={handleDurationChange}
              disabled={isActive}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-sage-500">
              <span>1 min</span>
              <span>30 min</span>
              <span>60 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationTracking;
