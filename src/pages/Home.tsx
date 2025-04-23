
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateBuddhistWisdom } from '@/lib/wisdom';
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import MoodSelector from '@/components/MoodSelector';
import WisdomDisplay from '@/components/WisdomDisplay';
import ActionInput from '@/components/ActionInput';

const Home = () => {
  const [selectedIntent, setSelectedIntent] = useState<string | null>(
    localStorage.getItem('hoiphat_intent') || 'calm'
  );
  const [showDetailInput, setShowDetailInput] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [wisdom, setWisdom] = useState<{
    quote: string;
    author: string;
  } | null>(null);
  const [userText, setUserText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [shareThoughts, setShareThoughts] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [reaction, setReaction] = useState<string | null>(null);
  const [showTodoInput, setShowTodoInput] = useState(false);
  
  const { toast } = useToast();

  const handleAskBuddha = () => {
    if (!selectedIntent) {
      toast({
        title: "Vui lòng chọn tâm trạng",
        description: "Hãy cho chúng tôi biết bạn đang cảm thấy thế nào.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAsking(true);
    setShowDetailInput(false);
    
    setTimeout(() => {
      const generatedWisdom = generateBuddhistWisdom(selectedIntent);
      setWisdom(generatedWisdom);
      setIsAsking(false);
    }, 1500);
  };

  const handleMoodSelection = (intent: string) => {
    setSelectedIntent(intent);
    localStorage.setItem('hoiphat_intent', intent);
    setShowDetailInput(true);
  };

  const handleSaveResponse = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-serif font-medium text-sage-800">Hỏi Phật</h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col gap-6">
        {wisdom ? (
          <WisdomDisplay 
            wisdom={wisdom}
            onAskAgain={() => setWisdom(null)}
            onSave={handleSaveResponse}
            shareThoughts={shareThoughts}
            setShareThoughts={setShareThoughts}
            showTodoInput={showTodoInput}
            setShowTodoInput={setShowTodoInput}
            reaction={reaction}
            setReaction={setReaction}
          />
        ) : (
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-serif text-sage-800 text-center">
              Hôm nay con cảm thấy thế nào?
            </h2>
            
            <MoodSelector 
              selectedIntent={selectedIntent}
              onSelect={handleMoodSelection}
            />
            
            {showDetailInput && (
              <div className="w-full max-w-md space-y-4 animate-fade-in">
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
              </div>
            )}
            
            <Button 
              size="lg"
              className="w-full max-w-md py-6 text-lg font-medium"
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
