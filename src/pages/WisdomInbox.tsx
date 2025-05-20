
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Home, 
  Book, 
  User,
  BookOpen,
  Bookmark
} from "lucide-react";
import { format } from 'date-fns';

const WisdomInbox = () => {
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would come from a database
  const wisdomMessages = [
    {
      id: 1,
      title: "On Patience",
      date: new Date(2023, 4, 15),
      content: "Patience is not the ability to wait, but the ability to keep a good attitude while waiting. This moment of difficulty shall pass, as all moments do.",
      tags: ["patience", "mindfulness"]
    },
    {
      id: 2,
      title: "Finding Peace",
      date: new Date(2023, 4, 10),
      content: "Peace comes from within. Do not seek it without. The quieter you become, the more you can hear.",
      tags: ["peace", "silence"]
    }
  ];
  
  const reflections = [
    {
      id: 1,
      date: new Date(2023, 4, 18),
      text: "Today I felt overwhelmed by work, but took a moment to breathe and center myself.",
      emotion: "stressed",
      intention: "I will take three mindful breaks during my workday tomorrow."
    },
    {
      id: 2,
      date: new Date(2023, 4, 12),
      text: "I'm grateful for the conversation with my friend that helped me see things from a new perspective.",
      emotion: "grateful",
      intention: "I will express gratitude more openly to those around me."
    }
  ];

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      <div className="flex-1 p-6">
        <h1 className="font-serif text-2xl text-sage-800 mb-6">Wisdom Inbox</h1>
        
        <Tabs defaultValue="wisdom" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wisdom">
              <BookOpen className="mr-2 h-4 w-4" />
              Wisdom
            </TabsTrigger>
            <TabsTrigger value="reflections">
              <Bookmark className="mr-2 h-4 w-4" />
              My Reflections
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wisdom" className="space-y-4 mt-4">
            {wisdomMessages.length > 0 ? (
              wisdomMessages.map(message => (
                <Card key={message.id} className="bg-white/80 backdrop-blur-sm border-sage-200">
                  <CardHeader>
                    <CardTitle className="font-serif">{message.title}</CardTitle>
                    <CardDescription>{format(message.date, 'MMMM d, yyyy')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sage-800 leading-relaxed">{message.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {message.tags.map(tag => (
                        <span key={tag} className="bg-sage-100 text-sage-700 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm">Save</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-sage-600 mb-4">No wisdom messages yet</p>
                <p className="text-sm text-sage-500">Your future reflections will appear here</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="reflections" className="space-y-4 mt-4">
            {reflections.length > 0 ? (
              reflections.map(reflection => (
                <Card key={reflection.id} className="bg-white/80 backdrop-blur-sm border-sage-200">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">{format(reflection.date, 'MMMM d, yyyy')}</CardTitle>
                    <CardDescription>
                      <span className="bg-sage-100 text-sage-700 text-xs px-2 py-1 rounded-full">
                        {reflection.emotion}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sage-800 mb-4">{reflection.text}</p>
                    {reflection.intention && (
                      <div className="border-t border-sage-100 pt-3 mt-3">
                        <p className="text-sm text-sage-600 italic">Intention:</p>
                        <p className="text-sage-800">{reflection.intention}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-sage-600 mb-4">No reflections saved yet</p>
                <p className="text-sm text-sage-500">Start a reflection to see it here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      <nav className="bg-white border-t border-sage-200 p-2">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => navigate('/')}>
            <Home className="h-5 w-5 text-sage-600" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => navigate('/wisdom-inbox')}>
            <Book className="h-5 w-5 text-sage-800" />
            <span className="text-xs mt-1 font-medium">Wisdom</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center p-2" onClick={() => navigate('/profile')}>
            <User className="h-5 w-5 text-sage-600" />
            <span className="text-xs mt-1">You</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default WisdomInbox;
