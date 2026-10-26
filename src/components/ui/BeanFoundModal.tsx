import React from 'react';
import { X, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../store/useStore';

export const BeanFoundModal: React.FC = () => {
  const { closeModal, foundBeanIds, applyDiscountCode } = useStore();
  const count = foundBeanIds.length;
  const isComplete = count >= 5;

  React.useEffect(() => {
    confetti({
      particleCount: isComplete ? 100 : 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFD900', '#FFB300', '#E5007D', '#FFFFFF']
    });
  }, [isComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-sm animate-fadeIn select-none">
      <div className="relative w-full max-w-md bg-moyee-charcoal border-2 border-moyee-yellow rounded-3xl p-6 shadow-2xl text-center text-white overflow-hidden">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-400 mx-auto flex items-center justify-center text-3xl shadow-xl border-2 border-moyee-yellow animate-bounce mb-3">
          ✨
        </div>

        <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-white">
          {isComplete ? 'TROPHY UNLOCKED!' : 'GOLDEN BEAN FOUND!'}
        </h3>

        <div className="bg-moyee-dark/80 border border-moyee-yellow/40 p-4 rounded-2xl my-4 space-y-2">
          <div className="font-oswald text-base font-bold text-moyee-yellow">
            Progress: {count} of 5 Golden Beans Collected
          </div>
          <div className="w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-moyee-yellow h-full transition-all duration-500"
              style={{ width: `${(count / 5) * 100}%` }}
            />
          </div>
          <p className="font-condensed text-xs text-gray-300">
            {isComplete
              ? '🎉 Extraordinary job! You found all 5 secret beans across the 3D coffee world. Coupon code BEANHUNT15 has been applied to your cart for 15% OFF!'
              : `Keep exploring! There are ${5 - count} more secret golden beans hidden around the shelves, counters, and lounge.`}
          </p>
        </div>

        <button
          onClick={closeModal}
          className="w-full bg-moyee-yellow hover:bg-moyee-yellow-hover text-moyee-charcoal font-oswald text-sm font-bold uppercase tracking-wider py-3 rounded-xl shadow-lg transition-all"
        >
          Continue Exploring
        </button>
      </div>
    </div>
  );
};
