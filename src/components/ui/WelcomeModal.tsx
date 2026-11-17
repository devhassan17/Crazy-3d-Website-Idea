import React from 'react';
import { Sparkles, Compass, ShoppingBag, HelpCircle, ArrowRight, Car } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { sounds } from '../../utils/audio';

export const WelcomeModal: React.FC = () => {
  const { enterStoreCinematic, openModal, teleportToZone, closeModal } = useStore();

  const handleSpawnStreet = () => {
    sounds.playCarEngine();
    sounds.startStoreAmbiance();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-moyee-charcoal/95 border-2 border-yellow-400/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center select-none overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-moyee-pink/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-yellow-400/25 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Ribbon */}
        <div className="inline-flex items-center space-x-2 bg-black/80 text-yellow-400 font-oswald text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full shadow-lg mb-4 border border-yellow-400/50">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>ROCKFORD HILLS • ECLIPSE BLVD • GTA V EDITION</span>
        </div>

        {/* Hero Title */}
        <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-white leading-tight">
          ORIGIN ROASTERY <span className="text-yellow-400">LOS SANTOS</span>
        </h2>
        <p className="font-condensed text-base sm:text-lg text-gray-200 mt-2 max-w-md mx-auto leading-relaxed">
          Experience a GTA V open-world coffee flagship. Roam the palm-lined boulevard in 3rd-person or 1st-person, drive the curbside Pegassi GT sports car, and step inside to shop specialty roasts.
        </p>

        {/* Features highlights badge row */}
        <div className="grid grid-cols-3 gap-2 my-6 text-center">
          <div className="bg-moyee-dark/90 border border-gray-700 p-2.5 rounded-xl">
            <span className="text-lg">🏎️</span>
            <div className="font-oswald text-xs font-bold text-white uppercase mt-0.5">Driveable GT</div>
            <div className="text-[10px] text-gray-400 font-condensed">Press [G] on street</div>
          </div>
          <div className="bg-moyee-dark/90 border border-gray-700 p-2.5 rounded-xl">
            <span className="text-lg">🎥</span>
            <div className="font-oswald text-xs font-bold text-white uppercase mt-0.5">3rd & 1st Cam</div>
            <div className="text-[10px] text-gray-400 font-condensed">Press [V] anytime</div>
          </div>
          <div className="bg-moyee-dark/90 border border-gray-700 p-2.5 rounded-xl">
            <span className="text-lg">☕</span>
            <div className="font-oswald text-xs font-bold text-white uppercase mt-0.5">3D Flagship</div>
            <div className="text-[10px] text-gray-400 font-condensed">Interactive shelves</div>
          </div>
        </div>

        {/* Dual Primary Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleSpawnStreet}
            className="w-full group bg-yellow-400 hover:bg-yellow-300 text-black font-oswald text-base sm:text-lg font-black uppercase tracking-wider py-3.5 px-4 rounded-2xl shadow-2xl border-2 border-white/40 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Car className="w-5 h-5" />
            <span>SPAWN ON STREET</span>
          </button>

          <button
            onClick={enterStoreCinematic}
            className="w-full group bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-base sm:text-lg font-bold uppercase tracking-wider py-3.5 px-4 rounded-2xl shadow-2xl border-2 border-yellow-400 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>ENTER 3D STORE</span>
            <ArrowRight className="w-5 h-5 text-yellow-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Secondary Action Grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-3.5">
          <button
            onClick={() => openModal('store_map')}
            className="flex items-center justify-center space-x-1.5 bg-moyee-dark/90 hover:bg-gray-800 text-gray-200 border border-gray-700 font-oswald text-xs uppercase font-bold py-2.5 rounded-xl transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-yellow-400" />
            <span>GPS Radar Map</span>
          </button>
          <button
            onClick={() => {
              teleportToZone('beans_shelf');
            }}
            className="flex items-center justify-center space-x-1.5 bg-moyee-dark/90 hover:bg-gray-800 text-gray-200 border border-gray-700 font-oswald text-xs uppercase font-bold py-2.5 rounded-xl transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-moyee-pink" />
            <span>Shop Directly</span>
          </button>
          <button
            onClick={() => openModal('how_to_play')}
            className="flex items-center justify-center space-x-1.5 bg-moyee-dark/90 hover:bg-gray-800 text-gray-200 border border-gray-700 font-oswald text-xs uppercase font-bold py-2.5 rounded-xl transition-all"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>GTA Controls</span>
          </button>
        </div>
      </div>
    </div>
  );
};
