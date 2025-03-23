
import React from 'react';
import { Flame } from 'lucide-react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const previousStreak = [true, true, true, false, true, true, false];
const currentStreak = [true, true, true, true, false, false, false]; // Today is Thursday

const MeditationStreaks = () => {
  const longestStreak = 14;
  const currentStreakCount = 4;
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 animate-fade-up [animation-delay:100ms]">
      <h2 className="section-heading">Your Meditation Streaks</h2>
      
      <div className="mt-4 space-y-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Flame className="h-5 w-5 text-saffron-500 mr-2" />
              <span className="font-medium text-sage-700">Current Streak</span>
            </div>
            <span className="text-2xl font-semibold text-sage-800">{currentStreakCount} days</span>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((day, i) => (
              <div key={day} className="flex flex-col items-center">
                <div 
                  className={`
                    h-10 w-10 rounded-full flex items-center justify-center mb-1
                    ${i < 4 ? 'bg-saffron-100 text-saffron-600' : 'bg-sage-100 text-sage-500'}
                  `}
                >
                  {currentStreak[i] ? (
                    <Flame className={`h-5 w-5 ${i < 4 ? 'text-saffron-500' : 'text-sage-400'}`} />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-sage-300"></span>
                  )}
                </div>
                <span className="text-xs font-medium text-sage-600">{day}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="font-medium text-sage-700">Last Week</span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {daysOfWeek.map((day, i) => (
              <div key={`last-${day}`} className="flex flex-col items-center">
                <div 
                  className={`
                    h-10 w-10 rounded-full flex items-center justify-center mb-1
                    ${previousStreak[i] ? 'bg-sage-100 text-sage-600' : 'bg-sage-50 text-sage-400'}
                  `}
                >
                  {previousStreak[i] ? (
                    <Flame className="h-5 w-5 text-sage-500" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-sage-300"></span>
                  )}
                </div>
                <span className="text-xs font-medium text-sage-600">{day}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-saffron-100 flex items-center justify-center mr-3">
              <Flame className="h-4 w-4 text-saffron-500" />
            </div>
            <span className="font-medium text-sage-700">Longest Streak</span>
          </div>
          <span className="text-xl font-semibold text-sage-800">{longestStreak} days</span>
        </div>
      </div>
    </div>
  );
};

export default MeditationStreaks;
