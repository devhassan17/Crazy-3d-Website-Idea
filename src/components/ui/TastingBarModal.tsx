import React, { useState } from 'react';
import { X, Coffee, Sparkles, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { MOYEE_PRODUCTS } from '../../data/products';
import { sounds } from '../../utils/audio';

export const TastingBarModal: React.FC = () => {
  const { closeModal, addToCart, openProductDetail } = useStore();
  const [selectedBrew, setSelectedBrew] = useState<'espresso' | 'filter' | 'french_press' | 'cold_brew'>('espresso');
  const [isBrewing, setIsBrewing] = useState(false);

  const BREW_STYLES = [
    {
      id: 'espresso',
      title: 'Espresso / Flat White',
      icon: '☕',
      grind: 'Fine / Espresso Grind',
      temp: '93°C • 9 Bar Pressure',
      recommendedProduct: MOYEE_PRODUCTS[2], // Dark Roast or Triple
      baristaTip:
        '"For espresso, our Ethiopian Dark Roast or African Triple gives an unbelievable thick crema with roasted hazelnut and dark chocolate that holds up gloriously in milk!"'
    },
    {
      id: 'filter',
      title: 'Pour-Over / Chemex / V60',
      icon: '🫖',
      grind: 'Medium-Coarse',
      temp: '92°C • 3:30 min extraction',
      recommendedProduct: MOYEE_PRODUCTS[1], // Double Blend
      baristaTip:
        '"Pour-over showcases delicate single origins and high-altitude beans. Our Double Blend with washed Limu offers honey and orange blossom notes you can smell across the room!"'
    },
    {
      id: 'french_press',
      title: 'French Press / Plunger',
      icon: '🍶',
      grind: 'Coarse',
      temp: '94°C • 4:00 min immersion',
      recommendedProduct: MOYEE_PRODUCTS[0], // Triple Blend
      baristaTip:
        '"French press extracts rich coffee oils. The African Triple Blend gives a full-bodied cocoa profile with zero bitterness."'
    },
    {
      id: 'cold_brew',
      title: 'Slow Cold Brew',
      icon: '🧊',
      grind: 'Extra Coarse',
      temp: 'Room temp / Chilled • 16 hours',
      recommendedProduct: MOYEE_PRODUCTS[3], // Microlot
      baristaTip:
        '"Cold water prevents acid extraction, creating a naturally sweet elixir bursting with berry and papaya fruitiness. Our Microlot series is exceptional iced!"'
    }
  ];

  const currentBrew = BREW_STYLES.find((b) => b.id === selectedBrew)!;

  const handleSimulateBrew = () => {
    setIsBrewing(true);
    sounds.playSteamHiss();
    setTimeout(() => {
      setIsBrewing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-moyee-charcoal border-2 border-moyee-pink rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Barista Avatar */}
        <div className="flex items-center space-x-3.5 border-b border-gray-700/80 pb-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-moyee-pink text-white flex items-center justify-center text-2xl shadow-xl border-2 border-moyee-yellow">
            👩🏾‍🍳
          </div>
          <div>
            <div className="inline-block bg-moyee-yellow text-moyee-charcoal text-[9px] font-oswald uppercase font-black px-2 py-0.2 rounded mb-0.5">
              HEAD BARISTA • TASTING BAR
            </div>
            <h3 className="font-oswald text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
              COFFEE TASTING WITH AMARA
            </h3>
            <p className="text-xs font-condensed text-gray-300">
              Explore Extraction Methods & Discover Recommended Roasts
            </p>
          </div>
        </div>

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
          {BREW_STYLES.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBrew(b.id as any)}
              className={`p-3 rounded-xl border text-center font-condensed transition-all ${
                selectedBrew === b.id
                  ? 'border-moyee-pink bg-moyee-pink/20 text-white font-bold shadow-md scale-105'
                  : 'border-gray-700 bg-moyee-dark text-gray-400 hover:text-white'
              }`}
            >
              <div className="text-xl mb-1">{b.icon}</div>
              <div className="font-oswald text-xs uppercase truncate">{b.title.split('/')[0]}</div>
            </button>
          ))}
        </div>

        {/* Barista Advice Card */}
        <div className="bg-moyee-dark/90 border border-moyee-yellow/40 p-5 rounded-2xl mb-5">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <span className="font-oswald text-xs uppercase font-bold text-moyee-yellow">
                BARISTA AMARA'S NOTES ON {currentBrew.title.toUpperCase()}:
              </span>
              <p className="font-condensed text-sm text-gray-200 italic mt-1 leading-relaxed">
                {currentBrew.baristaTip}
              </p>
              <div className="flex gap-4 mt-3 text-xs font-condensed text-gray-400">
                <span>⚡ Grind: <strong className="text-white">{currentBrew.grind}</strong></span>
                <span>🌡️ Temperature: <strong className="text-white">{currentBrew.temp}</strong></span>
              </div>
            </div>

            <button
              onClick={handleSimulateBrew}
              disabled={isBrewing}
              className="bg-moyee-charcoal hover:bg-gray-800 text-moyee-yellow border border-moyee-yellow font-oswald text-xs uppercase font-bold px-4 py-2.5 rounded-xl transition-all shadow flex items-center gap-1.5 whitespace-nowrap self-end sm:self-center"
            >
              <span>{isBrewing ? 'Brewing...' : 'Simulate Pull ☕'}</span>
            </button>
          </div>
        </div>

        {/* Recommended Coffee Card */}
        <div className="bg-moyee-charcoal border-2 border-moyee-pink p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div
              className="w-12 h-14 rounded-xl flex items-center justify-center text-xl shadow"
              style={{ backgroundColor: currentBrew.recommendedProduct.colorHex }}
            >
              ☕
            </div>
            <div>
              <span className="font-oswald text-[10px] uppercase font-bold text-moyee-yellow tracking-wider">
                BARISTA RECOMMENDED BEAN
              </span>
              <h4 className="font-oswald text-lg font-bold text-white uppercase">
                {currentBrew.recommendedProduct.name}
              </h4>
              <p className="font-condensed text-xs text-gray-300">
                {currentBrew.recommendedProduct.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => {
                addToCart(currentBrew.recommendedProduct, '250g', 'Whole Beans', 1);
                closeModal();
              }}
              className="flex-1 sm:flex-none bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-xs font-bold uppercase px-4 py-3 rounded-xl border border-moyee-yellow flex items-center justify-center space-x-1.5 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Basket (€{currentBrew.recommendedProduct.price.toFixed(2)})</span>
            </button>
            <button
              onClick={() => openProductDetail(currentBrew.recommendedProduct)}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 hover:text-white"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
