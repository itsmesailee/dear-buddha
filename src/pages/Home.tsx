import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookMarked, RefreshCw, ChevronRight, ThumbsUp, MessageCircle, Mic } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateBuddhistWisdom } from '@/lib/wisdom';
import { Textarea } from "@/components/ui/textarea";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const REACTION_EMOJIS = ["😢", "😮", "😌", "❤️"];

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
  const [userText, setUserText] = useState("");
  const [showVoicePopover, setShowVoicePopover] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [showResponseOptions, setShowResponseOptions] = useState(false);
  const [responseType, setResponseType] = useState<'voice' | 'todo' | null>(null);
  const [todoItems, setTodoItems] = useState(Array(5).fill(""));
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
        title: "Vui lòng chọn ý định hoặc nhập câu hỏi",
        description: "Hãy cho chúng tôi biết bạn đang cảm thấy thế nào.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAsking(true);
    setShowFeedback(false);
    setSelectedFeedback(null);
    setShowEarlyUserInvite(false);
    setSelectedReaction(null);
    setShowResponseOptions(false);
    setResponseType(null);
    
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('hoiphat_usage_count', newCount.toString());
    
    setTimeout(() => {
      const generatedWisdom = generateBuddhistWisdom(selectedIntent || 'calm');
      setWisdom(generatedWisdom);
      setIsAsking(false);
      setShowFeedback(true);
    }, 1500);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setShowVoicePopover(false);
      toast({
        title: "Ghi âm đã hoàn thành",
        description: "Cảm ơn con đã chia sẻ cảm xúc."
      });
    }, 3000);
  };

  const handleSaveResponse = () => {
    if (usageCount > 2) {
      setShowLoginModal(true);
    } else {
      toast({
        title: "Đã lưu phản hồi",
        description: "Cảm ơn con đã chia sẻ."
      });
      setResponseType(null);
    }
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
    setSelectedReaction(null);
    setShowResponseOptions(false);
    setResponseType(null);
  };

  const handleFeedback = (value: string, isPositive: boolean) => {
    setSelectedFeedback(value);
    
    if (!isPositive || usageCount >= 3) {
      setShowEarlyUserInvite(true);
    }
  };

  const handleShareSocial = (platform: string) => {
    toast({
      title: `Đang chia sẻ lên ${platform}...`,
      description: "Tính năng đang được phát triển."
    });
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
      
      <div className="mx-auto mb-4 relative w-40 h-40">
        <img
          src="/images/buddha-illustration.png"
          alt="Buddha under tree"
          className="w-full h-full object-contain"
        />
      </div>
      
      <main className="flex-1 p-4 flex flex-col gap-6">
        {wisdom ? (
          <>
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
                
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src="/images/monk-portrait.jpg" 
                      alt={wisdom.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sage-800 font-medium">{wisdom.author}</p>
                    <p className="text-sage-600 text-sm">Bài giảng về buông bỏ</p>
                  </div>
                </div>
                
                <div className="bg-sage-50/50 p-4 rounded-lg border border-sage-100 mb-6">
                  <h3 className="font-medium mb-2 text-sage-700">Suy ngẫm:</h3>
                  <p className="text-sage-600">{wisdom.reflection}</p>
                </div>
                
                {showFeedback && !selectedReaction && (
                  <div className="mb-6 animate-fade-in">
                    <p className="text-center text-sm text-sage-600 mb-4">
                      Con cảm thấy thế nào sau khi nghe điều này?
                    </p>
                    <div className="flex justify-center gap-4">
                      {REACTION_EMOJIS.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => setSelectedReaction(emoji)}
                          className={`flex flex-col items-center p-2 rounded-lg transition-all hover:bg-sage-50`}
                        >
                          <span className="text-2xl mb-1">{emoji}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedReaction && !showResponseOptions && (
                  <div className="mb-6 animate-fade-in">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowResponseOptions(true)}
                    >
                      Con muốn phản hồi không?
                    </Button>
                  </div>
                )}
                
                {showResponseOptions && !responseType && (
                  <div className="mb-6 animate-fade-in bg-sage-50 p-4 rounded-lg border border-sage-100">
                    <p className="text-sage-700 mb-3 font-medium">Chọn cách phản hồi:</p>
                    <Button
                      variant="outline"
                      className="w-full mb-2"
                      onClick={() => setResponseType('voice')}
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Ghi âm cảm nhận
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setResponseType('todo')}
                    >
                      <ChevronRight className="mr-2 h-4 w-4" />
                      Tạo hành động
                    </Button>
                  </div>
                )}
                
                {responseType === 'voice' && (
                  <div className="mb-6 animate-fade-in bg-sage-50 p-4 rounded-lg border border-sage-100">
                    <p className="text-sage-700 mb-3 font-medium">Ghi âm cảm nhận của bạn:</p>
                    <div className="flex flex-col items-center mb-3">
                      <Button
                        variant={isRecording ? "default" : "outline"}
                        className={`rounded-full h-16 w-16 ${isRecording ? 'animate-pulse bg-red-500' : ''}`}
                        onClick={handleStartRecording}
                      >
                        <Mic className="h-6 w-6" />
                      </Button>
                      <p className="text-sm text-sage-600 mt-2">
                        {isRecording ? 'Đang ghi âm...' : 'Nhấn để bắt đầu'}
                      </p>
                    </div>
                    <Textarea 
                      placeholder="Ghi chú bổ sung (không bắt buộc)"
                      className="mb-3"
                    />
                    <Button
                      className="w-full"
                      onClick={handleSaveResponse}
                    >
                      Lưu phản hồi
                    </Button>
                  </div>
                )}
                
                {responseType === 'todo' && (
                  <div className="mb-6 animate-fade-in bg-sage-50 p-4 rounded-lg border border-sage-100">
                    <p className="text-sage-700 mb-3 font-medium">Tạo 5 điều hành động:</p>
                    {Array(5).fill("").map((_, idx) => (
                      <div key={idx} className="flex mb-2 gap-2">
                        <div className="flex-grow">
                          <input
                            className="w-full p-2 border border-sage-200 rounded"
                            placeholder={`Hoạt động ${idx + 1} (vd: ngồi thiền 5 phút)`}
                            value={todoItems[idx]}
                            onChange={(e) => {
                              const newItems = [...todoItems];
                              newItems[idx] = e.target.value;
                              setTodoItems(newItems);
                            }}
                          />
                        </div>
                        <select className="border border-sage-200 rounded px-2">
                          <option>5 AM</option>
                          <option>10 PM</option>
                        </select>
                      </div>
                    ))}
                    <Button
                      className="w-full mt-2"
                      onClick={handleSaveResponse}
                    >
                      Lưu hành động
                    </Button>
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
                
                <div className="flex gap-3 mb-3">
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
                
                <div className="flex justify-between border-t border-sage-100 pt-3">
                  <p className="text-sm text-sage-600">Chia sẻ:</p>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600"
                      onClick={() => handleShareSocial('Facebook')}
                    >
                      FB
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-pink-600"
                      onClick={() => handleShareSocial('Instagram')}
                    >
                      IG
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-500"
                      onClick={() => handleShareSocial('Zalo')}
                    >
                      Zalo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <div className="text-center my-4">
              <h2 className="font-serif text-2xl text-sage-800 mb-4">
                Hôm nay con cảm thấy thế nào?
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
            
            <div className="mt-6">
              <p className="text-sage-600 mb-2">Hoặc bạn muốn...</p>
              
              <div className="flex gap-2 mb-4">
                <Popover open={showVoicePopover} onOpenChange={setShowVoicePopover}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-12 p-0" onClick={() => setShowVoicePopover(true)}>
                      <Mic className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72">
                    <div className="flex flex-col items-center">
                      <p className="mb-3 text-sm text-sage-600">Hãy nói cảm xúc của bạn</p>
                      <Button 
                        variant={isRecording ? "default" : "outline"} 
                        className={`rounded-full h-16 w-16 ${isRecording ? 'animate-pulse bg-red-500' : ''}`}
                        onClick={handleStartRecording}
                      >
                        <Mic className="h-6 w-6" />
                      </Button>
                      <p className="mt-2 text-xs text-sage-500">
                        {isRecording ? 'Đang ghi âm...' : 'Nhấn để bắt đầu'}
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Textarea 
                  placeholder="Hoặc gõ cảm xúc của bạn ở đây..."
                  className="flex-grow"
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              size="lg"
              className="mt-4 w-full py-6 text-lg font-medium"
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
      
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-sage-800 mb-3">Con hãy tạo tài khoản để lưu lại tiến độ nhé.</h3>
            <p className="text-sage-600 mb-6">Tạo tài khoản để lưu lại tất cả các trải nghiệm và nhận thêm nhiều lời dạy hữu ích.</p>
            
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
      
      <footer className="p-4 text-center text-sm text-sage-500">
        <p>Mỗi ngày một lời Phật dạy</p>
      </footer>
    </div>
  );
};

export default Home;
