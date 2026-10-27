import React, { useState, useRef, useEffect } from 'react';
import {
  Zap,
  RotateCcw,
  RotateCw,
  ShoppingBag,
  Info,
  X,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Hand
} from 'lucide-react';
import { useStore } from '../../store/useStore';

export const MobileControls: React.FC = () => {
  const {
    activeModal,
    setMobileJoystickInput,
    isSprinting,
    toggleSprint,
    rotatePlayerY,
    turnAround180,
    nearbyProduct,
    setNearbyProduct,
    quickPickProduct,
    openProductDetail,
    toastMessage
  } = useStore();

  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const touchIdRef = useRef<number | null>(null);
  const baseCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const maxRadius = 45; // Max travel in pixels

  const updateJoystick = (clientX: number, clientY: number) => {
    const dx = clientX - baseCenterRef.current.x;
    const dy = clientY - baseCenterRef.current.y;
    const distance = Math.hypot(dx, dy);

    let clampedX = dx;
    let clampedY = dy;

    if (distance > maxRadius) {
      clampedX = (dx / distance) * maxRadius;
      clampedY = (dy / distance) * maxRadius;
    }

    setKnobPos({ x: clampedX, y: clampedY });

    // Normalized coordinates:
    // Drag UP (negative Y on screen) -> move forward (negative Z in 3D)
    // Drag DOWN (positive Y on screen) -> move backward (positive Z in 3D)
    const normX = clampedX / maxRadius;
    const normY = clampedY / maxRadius;

    setMobileJoystickInput({ x: normX, y: normY });
  };

  // Touch Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeModal !== null) return;
    const touch = e.changedTouches[0];
    touchIdRef.current = touch.identifier;

    if (joystickBaseRef.current) {
      const rect = joystickBaseRef.current.getBoundingClientRect();
      baseCenterRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }

    setIsDragging(true);
    updateJoystick(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || activeModal !== null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        updateJoystick(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        setIsDragging(false);
        setKnobPos({ x: 0, y: 0 });
        touchIdRef.current = null;
        setMobileJoystickInput({ x: 0, y: 0 });
        break;
      }
    }
  };

  // Mouse Handlers for Desktop Testing
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeModal !== null) return;
    if (joystickBaseRef.current) {
      const rect = joystickBaseRef.current.getBoundingClientRect();
      baseCenterRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
    setIsDragging(true);
    updateJoystick(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (isDragging && touchIdRef.current === null) {
        updateJoystick(e.clientX, e.clientY);
      }
    };

    const handleWindowMouseUp = () => {
      if (isDragging && touchIdRef.current === null) {
        setIsDragging(false);
        setKnobPos({ x: 0, y: 0 });
        setMobileJoystickInput({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDragging]);

  return (
    <>
      {/* ======================================================== */}
      {/* 1. FLOATING TOAST NOTIFICATION (Top Center)              */}
      {/* ======================================================== */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-20 inset-x-0 z-50 flex justify-center pointer-events-none px-4 animate-fadeIn">
          <div className="pointer-events-auto bg-moyee-charcoal/95 border-2 border-moyee-pink px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center space-x-2.5 text-white max-w-md">
            <span className="w-2.5 h-2.5 rounded-full bg-moyee-yellow animate-ping flex-shrink-0" />
            <span className="font-oswald text-xs sm:text-sm font-bold tracking-wide uppercase truncate">
              {toastMessage}
            </span>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PROXIMITY "PICK UP COFFEE" FLOATING CARD              */}
      {/* ======================================================== */}
      {nearbyProduct && activeModal === null && (
        <div className="fixed bottom-24 sm:bottom-28 inset-x-3 sm:inset-x-auto sm:right-6 z-40 flex justify-center sm:justify-end pointer-events-none animate-fadeIn">
          <div className="pointer-events-auto bg-moyee-charcoal/95 border-2 border-moyee-yellow rounded-2xl p-3.5 shadow-2xl backdrop-blur-md w-full max-w-sm sm:w-80 text-white">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center space-x-2.5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: nearbyProduct.colorHex }}
                >
                  ☕
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] bg-moyee-yellow text-moyee-charcoal font-black font-oswald uppercase px-1.5 py-0.2 rounded">
                      {nearbyProduct.badge || 'SPECIALTY'}
                    </span>
                    <span className="text-xs font-condensed text-gray-300">
                      {nearbyProduct.roastLevel} Roast
                    </span>
                  </div>
                  <h4 className="font-oswald text-sm font-bold uppercase text-white truncate max-w-[170px]">
                    {nearbyProduct.name}
                  </h4>
                </div>
              </div>
              <button
                onClick={() => setNearbyProduct(null)}
                className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Flavor Notes Pill */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none text-[10px] text-gray-300 font-condensed">
              {nearbyProduct.flavorNotes.slice(0, 3).map((note, idx) => (
                <span key={idx} className="bg-gray-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                  {note}
                </span>
              ))}
            </div>

            {/* Quick Actions: Pick Up & Inspect */}
            <div className="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-gray-700/80">
              <button
                onClick={() => quickPickProduct(nearbyProduct)}
                className="flex items-center justify-center space-x-1.5 bg-moyee-pink hover:bg-moyee-pink-hover text-white text-xs font-oswald uppercase font-bold py-2 rounded-xl transition-all shadow-md active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Pick Up (€{nearbyProduct.price.toFixed(2)})</span>
              </button>
              <button
                onClick={() => openProductDetail(nearbyProduct)}
                className="flex items-center justify-center space-x-1 bg-moyee-dark hover:bg-gray-800 border border-white/20 text-gray-200 hover:text-white text-xs font-oswald uppercase font-bold py-2 rounded-xl transition-all active:scale-95"
              >
                <Info className="w-3.5 h-3.5 text-moyee-yellow" />
                <span>Details / Roast</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. VIRTUAL JOYSTICK (Bottom-Left)                         */}
      {/* ======================================================== */}
      <div className="fixed bottom-20 left-4 sm:left-8 z-30 pointer-events-none select-none">
        <div
          ref={joystickBaseRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseDown={handleMouseDown}
          className={`pointer-events-auto relative w-28 h-28 sm:w-32 sm:sm-32 rounded-full border-2 transition-colors cursor-grab active:cursor-grabbing backdrop-blur-md flex items-center justify-center ${
            isDragging
              ? 'bg-moyee-charcoal/80 border-moyee-yellow shadow-[0_0_25px_rgba(255,217,0,0.3)]'
              : 'bg-moyee-charcoal/50 border-white/20 hover:border-moyee-yellow/60 shadow-xl'
          }`}
          style={{ touchAction: 'none' }}
        >
          {/* Subtle Directional Compass Indicators */}
          <ChevronUp className="w-3.5 h-3.5 text-gray-400 absolute top-1.5 opacity-60" />
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute bottom-1.5 opacity-60" />
          <ChevronLeft className="w-3.5 h-3.5 text-gray-400 absolute left-1.5 opacity-60" />
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 absolute right-1.5 opacity-60" />

          {/* Center Crosshair Ring */}
          <div className="w-8 h-8 rounded-full border border-dashed border-white/20 pointer-events-none" />

          {/* Movable Thumbstick Knob */}
          <div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-moyee-pink to-moyee-yellow shadow-2xl flex items-center justify-center pointer-events-none transform transition-transform"
            style={{
              transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            <div className="w-4 h-4 rounded-full bg-white/40 shadow-inner" />
          </div>
        </div>
        <div className="text-center mt-1.5">
          <span className="text-[10px] font-condensed uppercase tracking-wider text-gray-300 bg-moyee-charcoal/80 px-2 py-0.5 rounded-full border border-white/10">
            Thumbstick • Move
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MOBILE ACTION BUTTONS (Bottom-Right Cluster)          */}
      {/* ======================================================== */}
      <div className="fixed bottom-20 right-4 sm:right-8 z-30 pointer-events-none flex flex-col items-end space-y-2 select-none">
        {/* Sprint / Fast Run Toggle */}
        <button
          onClick={toggleSprint}
          className={`pointer-events-auto flex items-center space-x-1.5 px-3 py-2 rounded-full border-2 transition-all shadow-xl active:scale-90 backdrop-blur-md ${
            isSprinting
              ? 'bg-moyee-yellow text-moyee-charcoal border-white shadow-[0_0_20px_rgba(255,217,0,0.4)]'
              : 'bg-moyee-charcoal/90 text-gray-300 border-white/20 hover:text-white'
          }`}
          title="Toggle Sprint Run"
        >
          <Zap className={`w-4 h-4 ${isSprinting ? 'fill-current animate-bounce' : ''}`} />
          <span className="font-oswald text-xs uppercase font-bold tracking-wider">
            {isSprinting ? 'RUNNING' : 'RUN'}
          </span>
        </button>

        {/* Quick Snap Turn Buttons */}
        <div className="pointer-events-auto flex items-center space-x-1.5 bg-moyee-charcoal/90 border border-white/20 p-1.5 rounded-full shadow-xl backdrop-blur-md">
          <button
            onClick={() => rotatePlayerY(Math.PI / 4)}
            className="p-2 rounded-full bg-moyee-dark hover:bg-moyee-pink text-white transition-all active:scale-90"
            title="Snap Turn Left 45°"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={turnAround180}
            className="px-2 py-1.5 rounded-full bg-moyee-dark hover:bg-moyee-yellow hover:text-moyee-charcoal text-white text-[10px] font-oswald font-bold transition-all active:scale-90"
            title="Turn 180°"
          >
            180°
          </button>
          <button
            onClick={() => rotatePlayerY(-Math.PI / 4)}
            className="p-2 rounded-full bg-moyee-dark hover:bg-moyee-pink text-white transition-all active:scale-90"
            title="Snap Turn Right 45°"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
