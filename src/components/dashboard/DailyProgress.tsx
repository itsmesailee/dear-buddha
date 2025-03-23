
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Eye, BookOpen, Timer } from 'lucide-react';

const DailyProgress = () => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100 animate-fade-up">
      <h2 className="text-2xl md:text-3xl font-serif font-medium text-sage-800 mb-5">Today's Journey</h2>
      
      <div className="space-y-5">
        <div 
          className={`transition-all duration-300 p-3 rounded-lg ${hoveredTask === 'mindfulness' ? 'bg-sage-50' : ''}`}
          onMouseEnter={() => setHoveredTask('mindfulness')}
          onMouseLeave={() => setHoveredTask(null)}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center mr-3">
                <Timer className="h-4 w-4 text-sage-600" />
              </div>
              <h3 className="font-medium text-sage-700">Mindfulness Minutes</h3>
            </div>
            <span className="font-medium text-sage-800">15 / 20 min</span>
          </div>
          <Progress 
            value={75} 
            className="h-2 bg-sage-100" 
          />
          <p className={`text-xs text-sage-500 mt-2 transition-opacity ${hoveredTask === 'mindfulness' ? 'opacity-100' : 'opacity-0'}`}>
            Your mindful breathing sessions help reduce stress and increase focus.
          </p>
        </div>

        <div 
          className={`transition-all duration-300 p-3 rounded-lg ${hoveredTask === 'reflection' ? 'bg-sage-50' : ''}`}
          onMouseEnter={() => setHoveredTask('reflection')}
          onMouseLeave={() => setHoveredTask(null)}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center mr-3">
                <Eye className="h-4 w-4 text-sage-600" />
              </div>
              <h3 className="font-medium text-sage-700">Daily Reflection</h3>
            </div>
            <span className="font-medium text-sage-800">Completed</span>
          </div>
          <Progress 
            value={100} 
            className="h-2 bg-sage-100" 
          />
          <p className={`text-xs text-sage-500 mt-2 transition-opacity ${hoveredTask === 'reflection' ? 'opacity-100' : 'opacity-0'}`}>
            Regular reflection improves self-awareness and emotional intelligence.
          </p>
        </div>

        <div 
          className={`transition-all duration-300 p-3 rounded-lg ${hoveredTask === 'dharma' ? 'bg-sage-50' : ''}`}
          onMouseEnter={() => setHoveredTask('dharma')}
          onMouseLeave={() => setHoveredTask(null)}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center mr-3">
                <BookOpen className="h-4 w-4 text-sage-600" />
              </div>
              <h3 className="font-medium text-sage-700">Dharma Reading</h3>
            </div>
            <span className="font-medium text-sage-800">10 / 15 pages</span>
          </div>
          <Progress 
            value={66} 
            className="h-2 bg-sage-100" 
          />
          <p className={`text-xs text-sage-500 mt-2 transition-opacity ${hoveredTask === 'dharma' ? 'opacity-100' : 'opacity-0'}`}>
            Wisdom teachings help develop insight and understanding.
          </p>
        </div>

        <div className="pt-2">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-saffron-100 border border-saffron-200">
              <svg className="h-6 w-6 text-saffron-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 12C3 12 6 5 12 5C18 5 21 12 21 12C21 12 18 19 12 19C6 19 3 12 3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-sage-700">Mindfulness Streak</p>
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-saffron-500">7</span>
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
