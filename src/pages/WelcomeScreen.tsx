
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBreathing, setIsBreathing] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isMeditationComplete, setIsMeditationComplete] = useState(false);

  useEffect(() => {
    if (isBreathing && secondsRemaining > 0) {
      const timer = setTimeout(() => {
        setSecondsRemaining(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isBreathing && secondsRemaining === 0) {
      setIsBreathing(false);
      setIsMeditationComplete(true);
      toast({
        title: "Meditation complete",
        description: "Take a moment to notice how you feel now."
      });
    }
  }, [isBreathing, secondsRemaining, toast]);

  const startBreathing = (seconds: number) => {
    setIsBreathing(true);
    setSecondsRemaining(seconds);
    // Play bell sound if available
    const bellSound = new Audio('/sounds/bell.mp3');
    bellSound.play().catch(error => {
      console.log('Audio playback error:', error);
    });
  };

  const handleBegin = () => {
    navigate('/reflect');
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-8 relative w-40 h-40 mx-auto">
          <img
            src="/lovable-uploads/d2ac33b9-a2d0-49d4-9c8e-55d363e8cf82.png"
            alt="Buddha statue"
            className={`w-full h-full object-contain transition-all duration-1000 ${isBreathing ? 'animate-pulse' : ''}`}
          />
        </div>

        <h1 className="font-serif text-3xl text-sage-800 mb-6">Welcome back</h1>
        
        <p className="text-sage-700 max-w-md mb-8 leading-relaxed">
          Take a breath. Notice how you are, right now. You are not alone.
        </p>

        {!isBreathing && !isMeditationComplete && (
          <div className="space-y-4 w-full max-w-md">
            <p className="text-sage-600 text-sm mb-2">Would you like to sit in silence for a moment?</p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => startBreathing(10)}
                className="flex-1"
              >
                10 seconds
              </Button>
              <Button
                variant="outline"
                onClick={() => startBreathing(20)}
                className="flex-1"
              >
                20 seconds
              </Button>
              <Button
                variant="outline"
                onClick={() => startBreathing(30)}
                className="flex-1"
              >
                30 seconds
              </Button>
            </div>
            <Button onClick={handleBegin} className="w-full">
              Begin when you're ready
            </Button>
          </div>
        )}

        {isBreathing && (
          <div className="text-center space-y-6 w-full max-w-md">
            <div className="text-5xl font-light text-sage-800">{secondsRemaining}</div>
            <p className="text-sage-600">Breathe in... and out...</p>
            <div className="w-full bg-sage-200 rounded-full h-2.5">
              <div 
                className="bg-sage-500 h-2.5 rounded-full transition-all duration-1000"
                style={{ width: `${(secondsRemaining / (isMeditationComplete ? 1 : 30)) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {isMeditationComplete && (
          <Button 
            onClick={handleBegin}
            size="lg"
            className="animate-fade-in"
          >
            Begin your reflection
          </Button>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
