
import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityEvents = () => {
  const events = [
    {
      title: 'Group Meditation',
      date: 'May 15, 2023',
      time: '6:00 PM - 7:30 PM',
      location: 'Peaceful Mind Center',
      attendees: 12,
      virtual: false,
    },
    {
      title: 'Dharma Talk: Compassion in Practice',
      date: 'May 18, 2023',
      time: '5:00 PM - 6:30 PM',
      location: 'Online Zoom Session',
      attendees: 45,
      virtual: true,
    },
    {
      title: 'Weekend Retreat: Inner Silence',
      date: 'May 20-22, 2023',
      time: 'All day',
      location: 'River Mindfulness Retreat',
      attendees: 8,
      virtual: false,
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 animate-fade-up [animation-delay:100ms]">
      <h2 className="section-heading">Community Events</h2>
      
      <div className="mt-4 space-y-5">
        {events.map((event) => (
          <div 
            key={event.title}
            className="p-4 bg-sage-50 rounded-xl border border-sage-200"
          >
            <h3 className="font-medium text-sage-800 mb-2">{event.title}</h3>
            
            <div className="space-y-2 mb-3">
              <div className="flex items-center text-sage-600 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{event.date}</span>
              </div>
              
              <div className="flex items-center text-sage-600 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                <span>{event.time}</span>
              </div>
              
              <div className="flex items-center text-sage-600 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
                {event.virtual && (
                  <span className="ml-2 px-1.5 py-0.5 bg-sky-100 text-sky-600 rounded text-xs">Virtual</span>
                )}
              </div>
              
              <div className="flex items-center text-sage-600 text-sm">
                <Users className="h-4 w-4 mr-2" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm" className="text-sage-600 border-sage-300">
                Details
              </Button>
              <Button size="sm" className="bg-sage-500 hover:bg-sage-600">
                Join
              </Button>
            </div>
          </div>
        ))}
        
        <button className="w-full py-2.5 border border-dashed border-sage-300 rounded-lg text-sage-600 hover:bg-sage-50 transition-colors text-sm font-medium">
          View All Events
        </button>
      </div>
    </div>
  );
};

export default CommunityEvents;
