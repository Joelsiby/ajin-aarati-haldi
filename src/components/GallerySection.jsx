import React from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';

const MEMORIES = [
  {
    id: 1,
    title: 'The Haldi Rituals',
    tag: 'Yellow Bliss',
    gradient: 'from-amber-500/40 via-yellow-600/30 to-amber-950/70',
    desc: 'Fun, ubtan & splashes of laughter'
  },
  {
    id: 2,
    title: 'Mehendi & Sufi Melodies',
    tag: 'Henna Magic',
    gradient: 'from-emerald-600/40 via-teal-700/30 to-slate-950/70',
    desc: 'Traditional henna patterns & folk music'
  },
  {
    id: 3,
    title: 'The Sangeet Night',
    tag: 'Royal Sparkle',
    gradient: 'from-purple-600/40 via-rose-700/30 to-amber-950/70',
    desc: 'Dancing under golden chandeliers'
  },
  {
    id: 4,
    title: 'Eternal Sacred Vows',
    tag: 'Forever Love',
    gradient: 'from-rose-600/40 via-amber-600/30 to-rose-950/70',
    desc: 'Seven pheras & royal celebration'
  }
];

export default function GallerySection() {
  return (
    <section className="w-full my-8">
      <div className="text-center mb-6">
        <h2 className="font-script text-4xl text-amber-300">Moments & Memories</h2>
        <p className="font-serif text-xs text-amber-200/70 tracking-widest uppercase mt-1">
          ✦ Capturing The Golden Joy ✦
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MEMORIES.map((m) => (
          <div
            key={m.id}
            className="glass-card rounded-2xl overflow-hidden border border-amber-400/30 group relative aspect-[4/5] flex flex-col justify-end p-3 transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Background Aesthetic Gradient Card */}
            <div className={`absolute inset-0 bg-gradient-to-t ${m.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
            
            {/* Ornate Background Pattern Icon */}
            <div className="absolute top-3 right-3 text-amber-300/40">
              <Camera size={18} />
            </div>

            <div className="relative z-10 space-y-1">
              <span className="text-[10px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 inline-block">
                {m.tag}
              </span>
              <h3 className="font-serif text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {m.title}
              </h3>
              <p className="text-[11px] text-amber-100/70 font-sans leading-tight">
                {m.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
