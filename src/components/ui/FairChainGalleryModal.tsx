import React, { useState } from 'react';
import { X, Globe, ShieldCheck, ExternalLink, Leaf, Factory, Users, TrendingUp } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const FairChainGalleryModal: React.FC = () => {
  const { closeModal } = useStore();
  const [activeStep, setActiveStep] = useState<number>(0);

  const JOURNEY_STEPS = [
    {
      step: '1. COFFEE FARM',
      title: 'Biodiverse Agroforestry Canopy',
      icon: '🌱',
      location: 'Mizan & Limu (Ethiopia), Kericho (Kenya)',
      description:
        'Coffee cherries ripen slowly under indigenous shade canopies alongside banana and guava trees. No clear-cutting, no chemical pesticides. Smallholders earn 20% above the open market rate (Living Income Reference Price).',
      stat: '40,000+ trees planted annually'
    },
    {
      step: '2. ROASTING AT ORIGIN',
      title: 'State-of-the-Art Roasteries',
      icon: '🏭',
      location: 'Addis Ababa & Nairobi Facilities',
      description:
        'Instead of exporting raw green beans to Europe, we roast where coffee is grown. We operate a 400m² ISO-certified roastery in Addis Ababa and a 700m² facility in Kericho, roasting over 170,000 kg/year. Keeps 300% more economic value in Africa.',
      stat: '50/50 Shared Value Enterprise'
    },
    {
      step: '3. NITROGEN PACKAGING',
      title: 'Oxygen-Free Freshness Seal',
      icon: '🛡️',
      location: 'Origin Packaging Lines',
      description:
        'Immediately upon roasting, beans are flushed with food-grade nitrogen and sealed with one-way degassing valves. Displaces 99% of oxygen to freeze oxidation, delivering farm-fresh aromatics to European doorsteps.',
      stat: 'Peak aroma for 18+ months'
    },
    {
      step: '4. DIRECT DELIVERY',
      title: 'Climate-Neutral European Shipping',
      icon: '🚚',
      location: 'Turbinestraat 15, Amsterdam Hub',
      description:
        'Direct distribution to consumers and offices without western trader middlemen. Carbon emissions sequestered directly inside our own agroforestry supply chain.',
      stat: '~2,770 tons CO₂ sequestered yearly'
    },
    {
      step: '5. YOUR RADICAL CUP',
      title: 'Everyday Revolutionary Sip',
      icon: '☕',
      location: 'Your Kitchen or Office Barista',
      description:
        'Specialty grade 80+ cupping score coffee with zero price tag markup. Every sip actively breaks the cycle of generational poverty in coffee communities.',
      stat: '98% Customer Recommendation'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-moyee-charcoal border-2 border-moyee-pink rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-gray-700/80 pb-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-moyee-pink text-white flex items-center justify-center font-bold text-2xl shadow-lg border border-moyee-yellow">
            🌍
          </div>
          <div>
            <div className="inline-block bg-moyee-yellow text-moyee-charcoal text-[9px] font-oswald uppercase font-black px-2 py-0.2 rounded mb-0.5">
              FAIRCHAIN FOUNDATION • ANBI CERTIFIED
            </div>
            <h3 className="font-oswald text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
              THE FAIRCHAIN 50/50 REVOLUTION
            </h3>
            <p className="text-xs font-condensed text-gray-300">
              Not Another Label • Another World: Roasting at Origin & Living Incomes
            </p>
          </div>
        </div>

        {/* 50/50 vs 90/10 Infographic Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60">
            <span className="font-oswald text-xs uppercase text-red-400 font-bold tracking-wider">
              THE STATUS QUO: BIG COFFEE
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="font-oswald text-3xl font-black text-red-400">90% – 98%</span>
              <span className="text-xs text-gray-300 font-condensed">Value Lost to Traders</span>
            </div>
            <p className="font-condensed text-xs text-gray-400 mt-2">
              Multinationals buy unroasted green beans for pennies, keeping roasting and packaging profits in the Global North.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-green-950/40 border border-green-700/60">
            <span className="font-oswald text-xs uppercase text-green-400 font-bold tracking-wider">
              MOYEE FAIRCHAIN MODEL
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="font-oswald text-3xl font-black text-green-400">50 / 50</span>
              <span className="text-xs text-gray-300 font-condensed">Direct Shared Value</span>
            </div>
            <p className="font-condensed text-xs text-gray-300 mt-2">
              We roast and package at origin in Ethiopia & Kenya. Local partners co-own the enterprise and keep the value where beans are grown.
            </p>
          </div>
        </div>

        {/* The 5-Step Visual Supply Chain Journey */}
        <div className="my-6">
          <h4 className="font-oswald text-sm uppercase font-bold text-moyee-yellow mb-3">
            THE FAIRCHAIN JOURNEY: BEAN TO CUP
          </h4>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-5 gap-1.5 mb-4">
            {JOURNEY_STEPS.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-2 rounded-xl text-center font-condensed transition-all ${
                  activeStep === idx
                    ? 'bg-moyee-pink text-white font-bold shadow-lg scale-105'
                    : 'bg-moyee-dark text-gray-400 hover:text-white'
                }`}
              >
                <div className="text-lg">{s.icon}</div>
                <div className="text-[10px] font-oswald uppercase truncate mt-1">{s.step}</div>
              </button>
            ))}
          </div>

          {/* Active Step Details Card */}
          <div className="bg-moyee-dark/90 border border-moyee-pink/40 p-5 rounded-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-oswald text-xs uppercase font-bold text-moyee-yellow">
                  {JOURNEY_STEPS[activeStep].step}
                </span>
                <h5 className="font-oswald text-xl font-bold uppercase text-white mt-0.5">
                  {JOURNEY_STEPS[activeStep].title}
                </h5>
                <span className="text-xs text-gray-400 font-condensed block">
                  📍 {JOURNEY_STEPS[activeStep].location}
                </span>
              </div>
              <span className="bg-moyee-charcoal text-green-400 font-oswald text-xs font-bold uppercase px-3 py-1 rounded-full border border-green-500/40">
                {JOURNEY_STEPS[activeStep].stat}
              </span>
            </div>
            <p className="font-condensed text-sm text-gray-200 mt-3 leading-relaxed">
              {JOURNEY_STEPS[activeStep].description}
            </p>
          </div>
        </div>

        {/* Live Impact Dashboard Link */}
        <div className="pt-4 border-t border-gray-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-condensed">
          <div className="flex items-center space-x-2 text-gray-400">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            <span>Clean Claims Audited • Compliant with EUDR Deforestation Directive</span>
          </div>

          <a
            href="https://impactdashboard.moyeecoffee.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1.5 bg-moyee-yellow hover:bg-moyee-yellow-hover text-moyee-charcoal font-oswald text-xs font-bold uppercase px-4 py-2 rounded-xl transition-all shadow"
          >
            <span>VIEW LIVE IMPACT DASHBOARD</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
