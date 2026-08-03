import { useState, useEffect } from 'react';

export default function EnvelopeOpening({ onOpenComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRetrieving, setIsRetrieving] = useState(false);

  // Phase 1: Click -> Logo fades (1000ms)
  // Phase 2: After the logo is gone -> flaps retrieve/fly away
  useEffect(() => {
    if (isOpen) {
      const retrievalTimer = setTimeout(() => {
        setIsRetrieving(true);
      }, 1000);

      const finalTimer = setTimeout(() => {
        onOpenComplete();
      }, 4000);

      return () => {
        clearTimeout(retrievalTimer);
        clearTimeout(finalTimer);
      };
    }
  }, [isOpen, onOpenComplete]);

  const retrievalTransition = {
    transition: 'all 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none bg-transparent">
      <div
        className="relative w-full h-full pointer-events-auto cursor-pointer bg-transparent"
        style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
        onClick={() => {
          if (isOpen) return;
          // Fire the video/audio play() calls directly inside this click
          // handler — this is the most reliable moment for browsers to
          // treat it as a genuine user gesture and allow sound.
          document.querySelectorAll('video, audio').forEach((el) => {
            el.play().catch(() => {});
          });
          setIsOpen(true);
        }}
      >
        {/* LEFT FLAP */}
        <div
          className="absolute inset-0 z-40 bg-transparent"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: isRetrieving
              ? 'translate3d(-200vw, 0, -2000px)'
              : 'translate3d(-180px, 0, -20px)',
            ...retrievalTransition,
          }}
        >
          <img
            src="/envelop_new.png"
            className="w-full h-full object-contain object-center"
            style={{ transform: 'rotate(-90deg) scale(2.5)', transformOrigin: 'center' }}
            alt=""
          />
        </div>

        {/* RIGHT FLAP */}
        <div
          className="absolute inset-0 z-40 bg-transparent"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: isRetrieving
              ? 'translate3d(200vw, 0, -2000px)'
              : 'translate3d(180px, 0, -10px)',
            ...retrievalTransition,
          }}
        >
          <img
            src="/envelop_new.png"
            className="w-full h-full object-contain object-center"
            style={{ transform: 'rotate(90deg) scale(2.5)', transformOrigin: 'center' }}
            alt=""
          />
        </div>

        {/* BOTTOM FLAP */}
        <div
          className="absolute inset-0 z-50 bg-transparent"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: isRetrieving
              ? 'translate3d(0, 200vh, -2000px)'
              : 'translate3d(0, 200px, 0px)',
            ...retrievalTransition,
          }}
        >
          <img
            src="/envelop_new.png"
            className="w-full h-full object-contain object-center"
            style={{ transform: 'rotate(180deg) scale(3.2)', transformOrigin: 'center' }}
            alt=""
          />
        </div>

        {/* TOP FLAP */}
        <div
          className="absolute inset-0 z-[60] bg-transparent"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: isRetrieving
              ? 'translate3d(0, -200vh, -2000px)'
              : 'translate3d(0, -200px, 20px)',
            ...retrievalTransition,
          }}
        >
          <img
            src="/envelop_new.png"
            className="w-full h-full object-contain object-center"
            style={{ transform: 'scale(2.8)', transformOrigin: 'center' }}
            alt=""
          />
        </div>

        {/* WAX SEAL / LOGO */}
        {!isRetrieving && (
          <div
            className={`absolute top-1/2 left-1/2 z-[100] flex flex-col items-center justify-center transition-opacity duration-1000 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              pointerEvents: isOpen ? 'none' : 'auto',
              transform: 'translate(-50%, -50%) translate3d(0, 25px, 800px)',
            }}
          >
            <img src="/logo.png" className="w-32 h-32 object-contain drop-shadow-2xl" alt="" />
            <p
              className={`mt-6 text-stone-700 font-script text-2xl tracking-[0.05em] transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : 'animate-pulse'
              }`}
            >
              Click to open
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
