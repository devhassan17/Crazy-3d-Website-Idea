import React, { useState } from 'react';
import { X, Check, ShoppingBag, ShieldCheck, Sparkles, MapPin, Flame, Plus, Minus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { WeightOption, GrindType } from '../../types';

export const ProductDetailModal: React.FC = () => {
  const { selectedProduct, closeModal, addToCart } = useStore();

  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(
    selectedProduct?.weights[0]?.label || '250g'
  );
  const [selectedGrind, setSelectedGrind] = useState<GrindType>(
    selectedProduct?.grindOptions[0] || 'Whole Beans'
  );
  const [quantity, setQuantity] = useState(1);
  const [isSubscription, setIsSubscription] = useState(false);
  const [subscriptionFrequency, setSubscriptionFrequency] = useState<
    'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Every 2 Months'
  >('Monthly');
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedProduct) return null;

  const currentWeightOpt =
    selectedProduct.weights.find((w) => w.label === selectedWeight) || selectedProduct.weights[0];
  const unitPrice = Number((selectedProduct.price * currentWeightOpt.priceMultiplier).toFixed(2));
  const totalPrice = Number((unitPrice * quantity).toFixed(2));

  const handleAdd = () => {
    addToCart(
      selectedProduct,
      selectedWeight,
      selectedGrind,
      quantity,
      isSubscription,
      isSubscription ? subscriptionFrequency : undefined
    );
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      closeModal();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-moyee-charcoal border-2 border-moyee-pink/60 rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800/80 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* ======================================================== */}
          {/* LEFT: 3D PRODUCT CARD SHOWCASE                           */}
          {/* ======================================================== */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-moyee-dark/80 border border-gray-700/60 p-6 rounded-2xl relative overflow-hidden">
            {/* Bag Header Badge */}
            {selectedProduct.badge && (
              <span className="absolute top-3 left-3 bg-moyee-yellow text-moyee-charcoal text-[10px] font-oswald uppercase font-black px-2.5 py-0.5 rounded-full shadow-md">
                {selectedProduct.badge}
              </span>
            )}

            {/* Stylized Visual Coffee Pouch */}
            <div
              className="w-44 h-64 rounded-2xl shadow-2xl flex flex-col justify-between p-4 border-2 border-white/20 transform hover:scale-105 transition-transform duration-300 relative"
              style={{
                backgroundColor: selectedProduct.colorHex,
                boxShadow: `0 15px 35px ${selectedProduct.colorHex}44`
              }}
            >
              {/* Top Valve */}
              <div className="flex justify-between items-center">
                <div className="w-4 h-4 rounded-full bg-black/40 border border-white/30" />
                <span className="font-oswald text-[10px] text-white/80 font-bold uppercase tracking-wider">
                  Moyee Coffee
                </span>
              </div>

              {/* Title on pouch */}
              <div className="text-center my-auto">
                <h4 className="font-oswald text-xl font-bold uppercase text-white leading-tight">
                  {selectedProduct.name}
                </h4>
                <div className="h-0.5 w-12 bg-moyee-yellow mx-auto my-2" />
                <p className="font-condensed text-[11px] text-white/90">
                  {selectedProduct.tagline}
                </p>
              </div>

              {/* Bottom Specs on pouch */}
              <div className="border-t border-white/20 pt-2 flex justify-between items-center text-[10px] font-oswald text-white/80 uppercase">
                <span>{selectedWeight}</span>
                <span>{selectedProduct.roastLevel} Roast</span>
              </div>
            </div>

            {/* Origin & Facility Pill */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-300 font-condensed">
                <MapPin className="w-3.5 h-3.5 text-moyee-yellow" />
                <span>{selectedProduct.origins.join(', ')}</span>
              </div>
              <div className="text-[11px] text-moyee-pink font-condensed font-bold mt-0.5">
                Roastery: {selectedProduct.roastLocation}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT: CONFIGURATION & ADD TO BASKET                     */}
          {/* ======================================================== */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-oswald uppercase text-moyee-yellow font-bold tracking-widest">
                  {selectedProduct.category.toUpperCase()} • 100% ARABICA
                </span>
                <div className="flex items-center space-x-1 text-xs text-gray-300">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold">{selectedProduct.rating}</span>
                  <span className="text-gray-400">({selectedProduct.reviewCount})</span>
                </div>
              </div>

              {/* Product Title & Price */}
              <h3 className="font-oswald text-2xl sm:text-3xl font-bold uppercase text-white mt-1">
                {selectedProduct.name}
              </h3>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="font-oswald text-2xl font-bold text-moyee-yellow">
                  €{unitPrice.toFixed(2)}
                </span>
                <span className="text-xs text-gray-400 font-condensed">
                  VAT included • Fresh Nitro-Flush Sealed
                </span>
              </div>

              {/* Flavor Profile Tags */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {selectedProduct.flavorNotes.map((note) => (
                  <span
                    key={note}
                    className="bg-gray-800 text-gray-200 text-[11px] font-condensed px-2.5 py-0.5 rounded-full border border-gray-700"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="font-condensed text-sm text-gray-300 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Weight / Pack Options */}
            <div>
              <label className="block font-oswald text-xs uppercase font-bold text-gray-300 mb-1.5">
                Choose Weight / Pack:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selectedProduct.weights.map((w) => {
                  const optPrice = (selectedProduct.price * w.priceMultiplier).toFixed(2);
                  const isSelected = selectedWeight === w.label;
                  return (
                    <button
                      key={w.label}
                      onClick={() => setSelectedWeight(w.label)}
                      className={`p-2.5 rounded-xl border text-left font-condensed transition-all ${
                        isSelected
                          ? 'border-moyee-pink bg-moyee-pink/20 text-white font-bold'
                          : 'border-gray-700 bg-moyee-dark/80 text-gray-300 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-oswald uppercase text-sm">{w.label}</span>
                        <span className="text-moyee-yellow font-bold text-xs">€{optPrice}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grind Selection (If Beans) */}
            {selectedProduct.category === 'beans' && (
              <div>
                <label className="block font-oswald text-xs uppercase font-bold text-gray-300 mb-1.5">
                  Choose Grind Type:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedProduct.grindOptions.map((g) => {
                    const isSelected = selectedGrind === g;
                    return (
                      <button
                        key={g}
                        onClick={() => setSelectedGrind(g)}
                        className={`p-2 rounded-lg border text-center font-condensed text-xs transition-all ${
                          isSelected
                            ? 'border-moyee-yellow bg-moyee-yellow/20 text-white font-bold'
                            : 'border-gray-700 bg-moyee-dark/80 text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Subscription Toggle */}
            {selectedProduct.isSubscriptionEligible && (
              <div className="p-3 rounded-xl bg-moyee-dark/90 border border-moyee-pink/40 flex flex-col space-y-2">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSubscription}
                    onChange={(e) => setIsSubscription(e.target.checked)}
                    className="w-4 h-4 accent-moyee-pink rounded"
                  />
                  <div className="flex-1">
                    <span className="font-oswald text-xs uppercase font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-moyee-yellow" />
                      Never Run Out — Subscribe & Get Free Shipping
                    </span>
                    <span className="text-[11px] text-gray-400 font-condensed block">
                      Pause, adjust or cancel anytime in your Odoo account
                    </span>
                  </div>
                </label>

                {isSubscription && (
                  <div className="flex items-center space-x-2 pt-1 border-t border-gray-700">
                    <span className="text-xs text-gray-300 font-condensed">Frequency:</span>
                    {(['Weekly', 'Bi-Weekly', 'Monthly', 'Every 2 Months'] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setSubscriptionFrequency(freq)}
                        className={`px-2 py-1 rounded text-[11px] font-condensed ${
                          subscriptionFrequency === freq
                            ? 'bg-moyee-yellow text-moyee-charcoal font-bold'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quantity Stepper & Add to Basket Button */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-700 rounded-lg text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-oswald text-base font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-700 rounded-lg text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={addedAnimation}
                className={`flex-1 font-oswald text-base font-bold uppercase tracking-wider py-3 px-6 rounded-xl shadow-2xl border-2 transition-all flex items-center justify-center space-x-2 ${
                  addedAnimation
                    ? 'bg-green-600 border-green-400 text-white animate-pulse'
                    : 'bg-moyee-pink hover:bg-moyee-pink-hover border-moyee-yellow text-white active:scale-95'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Basket • €{totalPrice.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
