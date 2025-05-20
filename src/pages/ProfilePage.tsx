
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Book, User, Settings, Calendar, Clock } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  
  // Sample user data - in a real app, this would come from a database
  const user = {
    name: "Mindful Seeker",
    joinDate: new Date(2023, 2, 15),
    streak: 3,
    totalReflections: 12,
    totalMinutesMeditated: 120
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-serif text-2xl text-sage-800">Your Journey</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-sage-600" />
          </Button>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm border-sage-200 mb-6">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <div className="w-16 h-16 rounded-full bg-sage-200 flex items-center justify-center">
              <User className="h-8 w-8 text-sage-600" />
            </div>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Practicing since {user.joinDate.toLocaleDateString()}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <p className="text-2xl font-medium text-sage-800">{user.streak}</p>
                <p className="text-xs text-sage-600">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-medium text-sage-800">{user.totalReflections}</p>
                <p className="text-xs text-sage-600">Reflections</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-medium text-sage-800">{user.totalMinutesMeditated}</p>
                <p className="text-xs text-sage-600">Minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="font-serif text-xl text-sage-800 mb-4">Your Practice</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <Calendar className="h-5 w-5 text-sage-600" />
            <span>Meditation Calendar</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-sage-600" />
            <span>Tracked Time</span>
          </Button>
        </div>
        
        <h2 className="font-serif text-xl text-sage-800 mb-4">Your Intentions</h2>
        
        <Card className="bg-white/80 backdrop-blur-sm border-sage-200 mb-6">
          <CardContent className="p-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 pb-3 border-b border-sage-100">
                <div className="w-2 h-2 rounded-full bg-sage-400 mt-2"></div>
                <div>
                  <p className="text-sage-800">I will take three mindful breaks during my workday.</p>
                  <p className="text-xs text-sage-500">Set 3 days ago</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-sage-400 mt-2"></div>
                <div>
                  <p className="text-sage-800">I will express gratitude more openly to those around me.</p>
                  <p className="text-xs text-sage-500">Set 5 days ago</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
          Start a new reflection
        </Button>
      </div>
      
      <nav className="bg-white border-t border-sage-200 p-2">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => navigate('/')}>
            <Home className="h-5 w-5 text-sage-600" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => navigate('/wisdom-inbox')}>
            <Book className="h-5 w-5 text-sage-600" />
            <span className="text-xs mt-1">Wisdom</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => navigate('/profile')}>
            <User className="h-5 w-5 text-sage-800" />
            <span className="text-xs mt-1 font-medium">You</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default ProfilePage;
