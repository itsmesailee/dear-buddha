
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import monkImage from '../assets/monk.jpg'; // You'll need to add this image to your assets folder

const OnboardingNew = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [audioElement] = useState(new Audio('/sounds/bell.mp3')); // You'll need to add this sound file
  
  const playSound = () => {
    if (!isPlaying) {
      audioElement.play();
      setIsPlaying(true);
      audioElement.onended = () => setIsPlaying(false);
    } else {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    }
  };
  
  const handleStart = () => {
    localStorage.setItem('hoiphat_intent', 'calm');
    toast({
      title: "Chào mừng bạn",
      description: "Hãy bắt đầu hành trình nội tâm của bạn."
    });
    navigate('/journal');
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col items-center justify-center p-6">
      <Card className="max-w-md w-full glass-card overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={monkImage} 
            alt="Buddhist Monk" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <h2 className="font-serif text-white text-2xl">Hỏi Phật</h2>
          </div>
        </div>
        
        <CardContent className="p-6 flex flex-col items-center">
          <blockquote className="font-serif text-xl text-center text-sage-800 mb-6">
            "Không có con đường đến với hạnh phúc, hạnh phúc chính là con đường."
          </blockquote>
          
          <p className="text-sage-600 text-center mb-8">
            Hãy bắt đầu hành trình nội tâm với sự đồng hành của trí tuệ Phật giáo.
            Một không gian để bạn chia sẻ cảm xúc và tìm thấy sự bình yên.
          </p>
          
          <Button
            variant="outline"
            className="rounded-full mb-6 border-sage-300 hover:bg-sage-100"
            onClick={playSound}
          >
            <Bell className={`mr-2 h-4 w-4 ${isPlaying ? 'text-primary animate-pulse' : ''}`} />
            {isPlaying ? 'Đang phát chuông' : 'Nghe tiếng chuông'}
          </Button>
          
          <Button 
            className="w-full py-6 text-lg font-medium"
            onClick={handleStart}
          >
            Bắt đầu hành trình
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingNew;
