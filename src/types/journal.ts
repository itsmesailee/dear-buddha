
export type Emotion = 'peaceful' | 'happy' | 'neutral' | 'sad' | 'anxious';

export interface JournalEntry {
  id: string;
  content: string;
  emotion: Emotion;
  timestamp: string;
  audioUrl?: string;
  isShared?: boolean;
}

export interface BuddhistWisdom {
  quote: string;
  context: string;
  source: string;
  sourceLink?: string;
}
