
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Square, Play, Save, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Emotion } from '@/types/journal';

const EmotionSelector = ({ selected, onSelect }: { selected: Emotion | null, onSelect: (emotion: Emotion) => void }) => {
  const emotions: { type: Emotion, emoji: string, label: string }[] = [
    { type: 'peaceful', emoji: '😌', label: 'Bình yên' },
    { type: 'happy', emoji: '😊', label: 'Vui vẻ' },
    { type: 'neutral', emoji: '😐', label: 'Bình thường' },
    { type: 'sad', emoji: '😔', label: 'Buồn bã' },
    { type: 'anxious', emoji: '😟', label: 'Lo lắng' },
  ];
  
  return (
    <div className="flex justify-center gap-3 mb-6">
      {emotions.map((emotion) => (
        <button
          key={emotion.type}
          onClick={() => onSelect(emotion.type)}
          className={`flex flex-col items-center p-2 rounded-lg transition-all ${
            selected === emotion.type 
              ? 'bg-sage-100 scale-110' 
              : 'hover:bg-sage-50'
          }`}
        >
          <span className="text-2xl mb-1">{emotion.emoji}</span>
          <span className="text-xs text-sage-600">{emotion.label}</span>
        </button>
      ))}
    </div>
  );
};

const Journal = () => {
  const [journalText, setJournalText] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Không thể truy cập micro",
        description: "Vui lòng cho phép truy cập microphone để ghi âm.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks on the stream
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
  };
  
  const playAudio = () => {
    if (audioURL && audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.pause();
        setIsPlaying(false);
      } else {
        audioPlayerRef.current.play();
        setIsPlaying(true);
        audioPlayerRef.current.onended = () => setIsPlaying(false);
      }
    }
  };
  
  const handleSubmit = () => {
    if ((!journalText && !audioURL) || !selectedEmotion) {
      toast({
        title: "Vui lòng chia sẻ cảm xúc",
        description: "Hãy viết hoặc ghi âm suy nghĩ của bạn và chọn cảm xúc.",
        variant: "destructive"
      });
      return;
    }
    
    // Create a random ID for the entry
    const entryId = Math.random().toString(36).substring(2, 10);
    
    // Create journal entry
    const journalEntry = {
      id: entryId,
      content: journalText,
      emotion: selectedEmotion,
      timestamp: new Date().toISOString(),
      audioUrl: audioURL || undefined
    };
    
    // Save to local storage
    const existingEntries = localStorage.getItem('hoiphat_journal') 
      ? JSON.parse(localStorage.getItem('hoiphat_journal') || '[]')
      : [];
    
    localStorage.setItem('hoiphat_journal', JSON.stringify([journalEntry, ...existingEntries]));
    
    // Navigate to wisdom result page
    navigate(`/wisdom-result/${entryId}`);
  };
  
  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      {/* Header */}
      <header className="p-4 text-center">
        <h1 className="text-2xl font-serif font-medium text-sage-800">Suy ngẫm hàng ngày</h1>
      </header>
      
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        <Card className="glass-card mb-6">
          <CardContent className="p-6">
            <h2 className="font-serif text-xl text-center mb-6">
              Hôm nay con cảm thấy thế nào?
            </h2>
            
            <EmotionSelector 
              selected={selectedEmotion} 
              onSelect={setSelectedEmotion} 
            />
            
            <Textarea
              placeholder="Chia sẻ suy nghĩ của bạn..."
              className="min-h-[120px] mb-6"
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
            />
            
            <div className="mb-6">
              <p className="text-center text-sm text-sage-600 mb-2">
                Hoặc ghi âm giọng nói của bạn
              </p>
              <div className="flex justify-center gap-3">
                {!isRecording && !audioURL && (
                  <Button 
                    variant="outline" 
                    onClick={startRecording}
                    className="flex-1 bg-white"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    Ghi âm
                  </Button>
                )}
                
                {isRecording && (
                  <Button 
                    variant="outline" 
                    onClick={stopRecording}
                    className="flex-1 bg-white text-red-500 border-red-200 animate-pulse"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Dừng ghi âm
                  </Button>
                )}
                
                {audioURL && (
                  <Button 
                    variant="outline"
                    onClick={playAudio}
                    className="flex-1 bg-white"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {isPlaying ? 'Đang phát...' : 'Phát lại'}
                  </Button>
                )}
              </div>
              
              {/* Hidden audio element for playback */}
              {audioURL && (
                <audio ref={audioPlayerRef} src={audioURL} className="hidden" />
              )}
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => navigate('/')}
              >
                Quay lại
              </Button>
              <Button 
                className="flex-1"
                onClick={handleSubmit}
              >
                <Save className="h-4 w-4 mr-2" />
                Gửi
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

export default Journal;
