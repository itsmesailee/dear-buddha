
import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete?: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Play bell sound on load
    const bellSound = new Audio('/sounds/bell.mp3');
    bellSound.play().catch(error => {
      console.log('Audio playback error:', error);
    });

    // Show splash for 3 seconds, then navigate to home
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 500);
    }, 3000);

    return () => {
      clearTimeout(timer);
      bellSound.pause();
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-sage-50 transition-opacity duration-500 z-50"
         style={{ opacity: isLoaded ? 0 : 1 }}>
      <div className="text-center">
        <div className="mb-6 relative w-64 h-64 mx-auto">
          <img
            src="/images/buddha-illustration.png"
            alt="Buddha under tree"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="font-serif text-3xl text-sage-800 animate-fade-in">Hỏi Phật</h1>
      </div>
    </div>
  );
};

export default SplashScreen;
