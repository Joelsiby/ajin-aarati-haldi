import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, MapPin } from 'lucide-react';

const VENUE_ADDRESS = "Unity Road, KRPA 75, Kochi, Kerala 682033, India";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/L4ikkEZ2dAnV9XvJ9";

export default function BackgroundVideo({ videoPath = "/background.mp4", musicPath = "/sitakalyana_music.mp3" }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
    audioRef.current?.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
  };

  const openMaps = () => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      window.open(`https://maps.apple.com/?q=${encodeURIComponent(VENUE_ADDRESS)}`, "_blank");
    } else {
      window.open(GOOGLE_MAPS_URL, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 w-full h-dvh overflow-hidden pointer-events-none z-0">
      {/* Background Video */}
      {!hasError ? (
        <video
          ref={videoRef}
          src={videoPath}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setHasError(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-rose-950 to-slate-950" />
      )}

      <audio
        ref={audioRef}
        src={musicPath}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Ceremony Title Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 -translate-y-8">
        <p className="font-['Parisienne'] text-4xl sm:text-5xl text-[#C9972B] leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
          Ajin & Aarati
        </p>
      </div>

      {/* Full-width Clickable Strip for Maps (Interactive pointer-events enabled) */}
      <button
        onClick={openMaps}
        aria-label="Open venue in Maps"
        style={{ height: '1cm', bottom: 'calc(1.5rem + 22px + 5.2cm)' }}
        className="fixed inset-x-0 z-50 flex items-center justify-end bg-transparent pointer-events-auto"
      >
        <span style={{ paddingRight: 'calc(1.5rem + 22px + 1.5cm)' }}>
          <MapPin size={18} className="text-amber-300" />
        </span>
      </button>

      {/* Floating Play/Pause Control (Interactive pointer-events enabled) */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto" style={{ transform: 'translate(-0.3cm, -0.1cm)' }}>
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.55) 0%, rgba(136, 19, 55, 0.7) 100%)' }}
          className="w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center text-amber-300 hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg border border-amber-400/60"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
