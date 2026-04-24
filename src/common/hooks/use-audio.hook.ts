import { useCallback, useRef, useEffect } from 'react';

const useAudio = (src: string) => {
  const audioRef = useRef<any>(null);

  // Inicialize the audio object when the component mounts and clean it up when it unmounts
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
      // eslint-disable-next-line no-undef
      audioRef.current = new Audio(src);
    }

    // Cleanup: pause the audio and release resources when the component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, [src]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Restart the audio from the beginning
      audioRef.current.play().catch((error: Error) => {
        console.error('Error playing audio:', error);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  return { play, pause };
};

export default useAudio;
