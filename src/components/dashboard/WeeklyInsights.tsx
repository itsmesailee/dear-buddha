
import React, { useState } from 'react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis 
} from 'recharts';
import { CalendarCheck, Eye, BookOpen } from 'lucide-react';

const initialData = [
  { name: 'Mon', minutes: 15 },
  { name: 'Tue', minutes: 20 },
  { name: 'Wed', minutes: 10 },
  { name: 'Thu', minutes: 25 },
  { name: 'Fri', minutes: 18 },
  { name: 'Sat', minutes: 30 },
  { name: 'Sun', minutes: 22 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-md rounded-md border border-sage-100">
        <p className="text-xs font-medium text-sage-700">{label}</p>
        <p className="text-sm font-semibold text-sage-800">{`${payload[0].value} minutes`}</p>
        <p className="text-xs text-sage-500">of mindfulness practice</p>
      </div>
    );
  }
  return null;
};

const WeeklyInsights = () => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);
  const [data, setData] = useState(initialData);

  // Transform data to include fill color for visualization
  const barData = data.map(item => ({
    ...item,
    fill: item.name === hoveredBar ? '#ff880a' : '#8fa795'
  }));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100 animate-fade-up [animation-delay:100ms]">
      <h2 className="section-heading">Weekly Insights</h2>
      
      <div className="pt-2">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart 
            data={barData} 
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            onMouseMove={(e) => {
              if (e.activeTooltipIndex !== undefined) {
                setHoveredBar(data[e.activeTooltipIndex].name);
              }
            }}
            onMouseLeave={() => setHoveredBar(null)}
          >
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#718c78', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="minutes" 
              radius={[4, 4, 0, 0]}
              fill="#8fa795" // Use a single string color as the base
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between px-1 py-2 transition-all duration-300 hover:bg-sage-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
              <CalendarCheck className="h-4 w-4 text-sage-600" />
            </div>
            <span className="font-medium text-sage-700">Total Meditation Time</span>
          </div>
          <span className="font-semibold text-sage-800">140 minutes</span>
        </div>
        
        <div className="flex items-center justify-between px-1 py-2 transition-all duration-300 hover:bg-sage-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
              <Eye className="h-4 w-4 text-sage-600" />
            </div>
            <span className="font-medium text-sage-700">Mindfulness Sessions</span>
          </div>
          <span className="font-semibold text-sage-800">12 sessions</span>
        </div>
        
        <div className="flex items-center justify-between px-1 py-2 transition-all duration-300 hover:bg-sage-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-sage-600" />
            </div>
            <span className="font-medium text-sage-700">Reflections Completed</span>
          </div>
          <span className="font-semibold text-sage-800">5 reflections</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyInsights;
