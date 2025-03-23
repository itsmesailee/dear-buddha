
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Sidebar from '@/components/Sidebar';
import TempleMap from '@/components/community/TempleMap';
import CommunityEvents from '@/components/community/CommunityEvents';

const Community = () => {
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
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-sage-800">Mindful Community</h1>
            <p className="text-sage-600 mt-2">Connect with others on the path to inner peace.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TempleMap />
            <CommunityEvents />
            
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-sage-100 animate-fade-up [animation-delay:200ms]">
              <h2 className="section-heading">Discussion Forum</h2>
              
              <div className="space-y-4 mt-4">
                {[
                  {
                    title: 'How do you maintain daily practice with a busy schedule?',
                    author: 'MindfulSeeker',
                    time: '2 hours ago',
                    replies: 12,
                    category: 'Practice Tips',
                  },
                  {
                    title: 'Book recommendations for beginners in Buddhism',
                    author: 'NewToPath',
                    time: '1 day ago',
                    replies: 24,
                    category: 'Resources',
                  },
                  {
                    title: 'Dealing with difficult emotions during meditation',
                    author: 'PeacefulMind',
                    time: '3 days ago',
                    replies: 18,
                    category: 'Meditation',
                  },
                ].map((discussion) => (
                  <div 
                    key={discussion.title}
                    className="p-4 bg-sage-50 rounded-xl border border-sage-200 hover:border-sage-300 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-sage-800">{discussion.title}</h3>
                      <span className="bg-sage-200 text-sage-700 text-xs px-2 py-1 rounded-full h-fit">
                        {discussion.category}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div className="text-sage-600">
                        <span>By {discussion.author}</span>
                        <span className="mx-2">•</span>
                        <span>{discussion.time}</span>
                      </div>
                      <div className="text-sage-600">
                        <span>{discussion.replies} replies</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-2.5 border border-dashed border-sage-300 rounded-lg text-sage-600 hover:bg-sage-50 transition-colors text-sm font-medium">
                  View All Discussions
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
