
/**
 * Plays a mindfulness bell sound
 * @returns A promise that resolves when the sound completes playing
 */
export const playMindfulnessBell = (): Promise<void> => {
  return new Promise((resolve) => {
    // Bell sound URL - using a gentle bell sound
    const bellSoundUrl = 'https://cdn.freesound.org/previews/411/411089_5121236-lq.mp3';
    const audio = new Audio(bellSoundUrl);
    
    audio.volume = 0.5; // Set appropriate volume
    
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
