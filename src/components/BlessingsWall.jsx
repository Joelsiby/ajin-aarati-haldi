import React, { useState } from 'react';
import { Heart, MessageCircle, Sparkles, Send } from 'lucide-react';

const INITIAL_WISHES = [
  {
    id: 1,
    name: 'Uncle Rajesh & Aunty Sunita',
    wish: 'May your love blossom brighter each day! Can’t wait for the Haldi celebration and dhol dance!',
    time: '2 hours ago'
  },
  {
    id: 2,
    name: 'Kavya & Rohan',
    wish: 'Wishing Ananya & Rohan a lifetime of endless laughter, joy, and delicious treats! Bring on the Haldi!',
    time: '5 hours ago'
  },
  {
    id: 3,
    name: 'Siddharth (Best Man)',
    wish: 'Ready to turn Rohan completely yellow at the Haldi ceremony! Best wishes to the power couple!',
    time: '1 day ago'
  }
];

export default function BlessingsWall() {
  const [wishes, setWishes] = useState(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handlePostWish = (e) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      wish: msg.trim(),
      time: 'Just now'
    };

    setWishes([newEntry, ...wishes]);
    setName('');
    setMsg('');
    setShowInput(false);
  };

  return (
    <section className="w-full my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-script text-4xl text-amber-300">Wishes & Blessings</h2>
          <p className="font-serif text-[11px] text-amber-200/70 uppercase tracking-widest">
            Love Notes from Friends & Family
          </p>
        </div>

        <button
          onClick={() => setShowInput(!showInput)}
          className="px-3 py-1.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-serif flex items-center space-x-1 transition-colors"
        >
          <Sparkles size={13} />
          <span>{showInput ? 'Close Form' : '+ Send Blessing'}</span>
        </button>
      </div>

      {showInput && (
        <form onSubmit={handlePostWish} className="glass-card rounded-2xl p-4 mb-4 border border-amber-400/50 animate-fade-in space-y-3">
          <input
            type="text"
            placeholder="Your Name / Relationship"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400"
          />
          <textarea
            rows="2"
            placeholder="Write your heart-felt message or wedding wish..."
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-100 text-xs focus:outline-none focus:border-amber-400 resize-none"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-slate-950 text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Send size={13} />
            <span>Post Wish</span>
          </button>
        </form>
      )}

      <div className="space-y-3">
        {wishes.map((w) => (
          <div 
            key={w.id} 
            className="glass-card rounded-xl p-4 border border-amber-400/20 relative"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-serif text-sm font-bold text-amber-200">
                {w.name}
              </span>
              <span className="text-[10px] font-serif text-amber-300/60">
                {w.time}
              </span>
            </div>
            <p className="font-script text-xl text-amber-100/90 leading-snug">
              "{w.wish}"
            </p>
            <div className="mt-2 flex items-center justify-end">
              <Heart size={12} className="text-rose-400 fill-rose-400" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
