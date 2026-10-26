import React from 'react';
import { Sparkles, Compass, ShoppingBag, HelpCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const WelcomeModal: React.FC = () => {
  const { enterStoreCinematic, openModal, teleportToZone } = useStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-moyee-charcoal/95 border-2 border-moyee-pink rounded-3xl p-6 sm:p-8 shadow-2xl text-center select-none overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-moyee-pink/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-moyee-yellow/30 rounded-full blur-3xl pointer-events-none" />

        {/* Moyee Brand Ribbon */}
        <div className="inline-flex items-center space-x-2 bg-moyee-pink text-white font-oswald text-xs uppercase font-bold tracking-widest px-3.5 py-1 rounded-full shadow-lg mb-4">
          <Sparkles className="w-3.5 h-3.5 text-moyee-yellow" />
          <span>FAIRCHAIN 50/50 • VIRTUAL SHOPPING WORLD</span>
        </div>

        {/* Hero Title */}
        <h2 className="font-oswald text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide text-white leading-tight">
          WELCOME TO <span className="text-moyee-yellow">MOYEE COFFEE</span>
        </h2>
        <p className="font-condensed text-base sm:text-lg text-gray-200 mt-2 max-w-md mx-auto leading-relaxed">
          Explore a Whole New World of Coffee. Walk around, inspect freshly roasted beans on 3D shelves, talk to our virtual barista, and shop directly with Odoo 18.
        </p>

        {/* Features highlights badge row */}
        <div className="grid grid-cols-3 gap-2 my-6 text-center">
          <div className="bg-moyee-dark/80 border border-gray-700 p-2.5 rounded-xl">
            <span className="text-lg">☕</span>
            <div className="font-oswald text-xs font-bold text-white uppercase mt-0.5">3D Shelves</div>
            <div className="text-[10px] text-gray-400 font-condensed">Interactive roasts</div>
          </div>
          <div className="bg-moyee-dark/80 border border-gray-700 p-2.5 rounded-xl">
            <span className="text-lg">🌍</span>
            <div className="font-oswald text-xs font-bold text-white uppercase mt-0.5">FairChain 50/50</div>
            <div className="text-[10px] text-gray-400 font-condensed">Roasting at origin</div>
          </div>
          <div className="bg-moyee-dark/80 border border-gray-700 p-2.5 rounded-xl">
            <span className="text-lg">✨</span>
            <div className="font-oswald text-xs font-bold text-white uppercase mt-0.5">Bean Hunt</div>
            <div className="text-[10px] text-gray-400 font-condensed">Find 5 secret beans</div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={enterStoreCinematic}
          className="w-full group bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-lg sm:text-xl font-bold uppercase tracking-wider py-4 rounded-2xl shadow-2xl border-2 border-moyee-yellow flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>ENTER 3D STORE</span>
          <ArrowRight className="w-6 h-6 text-moyee-yellow group-hover:translate-x-1.5 transition-transform" />
        </button>

        {/* Secondary Action Grid */}
        <div className="grid grid-cols-3 gap-2.5 mt-3.5">
          <button
            onClick={() => openModal('store_map')}
            className="flex items-center justify-center space-x-1.5 bg-moyee-dark/90 hover:bg-gray-800 text-gray-200 border border-gray-700 font-oswald text-xs uppercase font-bold py-2.5 rounded-xl transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-moyee-yellow" />
            <span>Explore Map</span>
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
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span>How to Play</span>
          </button>
        </div>
      </div>
    </div>
  );
};
