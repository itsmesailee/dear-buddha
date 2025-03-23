
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import DailyProgress from '@/components/dashboard/DailyProgress';
import WeeklyInsights from '@/components/dashboard/WeeklyInsights';
import QuickAccess from '@/components/dashboard/QuickAccess';
import DailyInspiration from '@/components/dashboard/DailyInspiration';
import UserGreeting from '@/components/dashboard/UserGreeting';

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
          <UserGreeting />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Primary content - 8/12 columns on large screens */}
            <div className="lg:col-span-8 space-y-6">
              <DailyInspiration />
              <DailyProgress />
              <QuickAccess />
            </div>
            
            {/* Secondary content - 4/12 columns on large screens */}
            <div className="lg:col-span-4 space-y-6">
              <WeeklyInsights />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
