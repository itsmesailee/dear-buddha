
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import DailyProgress from '@/components/dashboard/DailyProgress';
import WeeklyInsights from '@/components/dashboard/WeeklyInsights';
import QuickAccess from '@/components/dashboard/QuickAccess';
import DailyInspiration from '@/components/dashboard/DailyInspiration';

const Index = () => {
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
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-sage-800">Welcome to Your Mindful Path</h1>
            <p className="text-sage-600 mt-2">Your journey to inner peace continues today.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <DailyProgress />
              <WeeklyInsights />
            </div>
            
            <div className="space-y-6">
              <QuickAccess />
              <DailyInspiration />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
