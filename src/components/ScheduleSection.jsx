import React from 'react';
import { Sun, Sparkles, Music, Heart, MapPin } from 'lucide-react';

const EVENTS = [
  {
    id: 'haldi',
    title: 'Haldi Ceremony & Ubtan Ritual',
    subtitle: 'The Golden Glow of Celebration',
    date: 'Nov 27, 2026',
    time: '10:00 AM - 1:00 PM',
    venue: 'Royal Orchid Gardens, Poolside Lawn',
    dressCode: 'Sun Yellow / Golden Traditional',
    icon: Sun,
    color: 'from-amber-500 to-amber-600',
    details: 'Join us for flowers, turmeric paste, energetic dhol beats, and lots of laughter as we apply Haldi to the bride and groom.'
  },
  {
    id: 'mehendi',
    title: 'Mehendi & Floral Fair',
    subtitle: 'Intricate Henna & Folk Melodies',
    date: 'Nov 27, 2026',
    time: '4:00 PM Onwards',
    venue: 'Grand Pavilion',
    dressCode: 'Emerald Green / Floral Ethnic',
    icon: Sparkles,
    color: 'from-emerald-600 to-teal-700',
    details: 'Henna artists, street food stalls, bangle bars, and live acoustic sufi music.'
  },
  {
    id: 'sangeet',
    title: 'Grand Sangeet Night',
    subtitle: 'Dance, Drama & Royal Musical Night',
    date: 'Nov 27, 2026',
    time: '7:30 PM Onwards',
    venue: 'Imperial Ballroom',
    dressCode: 'Glitz & Glam / Indo-Western',
    icon: Music,
    color: 'from-rose-600 to-purple-800',
    details: 'Choreographed dance performances by family & friends followed by an electric DJ setup.'
  },
  {
    id: 'wedding',
    title: 'Pheras & Wedding Reception',
    subtitle: 'The Sacred Vows of Eternal Togetherness',
    date: 'Nov 28, 2026',
    time: '10:30 AM Muhurat',
    venue: 'The Palace Courtyard',
    dressCode: 'Royal Crimson & Cream Ethnic',
    icon: Heart,
    color: 'from-rose-700 to-amber-700',
    details: 'The auspicious Wedding Vows, Varmala, Traditional Feast, and Royal Doli Farewell.'
  }
];

export default function ScheduleSection() {
  return (
    <section className="w-full my-8">
      <div className="text-center mb-6">
        <h2 className="font-script text-4xl sm:text-5xl text-amber-300">
          Celebration Itinerary
        </h2>
        <p className="font-serif text-xs text-amber-200/70 tracking-widest uppercase mt-1">
          ✦ Join Us Across Four Sacred Events ✦
        </p>
      </div>

      <div className="space-y-4">
        {EVENTS.map((evt) => {
          const IconComp = evt.icon;
          return (
            <div 
              key={evt.id}
              className="glass-card rounded-2xl p-5 border border-amber-400/30 transition-all duration-300 hover:border-amber-400/70 hover:translate-y-[-2px] relative overflow-hidden group"
            >
              {/* Event Header Banner */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${evt.color} flex items-center justify-center text-white shadow-md border border-white/20`}>
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="font-script text-xl text-amber-300/90 leading-none">
                      {evt.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Meta Badges */}
              <div className="grid grid-cols-2 gap-2 text-xs font-serif my-3">
                <div className="bg-amber-950/40 p-2 rounded-lg border border-amber-500/20 text-amber-200 flex items-center space-x-2">
                  <span className="text-amber-400">📅</span>
                  <span>{evt.date} • {evt.time}</span>
                </div>
                <div className="bg-amber-950/40 p-2 rounded-lg border border-amber-500/20 text-amber-200 flex items-center space-x-2 truncate">
                  <MapPin size={12} className="text-amber-400 shrink-0" />
                  <span className="truncate">{evt.venue}</span>
                </div>
              </div>

              {/* Dress Code & Description */}
              <p className="text-xs text-slate-300 leading-relaxed my-2">
                {evt.details}
              </p>

              <div className="mt-3 pt-2 border-t border-amber-500/20 flex items-center justify-between text-[11px] text-amber-300 font-serif">
                <span className="text-amber-200/70">Dress Code:</span>
                <span className="font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300">
                  {evt.dressCode}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
