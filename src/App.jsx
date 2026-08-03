import { useEffect, useState, useCallback } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import EnvelopeOpening from './components/EnvelopeOpening';

export default function App() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);

  const handleEnvelopeComplete = useCallback(() => {
    setShowEnvelope(false);
  }, []);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
//test
  if (isDesktop) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0c0814] text-center px-6">
        <p className="font-serif text-lg text-amber-100/90 tracking-wide">
          Please open this website on your mobile device.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative bg-[#0c0814]">
      <BackgroundVideo videoPath="/background.mp4" />
      {showEnvelope && <EnvelopeOpening onOpenComplete={handleEnvelopeComplete} />}
    </div>
  );
}
