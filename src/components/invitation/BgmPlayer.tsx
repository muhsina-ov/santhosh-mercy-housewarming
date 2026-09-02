import { useEffect, useRef, useState } from "react";

interface BgmPlayerProps {
  autoPlayTrigger?: boolean;
}

export function BgmPlayer({ autoPlayTrigger }: BgmPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.75;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay blocked without user interaction
          });
      }
    }
  }, [autoPlayTrigger, isPlaying]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.75;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((e) => {
          console.error("Audio playback error:", e);
        });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="auto"
      />
      <div className="fixed top-4 right-4 z-50">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
          title={isPlaying ? "இசையை நிறுத்த (Mute BGM)" : "இசையை இயக்க (Play BGM)"}
          className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-gold/80 bg-navy/90 text-gold shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 ${
            isPlaying ? "gold-glow-pulse" : "opacity-80 hover:opacity-100"
          }`}
        >
          {isPlaying ? (
            <svg
              className="h-5 w-5 animate-spin"
              style={{ animationDuration: "5s" }}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.73l4.73 4.73c-.24.08-.48.14-.73.14-2.21 0-4-1.79-4-4V9.27l6.73 6.73 1.27-1.27L4.27 3zM12 7V3h6v4h-4v3.73l2 2V7h-4z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
