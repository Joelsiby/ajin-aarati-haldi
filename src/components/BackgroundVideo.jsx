import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const VENUE_ADDRESS = "Unity Road, KRPA 75, Kochi, Kerala 682033, India";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/L4ikkEZ2dAnV9XvJ9";

export default function BackgroundVideo({ videoPath = "/background.mp4", musicPath = "/man_mast_magan.mp3" }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Chrome evaluates autoplay eligibility as soon as the <video> node is
  // created — a useEffect (which fires after that) can be too late to set
  // `muted`, so this callback ref sets it in the same synchronous tick the
  // node is attached, before playback is ever attempted.
  const setVideoRef = (el) => {
    videoRef.current = el;
    if (el) {
      el.muted = true;
      el.play().catch(() => {});
    }
  };

  useEffect(() => {
    audioRef.current?.play().catch(() => {});

    // Browsers can block autoplay outright until the user interacts with the
    // page at all. Retry both silently on the very first tap/touch anywhere.
    const startMediaOnFirstInteraction = () => {
      if (videoRef.current?.paused) {
        videoRef.current.play().catch(() => {});
      }
      if (!userPausedRef.current && audioRef.current?.paused) {
        audioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('pointerdown', startMediaOnFirstInteraction, { once: true });
    window.addEventListener('touchstart', startMediaOnFirstInteraction, { once: true });

    // Resume playback when returning to the tab (e.g. after opening Maps).
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') return;
      videoRef.current?.play().catch(() => {});
      if (!userPausedRef.current) {
        audioRef.current?.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('pointerdown', startMediaOnFirstInteraction);
      window.removeEventListener('touchstart', startMediaOnFirstInteraction);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (audioRef.current?.paused) {
      userPausedRef.current = false;
      audioRef.current.play().catch(() => {});
    } else {
      userPausedRef.current = true;
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
    <div
      onClick={openMaps}
      role="button"
      aria-label="Open venue in Maps"
      className="fixed inset-0 w-full h-dvh overflow-hidden pointer-events-auto z-0"
    >
      {/* Background Video */}
      {!hasError ? (
        <video
          ref={setVideoRef}
          src={videoPath}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={() => setHasError(true)}
          onPause={() => videoRef.current?.play().catch(() => {})}
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
