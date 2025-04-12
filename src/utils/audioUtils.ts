
/**
 * Plays a mindfulness bell sound
 * @param {string} phase - The breathing phase (inhale, inhaleHold, exhale, exhaleHold)
 * @returns A promise that resolves when the sound completes playing
 */
export const playMindfulnessBell = (phase: string = 'general'): Promise<void> => {
  return new Promise((resolve) => {
    // Bell sound URLs - using gentle bell sounds with slightly different tones for phases
    const bellSounds = {
      general: 'https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3',
      inhale: 'https://cdn.freesound.org/previews/414/414510_7256829-lq.mp3',
      inhaleHold: 'https://cdn.freesound.org/previews/339/339816_5121236-lq.mp3',
      exhale: 'https://cdn.freesound.org/previews/412/412017_5121236-lq.mp3',
      exhaleHold: 'https://cdn.freesound.org/previews/443/443368_6244629-lq.mp3'
    };
    
    const bellSoundUrl = bellSounds[phase as keyof typeof bellSounds] || bellSounds.general;
    const audio = new Audio(bellSoundUrl);
    
    audio.volume = 0.3; // Lower volume for gentler experience
    
    audio.onended = () => {
      resolve();
    };
    
    // Handles the case when the audio fails to load
    audio.onerror = () => {
      console.error('Failed to load mindfulness bell sound');
      resolve();
    };
    
    // Try to play the sound
    audio.play().catch((error) => {
      console.error('Error playing bell sound:', error);
      resolve(); // Resolve anyway to not block the flow
    });
  });
};
