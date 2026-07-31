import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Heart } from 'lucide-react';

export default function CountdownTimer({ targetDate = "2026-11-28T10:00:00" }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    let time = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full my-6">
      <div className="glass-card-gold rounded-3xl p-6 text-center shadow-xl relative overflow-hidden border border-amber-400/40">
        <div className="flex items-center justify-center space-x-2 mb-3 text-amber-300">
          <Heart size={16} className="fill-amber-400 text-amber-400 animate-pulse" />
          <span className="font-serif text-sm uppercase tracking-widest text-amber-200/90 font-bold">
            Counting Down To The Celebration
          </span>
          <Heart size={16} className="fill-amber-400 text-amber-400 animate-pulse" />
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3 my-4">
          <div className="flex flex-col items-center bg-amber-950/40 rounded-2xl p-2 sm:p-3 border border-amber-500/20">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-serif uppercase text-amber-200/70 tracking-wider">Days</span>
          </div>

          <div className="flex flex-col items-center bg-amber-950/40 rounded-2xl p-2 sm:p-3 border border-amber-500/20">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-serif uppercase text-amber-200/70 tracking-wider">Hours</span>
          </div>

          <div className="flex flex-col items-center bg-amber-950/40 rounded-2xl p-2 sm:p-3 border border-amber-500/20">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-serif uppercase text-amber-200/70 tracking-wider">Mins</span>
          </div>

          <div className="flex flex-col items-center bg-amber-950/40 rounded-2xl p-2 sm:p-3 border border-amber-500/20">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-serif uppercase text-amber-200/70 tracking-wider">Secs</span>
          </div>
        </div>

        <div className="text-xs text-amber-200/80 font-serif flex items-center justify-center space-x-2 pt-2 border-t border-amber-500/20">
          <Calendar size={13} className="text-amber-400" />
          <span>Saturday, November 28, 2026</span>
          <span className="text-amber-400">•</span>
          <Clock size={13} className="text-amber-400" />
          <span>10:00 AM Onwards</span>
        </div>
      </div>
    </div>
  );
}
