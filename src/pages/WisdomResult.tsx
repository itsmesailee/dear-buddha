import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, BookMarked, Share2, Bell, Volume2, Plus, ExternalLink, ThumbsUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { JournalEntry, BuddhistWisdom, Emotion } from '@/types/journal';
import { generateBuddhistWisdom } from '@/lib/wisdom';

// Sample community reflections 
const COMMUNITY_REFLECTIONS = [
  { emotion: 'peaceful', reflection: "Tôi cảm thấy bình yên khi dành thời gian thiền mỗi sáng sớm." },
  { emotion: 'peaceful', reflection: "Hôm nay tôi học được cách buông bỏ những suy nghĩ tiêu cực." },
  { emotion: 'happy', reflection: "Tôi cảm thấy vui khi giúp đỡ một người bạn vượt qua khó khăn." },
  { emotion: 'happy', reflection: "Hôm nay là một ngày tuyệt vời khi tôi đạt được mục tiêu cá nhân." },
  { emotion: 'neutral', reflection: "Tôi đang cố gắng giữ bình tĩnh trước những thay đổi." },
  { emotion: 'neutral', reflection: "Tôi không cảm thấy quá vui hay buồn, chỉ đang sống trong hiện tại." },
  { emotion: 'sad', reflection: "Tôi đang học cách chấp nhận nỗi buồn như một phần của cuộc sống." },
  { emotion: 'sad', reflection: "Hôm nay tôi cảm thấy buồn, nhưng biết rằng cảm xúc này sẽ qua đi." },
  { emotion: 'anxious', reflection: "Tôi đang cố gắng thực hành chánh niệm để giảm lo lắng." },
  { emotion: 'anxious', reflection: "Tôi học cách thở sâu mỗi khi cảm thấy lo âu." },
];

const WisdomResult = () => {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);
  const [wisdom, setWisdom] = useState<BuddhistWisdom | null>(null);
  const [isPlayingBell, setIsPlayingBell] = useState(false);
  const [isPlayingQuote, setIsPlayingQuote] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [communityReflections, setCommunityReflections] = useState<string[]>([]);
  const [emotionStats, setEmotionStats] = useState<Record<Emotion, number>>({
    peaceful: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    anxious: 0
  });
  const [coins, setCoins] = useState(0);
  const [showEarnedCoins, setShowEarnedCoins] = useState(false);
  
  const bellAudio = new Audio('/sounds/bell.mp3'); // You'll need to add this sound file

  useEffect(() => {
    // Load journal entry
    const journalData = localStorage.getItem('hoiphat_journal');
    if (journalData) {
      const entries: JournalEntry[] = JSON.parse(journalData);
      const entry = entries.find(e => e.id === entryId);
      if (entry) {
        setJournalEntry(entry);
        
        // Generate wisdom based on entry emotion
        const generatedWisdom = generateBuddhistWisdom(entry.emotion);
        setWisdom(generatedWisdom);
        
        // Get community reflections with same emotion
        const relevantReflections = COMMUNITY_REFLECTIONS
          .filter(r => r.emotion === entry.emotion)
          .map(r => r.reflection);
        
        // Choose 2 random reflections
        const selectedReflections = relevantReflections
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        
        setCommunityReflections(selectedReflections);
        
        // Calculate emotion stats
        calculateEmotionStats();
      }
    }
    
    // Load coins
    const savedCoins = localStorage.getItem('hoiphat_coins');
    if (savedCoins) {
      setCoins(parseInt(savedCoins));
    }
    
    // Play bell sound on load
    playBellSound();
  }, [entryId]);
  
  const calculateEmotionStats = () => {
    const journalData = localStorage.getItem('hoiphat_journal');
    if (journalData) {
      const entries: JournalEntry[] = JSON.parse(journalData);
      
      // Count emotions in the last 7 days
      const lastWeekEntries = entries.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return entryDate >= weekAgo;
      });
      
      // Count occurrences of each emotion
      const stats: Record<Emotion, number> = {
        peaceful: 0,
        happy: 0,
        neutral: 0,
        sad: 0,
        anxious: 0
      };
      
      lastWeekEntries.forEach(entry => {
        if (entry.emotion) {
          stats[entry.emotion] += 1;
        }
      });
      
      setEmotionStats(stats);
    }
  };
  
  const playBellSound = () => {
    if (!isPlayingBell) {
      bellAudio.play();
      setIsPlayingBell(true);
      bellAudio.onended = () => setIsPlayingBell(false);
    } else {
      bellAudio.pause();
      bellAudio.currentTime = 0;
      setIsPlayingBell(false);
    }
  };
  
  const playQuoteAudio = () => {
    if (!wisdom) return;
    
    if (!isPlayingQuote) {
      // Use browser's speech synthesis
      const utterance = new SpeechSynthesisUtterance(wisdom.quote);
      utterance.lang = 'vi-VN';
      speechSynthesis.speak(utterance);
      setIsPlayingQuote(true);
      
      utterance.onend = () => setIsPlayingQuote(false);
    } else {
      speechSynthesis.cancel();
      setIsPlayingQuote(false);
    }
  };
  
  const saveWisdom = () => {
    if (!wisdom || !journalEntry) return;
    
    // Get existing saved wisdom
    const savedWisdomStr = localStorage.getItem('hoiphat_saved_wisdom');
    const savedWisdom = savedWisdomStr ? JSON.parse(savedWisdomStr) : [];
    
    // Add new wisdom to the beginning, keep only the latest 5
    const updatedWisdom = [
      {...wisdom, savedAt: new Date().toISOString(), journalEntryId: journalEntry.id},
      ...savedWisdom
    ].slice(0, 10);
    
    localStorage.setItem('hoiphat_saved_wisdom', JSON.stringify(updatedWisdom));
    
    toast({
      title: "Đã lưu lời Phật dạy",
      description: "Bạn có thể xem lại trong phần Lời dạy đã lưu."
    });
  };
  
  const shareWithCommunity = () => {
    if (!journalEntry) return;
    
    // Update journal entry
    const journalData = localStorage.getItem('hoiphat_journal');
    if (journalData) {
      const entries: JournalEntry[] = JSON.parse(journalData);
      const updatedEntries = entries.map(entry => 
        entry.id === journalEntry.id 
          ? { ...entry, isShared: true }
          : entry
      );
      
      localStorage.setItem('hoiphat_journal', JSON.stringify(updatedEntries));
      setIsShared(true);
      
      // Add coins as reward
      const newCoins = coins + 2;
      setCoins(newCoins);
      localStorage.setItem('hoiphat_coins', newCoins.toString());
      
      // Show coin reward notification
      setShowEarnedCoins(true);
      setTimeout(() => setShowEarnedCoins(false), 3000);
      
      toast({
        title: "Cảm ơn bạn đã chia sẻ",
        description: "Câu chuyện của bạn sẽ giúp những người khác không cảm thấy cô đơn."
      });
    }
  };
  
  if (!journalEntry || !wisdom) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sage-50">
        <div className="lotus-loader text-4xl">🪷</div>
      </div>
    );
  }
  
  // Get emoji for the emotion
  const getEmotionEmoji = (emotion: Emotion) => {
    const emotionMap: Record<Emotion, string> = {
      peaceful: '😌',
      happy: '😊',
      neutral: '😐',
      sad: '😔',
      anxious: '😟'
    };
    return emotionMap[emotion] || '🪷';
  };
  
  // Get text for emotion stats
  const getEmotionStatsText = () => {
    const emotion = journalEntry.emotion;
    const count = emotionStats[emotion];
    
    if (count <= 1) return null;
    
    return `Bạn đã cảm thấy ${emotion === 'peaceful' ? 'bình yên' : 
      emotion === 'happy' ? 'vui vẻ' :
      emotion === 'neutral' ? 'bình thường' :
      emotion === 'sad' ? 'buồn bã' :
      'lo lắng'} ${count} lần trong tuần này.`;
  };
  
  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-serif font-medium text-sage-800">Tuệ Giác</h1>
        <div className="flex items-center">
          <span className="text-sm text-sage-600">{coins}</span>
          <span className="ml-1 text-lg">🪙</span>
        </div>
      </header>
      
      {showEarnedCoins && (
        <div className="fixed top-16 right-4 bg-saffron-100 border border-saffron-200 rounded-lg p-3 shadow-md animate-fade-in">
          <div className="flex items-center">
            <span className="text-lg mr-2">🪙</span>
            <div>
              <p className="text-sm font-medium text-saffron-800">+2 xu</p>
              <p className="text-xs text-saffron-600">Cảm ơn bạn đã chia sẻ</p>
            </div>
          </div>
        </div>
      )}
      
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {/* Wisdom Card */}
        <Card className="glass-card mb-6 overflow-hidden">
          <div className="bg-sage-100 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-lg mr-2">
                {getEmotionEmoji(journalEntry.emotion)}
              </span>
              <span className="text-sm text-sage-600">
                Trí tuệ dành cho bạn
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sage-500 hover:text-primary"
              onClick={playBellSound}
            >
              <Bell className={`h-4 w-4 ${isPlayingBell ? 'animate-pulse' : ''}`} />
            </Button>
          </div>
          
          <CardContent className="p-6">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-sage-100 flex items-center justify-center">
                <span className="text-3xl">🪷</span>
              </div>
            </div>
            
            <blockquote className="font-serif text-xl leading-relaxed text-sage-800 mb-4 text-center">
              "{wisdom.quote}"
            </blockquote>
            
            <p className="text-right text-sage-600 italic text-sm mb-6">
              — {wisdom.source}
            </p>
            
            <div className="bg-sage-50/50 p-4 rounded-lg border border-sage-100 mb-6">
              <h3 className="font-medium mb-2 text-sage-700">Kinh giải thích:</h3>
              <p className="text-sage-600">{wisdom.context}</p>
              
              {wisdom.sourceLink && (
                <a 
                  href={wisdom.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-primary hover:underline mt-3"
                >
                  Đọc thêm về Kinh này
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
            </div>
            
            {/* Emotion stats */}
            {getEmotionStatsText() && (
              <div className="bg-sage-50/50 p-4 rounded-lg border border-sage-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getEmotionEmoji(journalEntry.emotion)}
                  </span>
                  <p className="text-sm text-sage-600">
                    {getEmotionStatsText()}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex gap-3 mb-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={playQuoteAudio}
              >
                <Volume2 className={`h-4 w-4 mr-2 ${isPlayingQuote ? 'animate-pulse' : ''}`} />
                {isPlayingQuote ? 'Đang đọc...' : 'Nghe đọc'}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={saveWisdom}
              >
                <BookMarked className="h-4 w-4 mr-2" />
                Lưu lại
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Community Card */}
        <Card className="glass-card mb-6">
          <CardContent className="p-6">
            <h3 className="font-serif text-lg text-sage-800 mb-4 text-center">
              Con không hề đơn độc
            </h3>
            
            <div className="space-y-3 mb-6">
              {communityReflections.map((reflection, index) => (
                <div 
                  key={index} 
                  className="bg-white/50 border border-sage-100 rounded-lg p-3"
                >
                  <div className="flex items-start">
                    <span className="text-lg mr-2 mt-1">
                      {getEmotionEmoji(journalEntry.emotion)}
                    </span>
                    <p className="text-sm text-sage-700">{reflection}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-sage-100 pt-4">
              <p className="text-sm text-sage-600 text-center mb-4">
                Chia sẻ cảm xúc của bạn để giúp đỡ người khác
              </p>
              
              <Button 
                variant={isShared ? "secondary" : "default"} 
                className="w-full"
                onClick={shareWithCommunity}
                disabled={isShared}
              >
                {isShared ? (
                  <>
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Đã chia sẻ
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia sẻ câu chuyện của con
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Premium Features Card */}
        <Card className="glass-card mb-6 border border-saffron-200 bg-gradient-to-br from-white to-saffron-50">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg text-sage-800">
                Tính năng Cao cấp
              </h3>
              <div className="flex items-center">
                <span className="text-sm text-sage-600">{coins}</span>
                <span className="ml-1 text-lg">🪙</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="bg-white/80 border border-sage-100 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🧘‍♂️</span>
                  <div>
                    <p className="text-sm font-medium text-sage-800">Hướng dẫn thiền</p>
                    <p className="text-xs text-sage-600">10 bài thiền có hướng dẫn</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white"
                >
                  5 🪙
                </Button>
              </div>
              
              <div className="bg-white/80 border border-sage-100 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-2">📚</span>
                  <div>
                    <p className="text-sm font-medium text-sage-800">Thư viện kinh sách</p>
                    <p className="text-xs text-sage-600">Truy cập toàn bộ kinh điển</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white"
                >
                  10 🪙
                </Button>
              </div>
            </div>
            
            <div className="border-t border-sage-100 pt-4">
              <p className="text-sm text-sage-600 text-center mb-4">
                Kiếm thêm xu bằng cách mời bạn hoặc xem quảng cáo
              </p>
              
              <Button 
                variant="outline"
                className="w-full bg-white border-sage-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                Kiếm thêm xu
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Footer */}
      <footer className="p-4 text-center text-sm text-sage-500">
        <p>Mỗi ngày một lời Phật dạy</p>
      </footer>
    </div>
  );
};

export default WisdomResult;
