import React, { useState } from 'react';
import { X, Compass, MapPin, Navigation, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { STORE_ZONES } from '../../data/products';
import { StoreZone } from '../../types';

export const StoreMapModal: React.FC = () => {
  const { playerPosition, currentZone, teleportToZone, closeModal } = useStore();
  const [selectedZone, setSelectedZone] = useState<StoreZone>(
    STORE_ZONES.find((z) => z.id === currentZone) || STORE_ZONES[0]
  );

  // Convert 3D coordinates (X: -13 to 13, Z: -16 to 26) to map percentage (0 to 100)
  const mapX = ((playerPosition[0] + 13) / 26) * 100;
  // Z runs from -16 (top of map) to 26 (bottom of map)
  const mapY = ((playerPosition[2] - -16) / (26 - -16)) * 100;

  const handleTeleport = (zone: StoreZone) => {
    teleportToZone(zone.id);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-moyee-charcoal border-2 border-moyee-yellow rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center space-x-3 border-b border-gray-700/80 pb-4 mb-6">
          <span className="p-2.5 rounded-full bg-moyee-yellow text-moyee-charcoal font-black">
            <Compass className="w-6 h-6 animate-spin" style={{ animationDuration: '15s' }} />
          </span>
          <div>
            <h3 className="font-oswald text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
              INTERACTIVE 3D STORE MAP
            </h3>
            <p className="text-xs font-condensed text-gray-400">
              Live GPS Radar • Click Any Department to Fast-Travel Instantly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* ======================================================== */}
          {/* LEFT: 2D ARCHITECTURAL FLOORPLAN SCHEMATIC               */}
          {/* ======================================================== */}
          <div className="md:col-span-7 bg-moyee-dark/90 border-2 border-gray-700 rounded-2xl p-4 relative aspect-[4/5] overflow-hidden flex flex-col justify-between shadow-inner">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(#E5007D 1px, transparent 1px), linear-gradient(90deg, #E5007D 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Back Wall Boundary Indicator */}
            <div className="absolute top-2 left-6 right-6 h-3 bg-gray-700/80 rounded-t text-center text-[8px] font-oswald text-gray-400 uppercase tracking-widest">
              NORTH WALL • FAIRCHAIN IMPACT GALLERY
            </div>

            {/* Store Entrance Boundary Indicator */}
            <div className="absolute bottom-16 left-12 right-12 h-3 border-b-2 border-dashed border-moyee-pink text-center text-[9px] font-oswald text-moyee-pink uppercase tracking-widest">
              GLASS SLIDING ENTRANCE DOORS
            </div>

            {/* Street / Sidewalk Outside Area */}
            <div className="absolute bottom-1 left-4 right-4 h-12 bg-gray-900/60 rounded border border-gray-800 flex items-center justify-center text-[9px] font-oswald text-gray-500 uppercase">
              AMSTERDAM STREET PAVEMENT & TREES
            </div>

            {/* Live Player Position Marker ("YOU ARE HERE") */}
            <div
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-none flex flex-col items-center"
              style={{
                left: `${Math.max(5, Math.min(95, mapX))}%`,
                top: `${Math.max(5, Math.min(95, mapY))}%`
              }}
            >
              <div className="relative flex items-center justify-center">
                <span className="w-5 h-5 rounded-full bg-green-500/40 animate-ping absolute" />
                <span className="w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white shadow-lg" />
              </div>
              <span className="bg-green-600 text-white font-oswald text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow whitespace-nowrap mt-0.5">
                YOU ARE HERE
              </span>
            </div>

            {/* Interactive Zone Pins */}
            {STORE_ZONES.map((zone) => {
              const zX = ((zone.position[0] + 13) / 26) * 100;
              const zY = ((zone.position[2] - -16) / (26 - -16)) * 100;
              const isSelected = selectedZone.id === zone.id;

              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  style={{ left: `${zX}%`, top: `${zY}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 p-1.5 rounded-xl border transition-all text-xs flex items-center space-x-1 group shadow-lg ${
                    isSelected
                      ? 'bg-moyee-pink border-moyee-yellow text-white scale-110 ring-2 ring-moyee-yellow'
                      : 'bg-moyee-charcoal/90 border-gray-600 hover:border-moyee-pink text-gray-200'
                  }`}
                >
                  <MapPin
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-moyee-yellow' : 'text-gray-400 group-hover:text-moyee-pink'
                    }`}
                  />
                  <span className="font-oswald text-[10px] font-bold uppercase truncate max-w-[80px]">
                    {zone.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* RIGHT: SELECTED ZONE CARD & TELEPORT ACTION              */}
          {/* ======================================================== */}
          <div className="md:col-span-5 bg-moyee-dark/80 border border-gray-700 p-6 rounded-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center space-x-2 text-moyee-yellow">
                <Sparkles className="w-4 h-4" />
                <span className="font-oswald text-xs uppercase font-bold tracking-widest">
                  ZONE SPOTLIGHT
                </span>
              </div>

              <h4 className="font-oswald text-2xl font-bold uppercase text-white mt-1">
                {selectedZone.title}
              </h4>
              <p className="font-oswald text-xs text-moyee-pink uppercase font-semibold">
                {selectedZone.subtitle}
              </p>

              <div className="h-0.5 w-full bg-gray-700 my-3" />

              <p className="font-condensed text-sm text-gray-300 leading-relaxed">
                {selectedZone.description}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-moyee-charcoal/90 border border-gray-700 text-xs font-condensed text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>3D Coordinates:</span>
                  <span className="font-mono text-moyee-yellow">
                    [{selectedZone.position.map((n) => n.toFixed(1)).join(', ')}]
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Fast-Travel Status:</span>
                  <span className="text-green-400 font-bold">AVAILABLE</span>
                </div>
              </div>
            </div>

            {/* Fast Teleport Button */}
            <button
              onClick={() => handleTeleport(selectedZone)}
              className="w-full bg-moyee-yellow hover:bg-moyee-yellow-hover text-moyee-charcoal font-oswald text-base font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-2xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Navigation className="w-5 h-5 text-moyee-charcoal" />
              <span>TAKE ME THERE (TELEPORT)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
