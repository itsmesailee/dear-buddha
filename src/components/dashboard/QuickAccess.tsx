
import React from 'react';
import { Link } from 'react-router-dom';
import { Timer, BookOpen, Edit } from 'lucide-react';

const QuickAccess = () => {
  const quickAccessItems = [
    {
      title: 'Meditation',
      description: 'Start a guided session',
      icon: Timer,
      path: '/meditation',
      color: 'bg-sage-500',
    },
    {
      title: 'Spiritual Lessons',
      description: 'Today\'s dharma teachings',
      icon: BookOpen,
      path: '/practice',
      color: 'bg-earth-500',
    },
    {
      title: 'Personal Reflection',
      description: 'Journal your insights',
      icon: Edit,
      path: '/reflection',
      color: 'bg-sky-500',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100 animate-fade-up [animation-delay:200ms]">
      <h2 className="section-heading">Quick Access</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickAccessItems.map((item, index) => (
          <Link 
            to={item.path} 
            key={item.title}
            className="bg-sage-50 hover:bg-sage-100 border border-sage-200 rounded-xl p-4 transition-all hover:shadow-sm"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`${item.color} h-12 w-12 rounded-full flex items-center justify-center mb-3`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-medium text-sage-800 mb-1">{item.title}</h3>
              <p className="text-sm text-sage-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
