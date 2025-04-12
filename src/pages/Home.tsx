import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookMarked, RefreshCw, ChevronRight, ThumbsUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateBuddhistWisdom } from '@/lib/wisdom';

const INTENTS = [
  { value: "calm", label: "Bình yên", emoji: "😌" },
  { value: "insight", label: "Hiểu biết", emoji: "💡" },
  { value: "gratitude", label: "Biết ơn", emoji: "🙏" },
  { value: "confusion", label: "Hoang mang", emoji: "😕" },
];

const Home = () => {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(
    localStorage.getItem('hoiphat_intent') || 'calm'
  );
  const [isAsking, setIsAsking] = useState(false);
  const [wisdom, setWisdom] = useState<{
    quote: string;
    author: string;
    reflection: string;
  } | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAskBuddha = () => {
    if (!selectedIntent) {
      toast({
        title: "Vui lòng chọn ý định",
        description: "Hãy cho chúng tôi biết bạn đang cảm thấy thế nào.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAsking(true);
    
    // Simulate API delay
    setTimeout(() => {
      const generatedWisdom = generateBuddhistWisdom(selectedIntent);
      setWisdom(generatedWisdom);
      setIsAsking(false);
    }, 1500);
  };
  
  const saveWisdom = () => {
    if (!wisdom) return;
    
    // Get existing saved wisdom from localStorage
    const savedWisdomStr = localStorage.getItem('hoiphat_saved_wisdom');
    const savedWisdom = savedWisdomStr ? JSON.parse(savedWisdomStr) : [];
    
    // Add new wisdom to the beginning, keep only the latest 5
    const updatedWisdom = [
      {...wisdom, savedAt: new Date().toISOString(), intent: selectedIntent},
      ...savedWisdom
    ].slice(0, 5);
    
    localStorage.setItem('hoiphat_saved_wisdom', JSON.stringify(updatedWisdom));
    
    toast({
      title: "Đã lưu lời Phật dạy",
      description: "Bạn có thể xem lại trong phần Lời dạy đã lưu.",
      action: (
        <Button size="sm" variant="outline" onClick={() => navigate('/wisdom')}>
          Xem ngay
        </Button>
      )
    });
  };
  
  const resetWisdom = () => {
    setWisdom(null);
  };
  
  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-serif font-medium text-sage-800">Hỏi Phật</h1>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sage-600"
          onClick={() => navigate('/wisdom')}
        >
          <BookMarked className="h-5 w-5" />
        </Button>
      </header>
      
      <main className="flex-1 p-4 flex flex-col gap-6">
        {wisdom ? (
          <Card className="glass-card animate-fade-in">
            <CardContent className="p-6">
              <div className="flex justify-end mb-2">
                <span className="text-xs px-3 py-1 bg-sage-100 text-sage-600 rounded-full">
                  {INTENTS.find(i => i.value === selectedIntent)?.label || 'Bình yên'}
                </span>
              </div>
              
              <blockquote className="font-serif text-xl leading-relaxed text-sage-800 mb-4">
                "{wisdom.quote}"
              </blockquote>
              
              <p className="text-right text-sage-600 italic text-sm mb-6">
                — {wisdom.author}
              </p>
              
              <div className="bg-sage-50/50 p-4 rounded-lg border border-sage-100 mb-6">
                <h3 className="font-medium mb-2 text-sage-700">Suy ngẫm:</h3>
                <p className="text-sage-600">{wisdom.reflection}</p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={resetWisdom}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Hỏi lại
                </Button>
                <Button 
                  className="flex-1"
                  onClick={saveWisdom}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Lưu lại
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="text-center my-8">
              <h2 className="font-serif text-2xl text-sage-800 mb-4">
                Điều gì đang ở trong tâm trí bạn?
              </h2>
              <p className="text-sage-600">
                Chọn ý định để nhận lời dạy phù hợp
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {INTENTS.map(intent => (
                <Button 
                  key={intent.value}
                  variant={selectedIntent === intent.value ? "default" : "outline"}
                  className={`h-24 flex flex-col gap-2 ${
                    selectedIntent === intent.value 
                    ? "bg-primary text-white" 
                    : "hover:bg-sage-50 border-sage-200"
                  }`}
                  onClick={() => setSelectedIntent(intent.value)}
                >
                  <span className="text-2xl">{intent.emoji}</span>
                  <span>{intent.label}</span>
                </Button>
              ))}
            </div>
            
            <Button 
              size="lg"
              className="mt-8 w-full py-6 text-lg font-medium"
              onClick={handleAskBuddha}
              disabled={isAsking}
            >
              {isAsking ? (
                <>
                  <div className="lotus-loader mr-2">🪷</div>
                  Đang hỏi...
                </>
              ) : (
                <>
                  Hỏi Phật
                  <ChevronRight className="h-5 w-5 ml-1" />
                </>
              )}
            </Button>
          </>
        )}
      </main>
      
      {/* Footer */}
      <footer className="p-4 text-center text-sm text-sage-500">
        <p>Mỗi ngày một lời Phật dạy</p>
      </footer>
    </div>
  );
};

export default Home;
