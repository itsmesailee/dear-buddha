
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ReflectionInput = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [userText, setUserText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const reflectionOptions = [
    {
      id: 'share',
      title: 'I want to share what\'s on my heart',
      description: 'Express your feelings and thoughts openly'
    },
    {
      id: 'question',
      title: 'I\'m holding a question or feeling',
      description: 'Explore a specific inquiry or emotion'
    },
    {
      id: 'held',
      title: 'I don\'t know what I feel, but I\'d like to be held',
      description: 'Simply be present with whatever arises'
    }
  ];

  const emotionTags = [
    { id: 'lonely', label: 'Lonely' },
    { id: 'confused', label: 'Confused' },
    { id: 'grieving', label: 'Grieving' },
    { id: 'grateful', label: 'Grateful' },
    { id: 'angry', label: 'Angry' },
    { id: 'joyful', label: 'Joyful' },
    { id: 'disconnected', label: 'Disconnected' }
  ];

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedIntent) {
      toast({
        title: "Please select a reflection type",
        description: "Choose one of the options to continue",
        variant: "destructive"
      });
      return;
    }

    // Store the reflection data to pass to the next screen
    const reflectionData = {
      reflectionType: selectedIntent,
      text: userText,
      emotion: selectedEmotion
    };

    // Save to localStorage for now (in a real app, this might be stored in a database)
    localStorage.setItem('currentReflection', JSON.stringify(reflectionData));
    
    // Navigate to companion response
    navigate('/companion');
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      <div className="flex-1 flex flex-col p-6 max-w-md mx-auto w-full">
        <h1 className="font-serif text-2xl text-sage-800 mb-6 text-center">What's alive in you today?</h1>
        
        <div className="space-y-4 mb-8">
          {reflectionOptions.map(option => (
            <Card
              key={option.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedIntent === option.id 
                  ? 'border-sage-500 bg-sage-50' 
                  : 'border-sage-200 hover:border-sage-300'
              }`}
              onClick={() => setSelectedIntent(option.id)}
            >
              <h3 className="font-medium text-sage-800">{option.title}</h3>
              <p className="text-sm text-sage-600">{option.description}</p>
            </Card>
          ))}
        </div>

        {selectedIntent && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-4">
              <Button 
                variant="outline" 
                className="w-16 h-16 rounded-full"
                onClick={() => setIsRecording(!isRecording)}
              >
                <Mic className={`h-6 w-6 ${isRecording ? 'text-red-500' : ''}`} />
              </Button>
              {isRecording && <p className="text-sm text-sage-600 mt-2">Recording...</p>}
            </div>
            
            <Textarea 
              placeholder="Dear Buddha, today I feel..."
              className="min-h-[150px] resize-none"
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
            />

            <div className="space-y-3">
              <p className="text-sm text-sage-700">How would you describe your emotional state? (Optional)</p>
              <div className="flex flex-wrap gap-2">
                {emotionTags.map(emotion => (
                  <Button
                    key={emotion.id}
                    variant="outline"
                    size="sm"
                    className={`rounded-full ${
                      selectedEmotion === emotion.id 
                        ? 'bg-sage-200 border-sage-400' 
                        : ''
                    }`}
                    onClick={() => setSelectedEmotion(emotion.id)}
                  >
                    {emotion.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={handleSubmit}
            >
              Share
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReflectionInput;
