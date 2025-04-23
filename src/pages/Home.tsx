import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Heart, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateBuddhistWisdom } from '@/lib/wisdom';
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

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
  } | null>(null);
  const [usageCount, setUsageCount] = useState(0);
  const [userText, setUserText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showShareCheckbox, setShowShareCheckbox] = useState(false);
  const [shareThoughts, setShareThoughts] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedCount = localStorage.getItem('hoiphat_usage_count');
    setUsageCount(storedCount ? parseInt(storedCount, 10) : 0);
  }, []);

  const handleAskBuddha = () => {
    if (!selectedIntent && !userText) {
      toast({
        title: "Vui lòng chọn tâm trạng hoặc chia sẻ cảm xúc",
        description: "Hãy cho chúng tôi biết bạn đang cảm thấy thế nào.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAsking(true);
    setShowShareCheckbox(false);
    
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('hoiphat_usage_count', newCount.toString());
    
    setTimeout(() => {
      const generatedWisdom = generateBuddhistWisdom(selectedIntent || 'calm');
      setWisdom(generatedWisdom);
      setIsAsking(false);
    }, 1500);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      toast({
        title: "Ghi âm đã hoàn thành",
        description: "Cảm ơn con đã chia sẻ cảm xúc."
      });
    }, 3000);
  };

  const handleResponse = () => {
    setShowShareCheckbox(true);
  };

  const handleSaveResponse = () => {
    if (usageCount > 2) {
      setShowLoginModal(true);
    } else {
      toast({
        title: "Đã lưu phản hồi",
        description: "Cảm ơn con đã chia sẻ."
      });
      setShowShareCheckbox(false);
    }
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-serif font-medium text-sage-800">Hỏi Phật</h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col gap-6">
        {wisdom ? (
          <Card className="glass-card animate-fade-in relative overflow-hidden">
            <CardContent className="p-6">
              <div className="relative w-full h-64 mb-6">
                <img
                  src="/lovable-uploads/caaf6f74-6849-47d2-8482-cbac0192a153.png"
                  alt="Buddha statue"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-sm">
                    <blockquote className="font-serif text-xl leading-relaxed text-sage-800 mb-3">
                      "{wisdom.quote}"
                    </blockquote>
                    <p className="text-sage-600 italic text-sm">
                      — {wisdom.author}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-3 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setWisdom(null);
                    setShowShareCheckbox(false);
                  }}
                >
                  Hỏi lại
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-500 hover:bg-red-50"
                  onClick={() => {
                    toast({
                      title: "Đã lưu vào mục yêu thích",
                    });
                  }}
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleResponse}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Phản hồi
                </Button>
              </div>
              
              {showShareCheckbox && (
                <div className="mt-6 animate-fade-in space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="share" 
                      checked={shareThoughts}
                      onCheckedChange={(checked) => setShareThoughts(checked as boolean)}
                    />
                    <label 
                      htmlFor="share" 
                      className="text-sm text-sage-700"
                    >
                      Chia sẻ cảm nghĩ với mọi người
                    </label>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col items-center gap-4">
                      <Button
                        variant={isRecording ? "default" : "outline"}
                        className={`rounded-full h-16 w-16 ${isRecording ? 'animate-pulse bg-red-500' : ''}`}
                        onClick={handleStartRecording}
                      >
                        <Mic className="h-6 w-6" />
                      </Button>
                      <p className="text-sm text-sage-600">
                        {isRecording ? 'Đang ghi âm...' : 'Nhấn để bắt đầu'}
                      </p>
                    </div>
                    <Textarea 
                      placeholder="Hoặc gõ cảm nghĩ của bạn ở đây..."
                      className="mb-3"
                    />
                    <Button
                      className="w-full"
                      onClick={handleSaveResponse}
                    >
                      Lưu phản hồi
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-serif text-sage-800 text-center">
              Hôm nay con cảm thấy thế nào?
            </h2>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
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
            
            <div className="w-full max-w-md space-y-4">
              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="w-16 h-16 rounded-full"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className="h-6 w-6" />
                </Button>
              </div>
              
              <Textarea 
                placeholder="Hoặc gõ cảm xúc của bạn ở đây..."
                className="w-full"
                value={userText}
                onChange={(e) => setUserText(e.target.value)}
              />
              
              <Button 
                size="lg"
                className="w-full py-6 text-lg font-medium"
                onClick={handleAskBuddha}
                disabled={isAsking}
              >
                {isAsking ? (
                  <>
                    <div className="lotus-loader mr-2">🪷</div>
                    Đang hỏi...
                  </>
                ) : (
                  "Hỏi Phật"
                )}
              </Button>
            </div>
          </div>
        )}
      </main>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-sage-800 mb-3">
              Con hãy tạo tài khoản để lưu lại tiến độ nhé.
            </h3>
            <p className="text-sage-600 mb-6">
              Tạo tài khoản để lưu lại tất cả các trải nghiệm và nhận thêm nhiều lời dạy hữu ích.
            </p>
            
            <div className="flex flex-col gap-3">
              <Button className="bg-sage-600 hover:bg-sage-700">
                Tạo tài khoản
              </Button>
              <Button 
                variant="outline" 
                className="border-sage-200"
                onClick={() => setShowLoginModal(false)}
              >
                Để sau
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
