
import React from 'react';
import { Map, MapPin, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const TempleMap = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-sage-100 animate-fade-up">
      <h2 className="section-heading">Temple & Meditation Centers</h2>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-sage-500" />
        </div>
        <Input 
          type="text" 
          placeholder="Search for temples, centers or retreats..."
          className="pl-10 bg-sage-50 border-sage-200"
        />
      </div>
      
      <div className="relative h-[400px] rounded-xl overflow-hidden border border-sage-200 mb-4">
        {/* This would be replaced with an actual map integration */}
        <div className="absolute inset-0 bg-sage-100 flex items-center justify-center">
          <div className="text-center">
            <Map className="mx-auto h-16 w-16 text-sage-300 mb-4" />
            <p className="text-sage-600">Map would load here with temple locations</p>
            <p className="text-sm text-sage-500 mt-1">Connect to a map provider for live data</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="section-subheading">Nearby Locations</h3>
        
        <div className="flex flex-col space-y-3">
          {[
            { name: 'Peaceful Mind Center', distance: '1.2 miles', type: 'Meditation Center' },
            { name: 'Golden Temple', distance: '2.5 miles', type: 'Buddhist Temple' },
            { name: 'River Mindfulness Retreat', distance: '5.8 miles', type: 'Retreat Center' },
          ].map((location) => (
            <div 
              key={location.name}
              className="flex items-center p-3 bg-sage-50 rounded-lg border border-sage-200"
            >
              <div className="h-10 w-10 rounded-full bg-sage-200 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-sage-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sage-800">{location.name}</h4>
                <p className="text-sm text-sage-600">{location.type} • {location.distance}</p>
              </div>
              <Button variant="outline" size="sm" className="text-sage-600 border-sage-300">
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TempleMap;
