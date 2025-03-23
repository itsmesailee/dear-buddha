
import React from 'react';
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis 
} from 'recharts';
import { CalendarCheck } from 'lucide-react';

const data = [
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
      <div className="bg-white p-2 shadow-md rounded-md border border-sage-100">
        <p className="text-xs font-medium">{`${label}: ${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const WeeklyInsights = () => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100 animate-fade-up [animation-delay:100ms]">
      <h2 className="section-heading">Weekly Insights</h2>
      
      <div className="pt-2">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#718c78', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="minutes" 
              fill="#8fa795"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
              <CalendarCheck className="h-4 w-4 text-sage-600" />
            </div>
            <span className="font-medium text-sage-700">Total Meditation Time</span>
          </div>
          <span className="font-semibold text-sage-800">140 minutes</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-sage-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12C2 12 6 4 12 4C18 4 22 12 22 12C22 12 18 20 12 20C6 20 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-medium text-sage-700">Mindfulness Sessions</span>
          </div>
          <span className="font-semibold text-sage-800">12 sessions</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sage-100 flex items-center justify-center">
              <svg className="h-4 w-4 text-sage-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7H5C3.89543 7 3 7.89543 3 9V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V9C21 7.89543 20.1046 7 19 7H16M15 11L12 14M12 14L9 11M12 14V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
