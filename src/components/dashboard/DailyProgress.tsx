
import React from 'react';
import { Progress } from '@/components/ui/progress';

const DailyProgress = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100 animate-fade-up">
      <h2 className="section-heading">Today's Journey</h2>
      
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-sage-700">Mindfulness Minutes</h3>
            <span className="font-medium text-sage-800">15 / 20 min</span>
          </div>
          <div className="relative h-2 w-full bg-sage-100 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-sage-400 to-sage-500 rounded-full" 
              style={{ width: '75%' }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-sage-700">Daily Reflection</h3>
            <span className="font-medium text-sage-800">Completed</span>
          </div>
          <div className="relative h-2 w-full bg-sage-100 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-sage-400 to-sage-500 rounded-full" 
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-sage-700">Dharma Reading</h3>
            <span className="font-medium text-sage-800">10 / 15 pages</span>
          </div>
          <div className="relative h-2 w-full bg-sage-100 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-sage-400 to-sage-500 rounded-full" 
              style={{ width: '66%' }}
            />
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sage-100">
              <svg className="h-6 w-6 text-sage-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12C3 12 6 5 12 5C18 5 21 12 21 12C21 12 18 19 12 19C6 19 3 12 3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-sage-700">Mindfulness Streak</p>
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-sage-800">7</span>
                <span className="ml-2 text-sm text-sage-500">consecutive days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgress;
