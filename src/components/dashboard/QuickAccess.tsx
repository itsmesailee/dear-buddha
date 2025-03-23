
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
      hoverColor: 'hover:bg-sage-50 hover:border-sage-300',
      iconBg: 'bg-sage-100',
      iconColor: 'text-sage-600',
      activeIconBg: 'group-hover:bg-sage-500',
      activeIconColor: 'group-hover:text-white',
    },
    {
      title: 'Spiritual Lessons',
      description: 'Today\'s dharma teachings',
      icon: BookOpen,
      path: '/practice',
      color: 'bg-earth-500',
      hoverColor: 'hover:bg-earth-50 hover:border-earth-300',
      iconBg: 'bg-earth-100',
      iconColor: 'text-earth-600',
      activeIconBg: 'group-hover:bg-earth-500',
      activeIconColor: 'group-hover:text-white',
    },
    {
      title: 'Personal Reflection',
      description: 'Journal your insights',
      icon: Edit,
      path: '/reflection',
      color: 'bg-saffron-500',
      hoverColor: 'hover:bg-saffron-50 hover:border-saffron-300',
      iconBg: 'bg-saffron-100',
      iconColor: 'text-saffron-600',
      activeIconBg: 'group-hover:bg-saffron-500',
      activeIconColor: 'group-hover:text-white',
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100 animate-fade-up [animation-delay:200ms]">
      <h2 className="section-heading">Quick Access</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickAccessItems.map((item) => (
          <Link 
            to={item.path} 
            key={item.title}
            className={`group bg-white border border-sage-200 rounded-xl p-5 transition-all duration-300 ${item.hoverColor} hover:shadow-md flex flex-col items-center text-center`}
          >
            <div className={`${item.iconBg} h-14 w-14 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${item.activeIconBg}`}>
              <item.icon className={`h-6 w-6 ${item.iconColor} transition-colors duration-300 ${item.activeIconColor}`} />
            </div>
            <h3 className="font-medium text-sage-800 mb-1 text-lg">{item.title}</h3>
            <p className="text-sm text-sage-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
