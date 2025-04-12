import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookMarked, RefreshCw, ChevronRight, ThumbsUp, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateBuddhistWisdom } from '@/lib/wisdom';
import BreathingAnimation from '@/components/meditation/BreathingAnimation';
import { playMindfulnessBell } from '@/utils/audioUtils';

const INTENTS = [
  { value: "calm", label: "Bình yên", emoji: "😌" },
  { value: "insight", label: "Hiểu biết", emoji: "💡" },
  { value: "gratitude", label: "Biết ơn", emoji: "🙏" },
  { value: "confusion", label: "Hoang mang", emoji: "😕" },
];

const FEEDBACK_OPTIONS = [
  { emoji: "🙏", label: "Rất giúp ích", value: "very_helpful", positive: true },
  { emoji: "😊", label: "Dễ chịu", value: "pleasant", positive: true },
  { emoji: "😐", label: "Bình thường", value: "neutral", positive: false },
  { emoji: "😕", label: "Chưa phù hợp", value: "not_helpful", positive: false },
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
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [showEarlyUserInvite, setShowEarlyUserInvite] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  
  const [showBreathingPrompt, setShowBreathingPrompt] = useState(false);
  const [showBreathingAnimation, setShowBreathingAnimation] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedCount = localStorage.getItem('hoiphat_usage_count');
    setUsageCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, []);

  const handleAskBuddha = async () => {
    if (!selectedIntent) {
      toast({
        title: "Vui lòng chọn ý định",
        description: "Hãy cho chúng tôi biết bạn đang cảm thấy thế nào.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAsking(true);
    setShowFeedback(false);
    setSelectedFeedback(null);
    setShowEarlyUserInvite(false);
    
    setShowBreathingPrompt(true);
  };

  const startBreathingAnimation = () => {
    setShowBreathingPrompt(false);
    setShowBreathingAnimation(true);
    
    playMindfulnessBell();
  };

  const handleBreathingComplete = () => {
    setShowBreathingAnimation(false);
    
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('hoiphat_usage_count', newCount.toString());
    
    const generatedWisdom = generateBuddhistWisdom(selectedIntent!);
    setWisdom(generatedWisdom);
    setIsAsking(false);
    setShowFeedback(true);
  };

  const saveWisdom = () => {
    if (!wisdom) return;
    
    const savedWisdomStr = localStorage.getItem('hoiphat_saved_wisdom');
    const savedWisdom = savedWisdomStr ? JSON.parse(savedWisdomStr) : [];
    
    const updatedWisdom = [
      {...wisdom, savedAt: new Date().toISOString(), intent: selectedIntent, feedback: selectedFeedback},
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
    setShowFeedback(false);
    setSelectedFeedback(null);
    setShowEarlyUserInvite(false);
  };

  const handleFeedback = (value: string, isPositive: boolean) => {
    setSelectedFeedback(value);
    
    if (!isPositive || usageCount >= 3) {
      setShowEarlyUserInvite(true);
    }
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
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
        {showBreathingPrompt ? (
          <div className="animate-fade-in text-center my-10">
            <h2 className="font-serif text-2xl text-sage-800 mb-6">
              Bạn có muốn dừng lại một nhịp thở trước khi nhận lời Phật dạy hôm nay?
            </h2>
            <Button 
              size="lg" 
              className="w-full py-6"
              onClick={startBreathingAnimation}
            >
              Bắt đầu thở
            </Button>
          </div>
        ) : showBreathingAnimation ? (
          <div className="animate-fade-in flex flex-col items-center justify-center my-10 bg-gradient-to-b from-sage-50 to-sage-100 p-8 rounded-3xl shadow-sm">
            <BreathingAnimation 
              duration={16000}
              rounds={2}
              onComplete={handleBreathingComplete}
            />
          </div>
        ) : wisdom ? (
          <Card className="glass-card animate-fade-in relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-repeat bg-center" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 5C74.85 5 95 25.15 95 50C95 74.85 74.85 95 50 95C25.15 95 5 74.85 5 50C5 25.15 25.15 5 50 5ZM50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50C85 30.67 69.33 15 50 15Z' fill='%23b38c65' fill-opacity='0.15'/%3E%3C/svg%3E")`
              }}></div>
              
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 10C65 10 75 25 75 40C75 55 65 70 50 70C35 70 25 55 25 40C25 25 35 10 50 10Z" fill="#b38c65" fillOpacity="0.3"/>
                  <path d="M50 20C60 20 65 30 65 40C65 50 60 60 50 60C40 60 35 50 35 40C35 30 40 20 50 20Z" fill="#b38c65" fillOpacity="0.3"/>
                </svg>
              </div>
            </div>

            <CardContent className="p-6 relative z-10">
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
              
              {showFeedback && (
                <div className="mb-6 animate-fade-in">
                  <p className="text-center text-sm text-sage-600 mb-4">
                    Lời dạy này có giúp bạn hôm nay không?
                  </p>
                  <div className="flex justify-center gap-4">
                    {FEEDBACK_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFeedback(option.value, option.positive)}
                        className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                          selectedFeedback === option.value 
                            ? 'bg-sage-100 scale-110' 
                            : 'hover:bg-sage-50'
                        }`}
                      >
                        <span className="text-2xl mb-1">{option.emoji}</span>
                        <span className="text-xs text-sage-600">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {showEarlyUserInvite && (
                <div className="mb-6 bg-sage-50 p-4 rounded-lg border border-sage-100 animate-fade-in">
                  <p className="text-sm text-sage-700 mb-3">
                    Bạn muốn góp ý để cải thiện app Hỏi Phật? Tham gia nhóm Facebook dành cho những người dùng đầu tiên 💬
                  </p>
                  <div className="flex justify-center">
                    <a 
                      href="https://m.me/j/AbbtegYf3SbXf4k2/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button 
                        variant="outline" 
                        className="bg-white border-sage-200"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Vào nhóm Early Users
                      </Button>
                    </a>
                  </div>
                </div>
              )}
              
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
        )}
      </main>
      
      <footer className="p-4 text-center text-sm text-sage-500">
        <p>Mỗi ngày một lời Phật dạy</p>
      </footer>
    </div>
  );
};

export default Home;
