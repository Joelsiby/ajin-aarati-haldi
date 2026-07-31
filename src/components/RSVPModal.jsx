import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, CheckCircle2, User, Users, Utensils, X, Send } from 'lucide-react';

export default function RSVPModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    guestCount: '1',
    attendance: 'all',
    diet: 'veg',
    notes: ''
  });

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F59E0B', '#BE123C', '#FFFFFF']
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    triggerConfetti();

    // Store in localStorage as mock saved RSVP
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch (err) {
      console.error("Localstorage error", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative max-w-md w-full glass-card border border-amber-400/50 rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-amber-200/70 hover:text-amber-200 bg-amber-950/30 hover:bg-amber-900/50 transition-colors"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 border border-amber-400/40">
                <Heart size={24} className="fill-amber-400 text-amber-400 animate-bounce" />
              </div>
              <h2 className="font-script text-4xl text-amber-300">Kindly Confirm RSVP</h2>
              <p className="font-serif text-xs text-amber-200/70 tracking-widest uppercase mt-1">
                Ananya & Rohan's Wedding
              </p>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 uppercase mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-3 text-amber-400/70" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya & Family"
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-serif text-amber-200 uppercase mb-1">
                  Guests Attending
                </label>
                <div className="relative">
                  <Users size={16} className="absolute left-3 top-3 text-amber-400/70" />
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4+">4+ Family</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif text-amber-200 uppercase mb-1">
                  Meal Choice
                </label>
                <div className="relative">
                  <Utensils size={16} className="absolute left-3 top-3 text-amber-400/70" />
                  <select
                    value={formData.diet}
                    onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="veg">Traditional Pure Veg Feast</option>
                    <option value="jain">Jain Special</option>
                    <option value="kids">Kids Special</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 uppercase mb-1">
                Events Joining
              </label>
              <select
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="all">Attending All Events (Haldi, Sangeet & Wedding)</option>
                <option value="haldi">Haldi & Mehendi Only</option>
                <option value="wedding">Wedding & Pheras Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-serif text-amber-200 uppercase mb-1">
                Message for Bride & Groom
              </label>
              <textarea
                rows="2"
                placeholder="Send your love, blessings or song requests..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 font-bold text-slate-950 shadow-lg hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all flex items-center justify-center space-x-2 border border-amber-300/40"
            >
              <Send size={16} />
              <span>Confirm My RSVP</span>
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/40">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-script text-4xl text-amber-300">RSVP Confirmed!</h3>
            <p className="font-serif text-sm text-amber-100/90 max-w-xs mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-amber-300">{formData.guestName}</span>! Your presence will make our Haldi and Wedding celebration truly special.
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors"
            >
              Back to Invitation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
