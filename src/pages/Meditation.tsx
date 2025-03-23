
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import MeditationTracking from '@/components/meditation/MeditationTracking';
import MeditationStreaks from '@/components/meditation/MeditationStreaks';

const Meditation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-sage-50/50">
      <NavBar toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      
      <main className="pt-16 md:pl-64 transition-all duration-300">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <header className="mb-6 animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-sage-800">Meditation Practice</h1>
            <p className="text-sage-600 mt-2">Cultivate mindfulness and inner peace with daily practice.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MeditationTracking />
            <MeditationStreaks />
            
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-sage-100 animate-fade-up [animation-delay:200ms]">
              <h2 className="section-heading">Recommended Meditations</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {[
                  {
                    title: 'Breath Awareness',
                    duration: '10 min',
                    level: 'Beginner',
                    focus: 'Concentration',
                  },
                  {
                    title: 'Loving-Kindness',
                    duration: '15 min',
                    level: 'Intermediate',
                    focus: 'Compassion',
                  },
                  {
                    title: 'Body Scan',
                    duration: '20 min',
                    level: 'All Levels',
                    focus: 'Awareness',
                  },
                ].map((meditation) => (
                  <div 
                    key={meditation.title}
                    className="bg-sage-50 hover:bg-sage-100 border border-sage-200 rounded-xl p-4 transition-all hover:shadow-sm"
                  >
                    <h3 className="font-medium text-sage-800 mb-1">{meditation.title}</h3>
                    <div className="flex items-center text-sage-600 text-sm mb-3">
                      <span>{meditation.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{meditation.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="bg-sage-200 text-sage-700 text-xs px-2 py-1 rounded-full">
                        {meditation.focus}
                      </span>
                      <button className="text-sage-600 text-sm font-medium hover:text-sage-800">
                        Start
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Meditation;
