import React from 'react';
import { X, Gamepad2, Compass, Sparkles, MousePointer, ShieldCheck } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const HowToPlayModal: React.FC = () => {
  const { closeModal } = useStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-moyee-charcoal border-2 border-moyee-yellow rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-gray-700/80 pb-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-moyee-yellow text-moyee-charcoal flex items-center justify-center font-bold text-xl shadow-lg">
            🎮
          </div>
          <div>
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-white">
              HOW TO EXPLORE & SHOP
            </h3>
            <p className="text-xs font-condensed text-gray-300">
              Interactive 3D Virtual World Controls & Coffee Explorer Guide
            </p>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="space-y-4 font-condensed text-xs">
          <div>
            <h4 className="font-oswald text-sm font-bold uppercase text-moyee-yellow mb-2 flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4" />
              DESKTOP CONTROLS & CAMERA LOOK
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700 text-center">
                <kbd className="bg-gray-800 px-2 py-0.5 rounded text-white font-mono text-sm border border-gray-600">
                  ← → / Q E
                </kbd>
                <span className="block mt-1 text-moyee-yellow font-bold">Look Left & Right</span>
              </div>
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700 text-center">
                <kbd className="bg-gray-800 px-2 py-0.5 rounded text-white font-mono text-sm border border-gray-600">
                  Drag Mouse
                </kbd>
                <span className="block mt-1 text-moyee-yellow font-bold">Look 360° Around</span>
              </div>
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700 text-center">
                <kbd className="bg-gray-800 px-2 py-0.5 rounded text-white font-mono text-sm border border-gray-600">
                  W A S D
                </kbd>
                <span className="block mt-1 text-gray-300">Walk & Strafe</span>
              </div>
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700 text-center">
                <kbd className="bg-gray-800 px-2 py-0.5 rounded text-white font-mono text-sm border border-gray-600">
                  Click Floor
                </kbd>
                <span className="block mt-1 text-gray-300">Glide to point</span>
              </div>
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700 text-center">
                <kbd className="bg-gray-800 px-2 py-0.5 rounded text-white font-mono text-sm border border-gray-600">
                  Shift
                </kbd>
                <span className="block mt-1 text-gray-300">Sprint / Run</span>
              </div>
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700 text-center">
                <kbd className="bg-gray-800 px-2 py-0.5 rounded text-white font-mono text-sm border border-gray-600">
                  Double Click
                </kbd>
                <span className="block mt-1 text-gray-300">Lock FPS mouse look</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="bg-moyee-dark p-2 rounded-xl border border-gray-700 text-center">
                <span className="font-bold text-moyee-pink">M</span>: Open Store Map
              </div>
              <div className="bg-moyee-dark p-2 rounded-xl border border-gray-700 text-center">
                <span className="font-bold text-moyee-yellow">B</span>: Open Basket
              </div>
              <div className="bg-moyee-dark p-2 rounded-xl border border-gray-700 text-center">
                <span className="font-bold text-green-400">E</span>: Quick-Pick Product
              </div>
            </div>
          </div>

          {/* Mobile & Touch Controls Section */}
          <div>
            <h4 className="font-oswald text-sm font-bold uppercase text-moyee-pink mb-2 flex items-center gap-1.5">
              <span>📱</span>
              MOBILE & TOUCH CONTROLS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700">
                <span className="font-bold text-moyee-yellow block">🕹️ Left Thumbstick</span>
                <span className="text-gray-300">Drag to walk, back up, and strafe in 360°</span>
              </div>
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700">
                <span className="font-bold text-moyee-pink block">👆 Right Screen Swipe</span>
                <span className="text-gray-300">Swipe anywhere on the right to look left/right</span>
              </div>
              <div className="bg-moyee-dark p-2.5 rounded-xl border border-gray-700">
                <span className="font-bold text-green-400 block">🛍️ 1-Tap Quick Pick</span>
                <span className="text-gray-300">Walk near shelves & tap "Pick Up" to add to bag!</span>
              </div>
            </div>
          </div>

          {/* Golden Bean Hunt Mission */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-950/40 to-moyee-dark border border-moyee-yellow/50 space-y-1.5">
            <h4 className="font-oswald text-sm font-bold uppercase text-moyee-yellow flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-moyee-yellow animate-spin" />
              THE GOLDEN BEAN HUNT (REWARD: 15% OFF)
            </h4>
            <p className="text-gray-300 leading-relaxed text-xs">
              There are <strong className="text-white">5 Golden Coffee Beans</strong> hidden in secret spots across the 3D store (on outdoor benches, behind grinders, in the lounge, on the postbox, and near the globe).
            </p>
            <p className="text-moyee-yellow font-bold text-xs">
              Walk up to them or click to collect! Find all 5 to automatically unlock coupon code <span className="bg-black/50 px-2 py-0.5 rounded text-white font-mono">BEANHUNT15</span>!
            </p>
          </div>
        </div>

        <button
          onClick={closeModal}
          className="w-full mt-6 bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-sm font-bold uppercase py-3 rounded-xl transition-all shadow-lg"
        >
          Got it, Let's Play!
        </button>
      </div>
    </div>
  );
};
