
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Home, 
  Map, 
  MessageCircle, 
  Settings, 
  Timer, 
  Users 
} from 'lucide-react';

type SidebarProps = {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
};

const navItems = [
  { title: 'Dashboard', icon: Home, path: '/' },
  { title: 'Meditation', icon: Timer, path: '/meditation' },
  { title: 'Spiritual Practice', icon: BookOpen, path: '/practice' },
  { title: 'Community', icon: Users, path: '/community' },
  { title: 'Temple Map', icon: Map, path: '/temples' },
  { title: 'Discussion', icon: MessageCircle, path: '/discussion' },
  { title: 'Calendar', icon: Calendar, path: '/calendar' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

const Sidebar = ({ isSidebarOpen, closeSidebar }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-sage-900/30 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-sage-50 border-r border-sage-100 shadow-sm z-50 pt-16 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col p-4 h-full">
          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    currentPath === item.path
                      ? 'bg-sage-100 text-sage-800'
                      : 'text-sage-600 hover:bg-sage-100/70 hover:text-sage-800'
                  }`}
                  onClick={() => closeSidebar()}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="py-4">
            <div className="bg-sage-100 rounded-lg p-4">
              <h4 className="text-sm font-medium text-sage-800 mb-2">Daily Meditation</h4>
              <p className="text-xs text-sage-600 mb-3">Begin your journey with today's guided meditation.</p>
              <button className="bg-sage-500 text-white rounded-md px-3 py-1.5 text-sm font-medium hover:bg-sage-600 transition-colors w-full flex items-center justify-center gap-2">
                <Timer className="h-3.5 w-3.5" />
                <span>Begin Now</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
