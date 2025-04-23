
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Mic, MessageSquare, Bookmark, Share2, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ActionInput from './ActionInput';

interface WisdomDisplayProps {
  wisdom: {
    quote: string;
    author: string;
  };
  onAskAgain: () => void;
  onSave: () => void;
  shareThoughts: boolean;
  setShareThoughts: (value: boolean) => void;
  showTodoInput: boolean;
  setShowTodoInput: (value: boolean) => void;
  reaction: string | null;
  setReaction: (value: string | null) => void;
}

const WisdomDisplay = ({
  wisdom,
  onAskAgain,
  onSave,
  shareThoughts,
  setShareThoughts,
  showTodoInput,
  setShowTodoInput,
  reaction,
  setReaction,
}: WisdomDisplayProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'voice' | 'text' | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = (platform: 'instagram' | 'facebook' | 'zalo') => {
    // Implement sharing logic here
    console.log(`Sharing to ${platform}`);
    setShowShareOptions(false);
  };

  return (
    <Card className="glass-card animate-fade-in relative overflow-hidden">
      <CardContent className="p-6">
        {/* Quote display section */}
        <div className="relative w-full h-64 mb-6">
          <img
            src="/lovable-uploads/caaf6f74-6849-47d2-8482-cbac0192a153.png"
            alt="Buddha statue"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 shadow-sm">
              <blockquote className="font-serif text-xl leading-relaxed text-sage-800 mb-3">
                "{wisdom.quote}"
              </blockquote>
              <p className="text-sage-600 italic text-sm">
                — {wisdom.author}
              </p>
            </div>
          </div>
        </div>

        {/* Emoji reactions */}
        <div className="text-center mb-6">
          <p className="text-sage-700 mb-3">Con cảm thấy thế nào sau khi nghe điều này?</p>
          <div className="flex justify-center gap-4">
            {["❤️", "😌", "😢", "😮"].map((emoji) => (
              <button
                key={emoji}
                onClick={() => setReaction(emoji)}
                className={`text-2xl p-2 rounded-full transition-transform ${
                  reaction === emoji ? 'scale-125 bg-sage-100' : ''
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main action buttons */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button 
            variant="outline"
            className="flex flex-col items-center gap-2 p-4 h-auto"
            onClick={() => setShowFeedback(!showFeedback)}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-sm">Respond</span>
          </Button>
          
          <Button 
            variant="outline"
            className="flex flex-col items-center gap-2 p-4 h-auto"
            onClick={onSave}
          >
            <Bookmark className="h-6 w-6" />
            <span className="text-sm">Save</span>
          </Button>

          <Button 
            variant="outline"
            className="flex flex-col items-center gap-2 p-4 h-auto"
            onClick={() => setShowShareOptions(!showShareOptions)}
          >
            <Share2 className="h-6 w-6" />
            <span className="text-sm">Share</span>
          </Button>
        </div>

        {/* Share options */}
        {showShareOptions && (
          <div className="bg-white/95 p-4 rounded-lg shadow-sm mb-6 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              <Button variant="ghost" onClick={() => handleShare('instagram')}>
                Instagram Story
              </Button>
              <Button variant="ghost" onClick={() => handleShare('facebook')}>
                Facebook
              </Button>
              <Button variant="ghost" onClick={() => handleShare('zalo')}>
                Zalo
              </Button>
            </div>
          </div>
        )}
        
        {/* Feedback section */}
        {showFeedback && (
          <div className="mt-6 animate-fade-in space-y-4">
            <Select 
              value={feedbackType || ''} 
              onValueChange={(value) => setFeedbackType(value as 'voice' | 'text')}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn cách phản hồi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voice">Ghi âm cảm nhận</SelectItem>
                <SelectItem value="text">Viết cảm nhận</SelectItem>
              </SelectContent>
            </Select>
            
            {feedbackType === 'voice' && (
              <div className="flex flex-col items-center gap-4">
                <Button 
                  variant="outline"
                  className="w-16 h-16 rounded-full"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className={`h-6 w-6 ${isRecording ? 'text-red-500' : ''}`} />
                </Button>
                {isRecording && <p className="text-sm text-sage-600">Đang ghi âm...</p>}
              </div>
            )}
            
            {feedbackType === 'text' && (
              <Textarea 
                placeholder="Chia sẻ cảm nghĩ của bạn..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="mb-3"
              />
            )}
            
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
            
            <Button
              className="w-full"
              onClick={() => setShowTodoInput(true)}
            >
              Tạo việc cần làm từ suy ngẫm này
            </Button>
          </div>
        )}

        {showTodoInput && (
          <ActionInput onSave={onSave} />
        )}

        {/* Subtle "Ask again" link */}
        <Button 
          variant="ghost" 
          size="sm"
          className="mt-6 text-sage-500 hover:text-sage-700 w-full flex items-center justify-center gap-2"
          onClick={onAskAgain}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Hỏi lại</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default WisdomDisplay;
