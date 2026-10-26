import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { MOYEE_PRODUCTS } from '../../data/products';
import { Product } from '../../types';

export const SubscriptionClubModal: React.FC = () => {
  const { closeModal, addToCart, openModal } = useStore();

  const eligibleProducts = MOYEE_PRODUCTS.filter((p) => p.isSubscriptionEligible);
  const [selectedProduct, setSelectedProduct] = useState<Product>(eligibleProducts[0]);
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '1kg'>('1kg');
  const [frequency, setFrequency] = useState<'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Every 2 Months'>('Monthly');
  const [grind, setGrind] = useState<'Whole Beans' | 'Filter Grind' | 'Espresso Grind'>('Whole Beans');

  const weightOpt = selectedProduct.weights.find((w) => w.label === selectedWeight) || selectedProduct.weights[0];
  const unitPrice = Number((selectedProduct.price * weightOpt.priceMultiplier).toFixed(2));

  const handleStartSubscription = () => {
    addToCart(selectedProduct, selectedWeight, grind, 1, true, frequency);
    closeModal();
    openModal('cart_drawer');
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

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center space-x-2 bg-moyee-pink text-white font-oswald text-xs uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-moyee-yellow" />
            <span>NEVER RUN OUT OF COFFEE</span>
          </div>
          <h3 className="font-oswald text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white">
            MOYEE SUBSCRIPTION CLUB
          </h3>
          <p className="font-condensed text-sm text-gray-300 mt-1">
            Freshly roasted at origin • 100% Free Shipping on all recurring orders • Pause, swap, or cancel anytime in your Odoo account
          </p>
        </div>

        {/* 3 Steps Configurator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {/* Step 1: Roast */}
          <div className="bg-moyee-dark/80 border border-gray-700 p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="font-oswald text-xs font-bold text-moyee-yellow uppercase">
                Step 1: Choose Roast
              </span>
              <div className="space-y-2 mt-2">
                {eligibleProducts.slice(0, 4).map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`w-full p-2 rounded-xl border text-left text-xs font-condensed transition-all flex justify-between items-center ${
                      selectedProduct.id === prod.id
                        ? 'border-moyee-pink bg-moyee-pink/20 text-white font-bold'
                        : 'border-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <span className="truncate">{prod.name}</span>
                    <span className="text-[10px] text-moyee-yellow font-oswald">
                      {prod.roastLevel}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Frequency */}
          <div className="bg-moyee-dark/80 border border-gray-700 p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="font-oswald text-xs font-bold text-moyee-yellow uppercase">
                Step 2: Delivery Schedule
              </span>
              <div className="space-y-2 mt-2">
                {(['Weekly', 'Bi-Weekly', 'Monthly', 'Every 2 Months'] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={`w-full p-2 rounded-xl border text-left text-xs font-condensed transition-all flex justify-between items-center ${
                      frequency === freq
                        ? 'border-moyee-yellow bg-moyee-yellow/20 text-white font-bold'
                        : 'border-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <span>{freq}</span>
                    {frequency === freq && <Check className="w-3.5 h-3.5 text-moyee-yellow" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Weight & Grind */}
          <div className="bg-moyee-dark/80 border border-gray-700 p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <span className="font-oswald text-xs font-bold text-moyee-yellow uppercase">
                Step 3: Weight & Grind
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {(['250g', '1kg'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`p-2 rounded-xl border text-center text-xs font-condensed transition-all ${
                      selectedWeight === w
                        ? 'border-moyee-pink bg-moyee-pink/20 text-white font-bold'
                        : 'border-gray-700 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>

              {selectedProduct.category === 'beans' && (
                <div className="mt-2.5">
                  <span className="text-[11px] text-gray-400 font-condensed block mb-1">
                    Grind Style:
                  </span>
                  <select
                    value={grind}
                    onChange={(e) => setGrind(e.target.value as any)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-2 py-1.5 text-xs text-white"
                  >
                    <option value="Whole Beans">Whole Beans</option>
                    <option value="Filter Grind">Filter Grind</option>
                    <option value="Espresso Grind">Espresso Grind</option>
                  </select>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-700 mt-2">
              <div className="text-[11px] text-gray-400 font-condensed flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-green-400" />
                <span>100% Free Carbon-Neutral Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary & Subscription Button */}
        <div className="bg-moyee-dark/95 border border-moyee-pink/50 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-oswald text-lg font-bold text-white flex items-center gap-2">
              <span>{selectedProduct.name}</span>
              <span className="text-moyee-yellow">€{unitPrice.toFixed(2)}</span>
              <span className="text-xs text-gray-400 font-normal">/ {frequency}</span>
            </div>
            <p className="text-xs text-gray-400 font-condensed">
              Guaranteed direct farm revenue split 50/50 with African roasteries.
            </p>
          </div>

          <button
            onClick={handleStartSubscription}
            className="w-full sm:w-auto bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-base font-bold uppercase tracking-wider px-8 py-3 rounded-xl shadow-2xl border-2 border-moyee-yellow flex items-center justify-center space-x-2 transition-all transform active:scale-95"
          >
            <span>ACTIVATE SUBSCRIPTION</span>
            <ArrowRight className="w-5 h-5 text-moyee-yellow" />
          </button>
        </div>
      </div>
    </div>
  );
};
