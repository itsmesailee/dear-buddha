
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, Clock, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

const CompanionResponse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reflectionData, setReflectionData] = useState<{
    reflectionType: string;
    text: string;
    emotion: string | null;
  } | null>(null);
  
  const [showSilenceTimer, setShowSilenceTimer] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [showDelayedWisdomOpt, setShowDelayedWisdomOpt] = useState(false);
  const [showIntentionInput, setShowIntentionInput] = useState(false);
  const [intention, setIntention] = useState("");
  const [wantDelayedWisdom, setWantDelayedWisdom] = useState(false);
  
  useEffect(() => {
    // Load reflection data from localStorage
    const storedData = localStorage.getItem('currentReflection');
    if (storedData) {
      setReflectionData(JSON.parse(storedData));
    } else {
      // If no data, redirect back to reflection page
      navigate('/reflect');
    }
  }, [navigate]);

  useEffect(() => {
    if (showSilenceTimer && secondsRemaining > 0) {
      const timer = setTimeout(() => {
        setSecondsRemaining(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showSilenceTimer && secondsRemaining === 0) {
      setShowSilenceTimer(false);
      setShowDelayedWisdomOpt(true);
    }
  }, [showSilenceTimer, secondsRemaining]);

  const getResponseMessage = () => {
    if (!reflectionData) return "";
    
    // Simple responses based on emotion
    const emotionResponses: Record<string, string> = {
      lonely: "It sounds like you're carrying a sense of isolation today. I'm sitting here with you in that feeling.",
      confused: "When the mind is clouded with confusion, sometimes just naming it can bring a moment of clarity.",
      grieving: "Grief touches us at the deepest level. I'm holding space for your experience of loss.",
      grateful: "Gratitude opens the heart. Your appreciation is like a gentle light.",
      angry: "Anger carries important energy. I notice the strength in what you're expressing.",
      joyful: "Joy is a beautiful visitor. I'm present with you in this moment of brightness.",
      disconnected: "That sense of disconnection is itself a form of connection - a recognition of what's missing."
    };
    
    // Default response based on reflection type if no emotion is selected
    const typeResponses: Record<string, string> = {
      share: "Thank you for sharing what's in your heart. I'm here, listening deeply.",
      question: "The questions we hold are like seeds of wisdom. I'm sitting with yours.",
      held: "Sometimes we don't need to know exactly what we feel. Just being present is enough."
    };
    
    return reflectionData.emotion && emotionResponses[reflectionData.emotion] 
      ? emotionResponses[reflectionData.emotion]
      : typeResponses[reflectionData.reflectionType];
  };

  const startSilence = (seconds: number) => {
    setShowSilenceTimer(true);
    setSecondsRemaining(seconds);
    // Play bell sound if available
    const bellSound = new Audio('/sounds/bell.mp3');
    bellSound.play().catch(error => {
      console.log('Audio playback error:', error);
    });
  };

  const handleSaveIntention = () => {
    if (intention.trim()) {
      // In a real app, save to database
      toast({
        title: "Intention saved",
        description: "Your intention has been saved to your journal"
      });
      
      // Navigate to home
      navigate('/wisdom-inbox');
    } else {
      toast({
        title: "Please enter an intention",
        variant: "destructive"
      });
    }
  };

  const handleCloseSession = () => {
    // If user opted in for delayed wisdom, save that preference
    if (wantDelayedWisdom) {
      // In a real app, this would trigger a backend process to send delayed wisdom
      toast({
        title: "Wisdom request received",
        description: "You may receive a response in a few hours or days."
      });
    }
    
    // Navigate home
    navigate('/wisdom-inbox');
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full">
        {reflectionData && (
          <>
            <Card className="mb-6 bg-white/80 backdrop-blur-sm border-sage-200">
              <CardContent className="p-6">
                <p className="text-sage-800 font-serif text-lg leading-relaxed">
                  {getResponseMessage()}
                </p>
              </CardContent>
            </Card>

            {!showSilenceTimer && !showDelayedWisdomOpt && !showIntentionInput && (
              <div className="space-y-4">
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => startSilence(15)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Sit in silence (15 seconds)
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => startSilence(30)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Sit in silence (30 seconds)
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => startSilence(60)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Sit in silence (60 seconds)
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowDelayedWisdomOpt(true)}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Gently close this moment
                </Button>
              </div>
            )}

            {showSilenceTimer && (
              <div className="text-center space-y-6">
                <div className="text-5xl font-light text-sage-800">{secondsRemaining}</div>
                <p className="text-sage-600">Breathe in... and out...</p>
                <div className="w-full bg-sage-200 rounded-full h-2.5">
                  <div 
                    className="bg-sage-500 h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${(secondsRemaining / (secondsRemaining === 0 ? 1 : secondsRemaining)) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {showDelayedWisdomOpt && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wisdom-opt-in" 
                      checked={wantDelayedWisdom}
                      onCheckedChange={(checked) => setWantDelayedWisdom(checked as boolean)}
                    />
                    <label 
                      htmlFor="wisdom-opt-in" 
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Would you like to receive a story or reflection later?
                    </label>
                  </div>
                  {wantDelayedWisdom && (
                    <p className="text-xs text-sage-600 pl-6">
                      You may receive a response in a few hours or days.
                    </p>
                  )}
                </div>

                <Button 
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowIntentionInput(true)}
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  Save this reflection and set an intention
                </Button>

                <Button 
                  className="w-full"
                  onClick={handleCloseSession}
                >
                  Close this session
                </Button>
              </div>
            )}

            {showIntentionInput && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-sage-700">
                  Would you like to set an intention based on this reflection?
                </p>
                
                <Textarea 
                  placeholder="My intention is..."
                  value={intention}
                  onChange={(e) => setIntention(e.target.value)}
                  className="min-h-[100px]"
                />
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowIntentionInput(false)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={handleSaveIntention}
                  >
                    Save intention
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompanionResponse;
