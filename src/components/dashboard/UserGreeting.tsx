
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

const UserGreeting = () => {
  // Get user's first name - in a real app, this would come from authentication
  const userName = 'Sarah';
  
  // Determine time of day for greeting
  const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  };
  
  const timeOfDay = getTimeOfDay();
  
  return (
    <div className="flex items-center justify-between mb-8 animate-fade-up">
      <div>
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-sage-800">
          Good {timeOfDay}, {userName}
        </h1>
        <p className="text-sage-600 mt-1">Your journey to inner peace continues today.</p>
      </div>
      
      <Avatar className="h-12 w-12 border-2 border-sage-200 transition-all duration-300 hover:border-saffron-300 cursor-pointer">
        <AvatarImage src="https://i.pravatar.cc/150?img=36" alt="User avatar" />
        <AvatarFallback className="bg-sage-200 text-sage-700">{userName.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserGreeting;
