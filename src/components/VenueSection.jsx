import React from 'react';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export default function VenueSection() {
  const openGoogleMaps = () => {
    window.open("https://maps.google.com/?q=Royal+Orchid+Resort+Gardens+Bangalore", "_blank");
  };

  return (
    <section className="w-full my-8">
      <div className="text-center mb-6">
        <h2 className="font-script text-4xl text-amber-300">Venue & Navigation</h2>
        <p className="font-serif text-xs text-amber-200/70 tracking-widest uppercase mt-1">
          ✦ The Royal Palace & Resort ✦
        </p>
      </div>

      <div className="glass-card-gold rounded-3xl p-6 border border-amber-400/40 text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/40">
          <MapPin size={24} className="text-amber-400 animate-bounce" />
        </div>

        <div>
          <h3 className="font-serif text-xl font-bold text-amber-100">
            Royal Orchid Palace & Gardens
          </h3>
          <p className="text-xs text-amber-200/80 font-serif mt-1">
            Main Palace Road, Yelahanka Heritage District, Bengaluru
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-serif text-amber-200/90 pt-2">
          <div className="bg-amber-950/50 p-2.5 rounded-xl border border-amber-500/20 flex items-center justify-center space-x-1.5">
            <Compass size={14} className="text-amber-400" />
            <span>Valet Parking Free</span>
          </div>
          <div className="bg-amber-950/50 p-2.5 rounded-xl border border-amber-500/20 flex items-center justify-center space-x-1.5">
            <Navigation size={14} className="text-amber-400" />
            <span>Resort Accommodation</span>
          </div>
        </div>

        <button
          onClick={openGoogleMaps}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 font-bold text-slate-950 text-xs font-serif uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all border border-amber-300/40 active:scale-95"
        >
          <Navigation size={15} />
          <span>Open Directions on Google Maps</span>
          <ExternalLink size={13} />
        </button>
      </div>
    </section>
  );
}
