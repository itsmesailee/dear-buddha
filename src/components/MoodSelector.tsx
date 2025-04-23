
import React from 'react';
import { Button } from "@/components/ui/button";

const INTENTS = [
  { value: "calm", label: "Bình yên", emoji: "😌" },
  { value: "insight", label: "Hiểu biết", emoji: "💡" },
  { value: "gratitude", label: "Biết ơn", emoji: "🙏" },
  { value: "confusion", label: "Hoang mang", emoji: "😕" },
];

interface MoodSelectorProps {
  selectedIntent: string | null;
  onSelect: (intent: string) => void;
}

const MoodSelector = ({ selectedIntent, onSelect }: MoodSelectorProps) => {
  return (
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
          onClick={() => onSelect(intent.value)}
        >
          <span className="text-2xl">{intent.emoji}</span>
          <span>{intent.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;
