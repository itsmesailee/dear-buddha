
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, ListTodo } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [feedbackText, setFeedbackText] = useState("");

  return (
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
        
        <div className="flex items-center justify-between gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onAskAgain}
          >
            Hỏi lại
          </Button>
          
          <Button 
            variant="ghost"
            size="icon"
            className="text-red-400 hover:text-red-500 hover:bg-red-50"
            onClick={onSave}
          >
            <Heart className="h-5 w-5" />
          </Button>
          
          <Button 
            className="flex-1"
            onClick={() => setShowFeedback(!showFeedback)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Phản hồi
          </Button>

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setShowTodoInput(!showTodoInput)}
          >
            <ListTodo className="mr-2 h-4 w-4" />
            Tạo việc cần làm
          </Button>
        </div>
        
        {showFeedback && (
          <div className="mt-6 animate-fade-in space-y-4">
            <Textarea 
              placeholder="Chia sẻ cảm nghĩ của bạn..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="mb-3"
            />
            
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
              onClick={onSave}
            >
              Lưu phản hồi
            </Button>
          </div>
        )}

        {showTodoInput && (
          <ActionInput onSave={onSave} />
        )}
      </CardContent>
    </Card>
  );
};

export default WisdomDisplay;
