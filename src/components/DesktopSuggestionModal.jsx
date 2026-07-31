import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, X, Sparkles, Monitor, RotateCcw } from 'lucide-react';

export default function DesktopSuggestionModal({ onToggleMobileFrame, isMobileFrame }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);

    const checkDesktop = () => {
      // Standard mobile width threshold (768px or landscape touch checking)
      const desktopView = window.innerWidth > 768;
      setIsDesktop(desktopView);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!isDesktop || isDismissed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-lg w-full glass-card border-2 border-amber-400/50 rounded-3xl p-8 text-center shadow-2xl overflow-hidden">
        {/* Decorative Golden Floral Top Accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-amber-400/20 to-transparent blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-200/70 hover:text-amber-200 hover:bg-amber-500/10 transition-colors"
          title="Dismiss banner"
        >
          <X size={20} />
        </button>

        {/* Golden Emblem Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-amber-300/30 flex items-center justify-center border border-amber-400/40 text-amber-300 shadow-inner">
          <Smartphone size={32} className="animate-bounce" />
        </div>

        {/* Wedding Font Heading */}
        <h2 className="font-script text-5xl md:text-6xl text-amber-300 mb-2 font-normal leading-tight drop-shadow-md">
          A Mobile Wedding Invitation
        </h2>

        <p className="font-serif text-lg text-amber-100/90 tracking-wide mb-4">
          ✤ Designed specially for your Smartphone ✤
        </p>

        {/* Suggestion Body text in Wedding Script Font */}
        <div className="my-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
          <p className="font-script text-3xl md:text-4xl text-amber-200 leading-snug">
            "For the most magical and intimate wedding celebration experience, we kindly invite you to view this website on your mobile phone."
          </p>
        </div>

        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center my-6 space-y-3">
          <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-amber-400/60 inline-block">
            <QRCodeSVG 
              value={currentUrl} 
              size={140}
              bgColor="#ffffff"
              fgColor="#450A0A"
              level="H"
            />
          </div>
          <span className="text-xs font-serif text-amber-200/80 tracking-widest uppercase flex items-center space-x-1">
            <Sparkles size={12} className="text-amber-400 inline mr-1" />
            Scan to open on your Phone
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <button
            onClick={onToggleMobileFrame}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold shadow-lg transition-transform active:scale-95 border border-amber-300/40"
          >
            {isMobileFrame ? (
              <>
                <Monitor size={16} />
                <span>Exit Mobile Frame</span>
              </>
            ) : (
              <>
                <Smartphone size={16} />
                <span>View Mobile Frame</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="w-full py-3 px-4 rounded-xl font-medium text-sm text-amber-200 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/30 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Continue on Desktop</span>
          </button>
        </div>
      </div>
    </div>
  );
}
