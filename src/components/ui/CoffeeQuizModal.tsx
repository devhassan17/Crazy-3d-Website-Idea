import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, ShoppingBag, MapPin } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { MOYEE_PRODUCTS } from '../../data/products';
import { Product } from '../../types';

interface QuizAnswers {
  brewMethod: string;
  boldness: number;
  flavor: string;
  format: string;
}

export const CoffeeQuizModal: React.FC = () => {
  const { closeModal, openProductDetail, teleportToZone, addToCart } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    brewMethod: 'Espresso Machine',
    boldness: 2,
    flavor: 'Chocolate & Caramel',
    format: 'Whole Beans'
  });
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  const QUESTIONS = [
    {
      title: 'Question 1: How do you usually brew your coffee?',
      options: [
        { label: 'Espresso Machine / Moka Pot', val: 'espresso' },
        { label: 'Filter / Chemex / Drip / French Press', val: 'filter' },
        { label: 'Nespresso® Capsule Machine', val: 'capsules' },
        { label: 'AeroPress / Pour-Over / Cold Brew', val: 'specialty' }
      ],
      field: 'brewMethod'
    },
    {
      title: 'Question 2: How bold do you like your roast?',
      options: [
        { label: 'Light & Delicate (Bright & Fruity)', val: 1 },
        { label: 'Medium & Balanced (Smooth Chocolate)', val: 2 },
        { label: 'Dark & Commanding (Intense Kick)', val: 3 }
      ],
      field: 'boldness'
    },
    {
      title: 'Question 3: What flavor notes do you crave in the morning?',
      options: [
        { label: 'Dark Cocoa & Roasted Nuts', val: 'cocoa' },
        { label: 'Honey, Orange Blossom & Citrus', val: 'citrus' },
        { label: 'Exotic Florals, Berries & Papaya', val: 'exotic' }
      ],
      field: 'flavor'
    },
    {
      title: 'Question 4: What format do you prefer?',
      options: [
        { label: 'Whole Beans (I grind fresh at home)', val: 'beans' },
        { label: 'Pre-Ground (Ready to scoop)', val: 'ground' },
        { label: 'Convenient Capsules', val: 'capsules' }
      ],
      field: 'format'
    }
  ];

  const handleSelectOption = (field: string, val: any) => {
    const updated = { ...answers, [field]: val };
    setAnswers(updated);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate best product match
      let match = MOYEE_PRODUCTS[0]; // default Triple

      if (updated.format === 'capsules' || updated.brewMethod === 'capsules') {
        match = updated.boldness === 3 ? MOYEE_PRODUCTS[6] : MOYEE_PRODUCTS[5]; // Espresso vs Lungo
      } else if (updated.boldness === 3) {
        match = MOYEE_PRODUCTS[2]; // Dark Roast
      } else if (updated.boldness === 1 || updated.flavor === 'citrus') {
        match = MOYEE_PRODUCTS[1]; // Double Blend
      } else if (updated.flavor === 'exotic') {
        match = MOYEE_PRODUCTS[3]; // Microlot
      } else {
        match = MOYEE_PRODUCTS[0]; // Triple Blend
      }

      setRecommendedProduct(match);
      setCurrentStep(QUESTIONS.length);
    }
  };

  const handleLocateOnShelf = () => {
    if (!recommendedProduct) return;
    const targetZone = recommendedProduct.category === 'capsules' ? 'capsules_shelf' : 'beans_shelf';
    teleportToZone(targetZone);
    closeModal();
  };

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

        {recommendedProduct ? (
          /* ======================================================== */
          /* QUIZ RESULT: YOUR PERFECT COFFEE MATCH                   */
          /* ======================================================== */
          <div className="text-center py-4 space-y-4 animate-fadeIn">
            <div className="inline-flex items-center space-x-1.5 bg-moyee-yellow text-moyee-charcoal text-xs font-oswald uppercase font-black px-3 py-1 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-moyee-charcoal" />
              <span>YOUR PERFECT COFFEE MATCH</span>
            </div>

            <h3 className="font-oswald text-3xl sm:text-4xl font-bold uppercase text-white">
              {recommendedProduct.name}
            </h3>

            <div className="p-5 rounded-2xl bg-moyee-dark/90 border border-moyee-pink/60 max-w-md mx-auto text-center space-y-3">
              <p className="font-condensed text-sm text-gray-300 leading-relaxed">
                "{recommendedProduct.tagline}"
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {recommendedProduct.flavorNotes.map((fn) => (
                  <span
                    key={fn}
                    className="bg-gray-800 text-moyee-yellow text-xs font-condensed px-2.5 py-0.5 rounded-full border border-gray-700"
                  >
                    {fn}
                  </span>
                ))}
              </div>
              <div className="font-oswald text-2xl font-bold text-white pt-2 border-t border-gray-700">
                Starting at <span className="text-moyee-yellow">€{recommendedProduct.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={() => {
                  addToCart(recommendedProduct, '250g', 'Whole Beans', 1);
                  closeModal();
                }}
                className="bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-sm font-bold uppercase px-6 py-3.5 rounded-xl shadow-xl border-2 border-moyee-yellow flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-moyee-yellow" />
                <span>Add Directly to Basket</span>
              </button>

              <button
                onClick={handleLocateOnShelf}
                className="bg-gray-800 hover:bg-gray-700 text-white font-oswald text-sm font-bold uppercase px-6 py-3.5 rounded-xl border border-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-moyee-yellow" />
                <span>Locate on Virtual Shelf</span>
              </button>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* QUIZ QUESTIONS STEPPER                                   */
          /* ======================================================== */
          <div>
            <div className="flex items-center space-x-2 text-moyee-yellow text-xs font-oswald uppercase font-bold tracking-widest mb-1">
              <span>FIND YOUR COFFEE • STEP {currentStep + 1} OF {QUESTIONS.length}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-moyee-pink h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            <h3 className="font-oswald text-2xl sm:text-3xl font-bold uppercase text-white mb-6">
              {QUESTIONS[currentStep].title}
            </h3>

            <div className="space-y-3 font-condensed">
              {QUESTIONS[currentStep].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(QUESTIONS[currentStep].field, opt.val)}
                  className="w-full p-4 rounded-2xl bg-moyee-dark/80 hover:bg-moyee-pink/20 border border-gray-700 hover:border-moyee-pink text-left font-condensed text-sm sm:text-base text-gray-200 hover:text-white transition-all flex items-center justify-between group shadow-md"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-moyee-yellow group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
