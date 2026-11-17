import React, { useState, useRef, useEffect } from 'react';
import {
  Compass,
  ShoppingBag,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  HelpCircle,
  Sparkles,
  Camera,
  RotateCcw,
  RotateCw,
  Eye,
  EyeOff,
  User,
  Car
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { STORE_ZONES } from '../../data/products';
import { playerState } from '../../utils/playerState';

// Live 60fps GTA V Bottom-Left Radar / Minimap (Zero React Re-renders via DOM Ref)
const GtaMinimap: React.FC<{ onOpenMap: () => void }> = ({ onOpenMap }) => {
  const playerMarkerRef = useRef<HTMLDivElement>(null);
  const carMarkerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const updateRadar = () => {
      // Map world X (-26..26) -> 0..100%, world Z (-16..32) -> 0..100%
      if (playerMarkerRef.current) {
        const px = Math.max(4, Math.min(96, ((playerState.x + 26) / 52) * 100));
        const pz = Math.max(4, Math.min(96, ((playerState.z + 16) / 48) * 100));
        const deg = (-playerState.yaw * 180) / Math.PI;
        playerMarkerRef.current.style.left = `${px}%`;
        playerMarkerRef.current.style.top = `${pz}%`;
        playerMarkerRef.current.style.transform = `translate(-50%, -50%) rotate(${deg}deg)`;
      }
      if (carMarkerRef.current) {
        const cx = Math.max(4, Math.min(96, ((playerState.carX + 26) / 52) * 100));
        const cz = Math.max(4, Math.min(96, ((playerState.carZ + 16) / 48) * 100));
        carMarkerRef.current.style.left = `${cx}%`;
        carMarkerRef.current.style.top = `${cz}%`;
      }
      rafId = requestAnimationFrame(updateRadar);
    };
    rafId = requestAnimationFrame(updateRadar);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      onClick={onOpenMap}
      title="Click to Open Full GTA Pause Map (M)"
      className="pointer-events-auto cursor-pointer group select-none w-44 sm:w-56 shadow-[0_10px_35px_rgba(0,0,0,0.9)] transition-transform hover:scale-[1.02]"
    >
      {/* Radar Viewport Frame */}
      <div className="relative h-28 sm:h-32 bg-[#121820]/90 border-2 border-white/30 rounded-t-md overflow-hidden backdrop-blur-md">
        {/* Subtle Los Santos GPS Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)',
            backgroundSize: '18px 18px'
          }}
        />

        {/* Boulevard Roadway Strip at bottom of radar (Z: 18..32 -> top: 70%..100%) */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[#1E2530] border-t border-yellow-500/40 flex items-center justify-around">
          <div className="w-full border-t border-dashed border-yellow-400/50" />
        </div>

        {/* Store Interior Floorplan Outline (X: -13..13 -> left 25%..75%, Z: -16..14 -> top 0%..63%) */}
        <div className="absolute left-[25%] right-[25%] top-[2%] h-[62%] bg-[#1B222C]/90 border border-white/40">
          {/* Tasting Bar Blip (Yellow Cup) */}
          <div
            style={{ left: '32%', top: '20%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 border border-black shadow"
            title="Espresso Tasting Bar"
          />
          {/* Cashier Blip (Green $) */}
          <div
            style={{ left: '68%', top: '20%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 text-black text-[8px] font-black flex items-center justify-center border border-black"
            title="Cashier Checkout"
          >
            $
          </div>
          {/* Origin Globe Blip (Cyan) */}
          <div
            style={{ left: '50%', top: '10%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 border border-black"
            title="3D Origin Globe"
          />
          {/* Left & Right Product Shelf Markers */}
          <div className="absolute left-0.5 top-[35%] bottom-[25%] w-1 bg-amber-500/80 rounded" />
          <div className="absolute right-0.5 top-[35%] bottom-[25%] w-1 bg-amber-500/80 rounded" />
        </div>

        {/* Driveable Pegassi GT Car Blip on Boulevard */}
        <div
          ref={carMarkerRef}
          style={{ left: '33%', top: '80%' }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-1.5 bg-red-500 border border-white rounded-[1px] shadow"
          title="Pegassi GT Sports Car"
        />

        {/* Live Player Directional Arrow & View Cone */}
        <div
          ref={playerMarkerRef}
          style={{ left: '50%', top: '80%' }}
          className="absolute z-20 pointer-events-none"
        >
          {/* Subtle View Cone */}
          <div
            className="w-0 h-0 mx-auto -mb-1 opacity-35"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '14px solid #FFFFFF'
            }}
          />
          {/* GTA V White Player Arrow with Black Outline */}
          <div
            className="w-0 h-0 mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,1)]"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: '11px solid #FFFFFF'
            }}
          />
        </div>

        {/* North 'N' Indicator */}
        <div className="absolute top-1 right-1.5 bg-black/80 text-white font-oswald text-[9px] font-bold px-1 rounded border border-white/20">
          N
        </div>
        <div className="absolute bottom-1 left-1.5 text-[9px] font-oswald uppercase tracking-wider text-gray-300 bg-black/70 px-1.5 rounded">
          [M] GPS MAP
        </div>
      </div>

      {/* Iconic GTA V 3-Segment Health / Armor / Stamina Bar Under Radar */}
      <div className="h-2.5 bg-black/95 border-x-2 border-b-2 border-white/30 rounded-b-md flex gap-1 p-0.5">
        {/* Green Health Bar (50%) */}
        <div className="w-1/2 h-full bg-emerald-950 overflow-hidden">
          <div className="w-full h-full bg-[#22C55E]" />
        </div>
        {/* Blue Armor Bar (25%) */}
        <div className="w-1/4 h-full bg-sky-950 overflow-hidden">
          <div className="w-full h-full bg-[#38BDF8]" />
        </div>
        {/* Yellow Special Ability / Stamina Bar (25%) */}
        <div className="w-1/4 h-full bg-amber-950 overflow-hidden">
          <div className="w-full h-full bg-[#FACC15] animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export const HUD: React.FC = () => {
  const {
    currentZone,
    getCartTotals,
    openModal,
    teleportToZone,
    dayNightMode,
    toggleDayNight,
    isAudioMuted,
    toggleAudio,
    foundBeanIds,
    isPointerLocked,
    rotatePlayerY,
    turnAround180,
    cameraMode,
    toggleCameraMode,
    isDriving,
    nearCar,
    toggleDriving
  } = useStore();

  const [isTeleportOpen, setIsTeleportOpen] = useState(false);
  const turnIntervalRef = useRef<number | null>(null);

  const startTurning = (direction: 'left' | 'right') => {
    const delta = direction === 'left' ? 0.35 : -0.35;
    rotatePlayerY(delta);

    if (turnIntervalRef.current) clearInterval(turnIntervalRef.current);
    turnIntervalRef.current = setInterval(() => {
      rotatePlayerY(direction === 'left' ? 0.08 : -0.08);
    }, 30);
  };

  const stopTurning = () => {
    if (turnIntervalRef.current) {
      clearInterval(turnIntervalRef.current);
      turnIntervalRef.current = null;
    }
  };

  const togglePointerLock = () => {
    const canvas = document.querySelector('canvas');
    if (document.pointerLockElement) {
      document.exitPointerLock?.();
    } else if (canvas) {
      canvas.requestPointerLock?.();
    }
  };

  const totals = getCartTotals();
  const currentZoneObj = STORE_ZONES.find((z) => z.id === currentZone);

  const handlePhotoCapture = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `origin-roastery-gtav-${Date.now()}.png`;
      a.click();
    }
  };

  // GTA V Wanted Stars count (lights up with found golden beans or while driving fast!)
  const wantedLevel = Math.max(isDriving ? 2 : 1, foundBeanIds.length);
  const playerBankCash = 2500 + foundBeanIds.length * 250;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-3 md:p-5 select-none font-sans">
      {/* ======================================================== */}
      {/* 1. TOP BAR: GTA V HELP BOX (LEFT) & CASH/STARS (RIGHT)   */}
      {/* ======================================================== */}
      <header className="flex items-start justify-between gap-3">
        {/* Top-Left: Authentic GTA V Translucent Black Help / Mission Box */}
        <div className="flex flex-col gap-2 max-w-xs sm:max-w-md">
          <div className="pointer-events-auto bg-black/85 border-l-4 border-yellow-400 px-3.5 py-2.5 rounded-r-lg shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between gap-2">
              <span className="font-oswald text-xs sm:text-sm font-bold uppercase tracking-wider text-yellow-400">
                {isDriving
                  ? '🏎️ LOS SANTOS BOULEVARD — DRIVING'
                  : '☕ ORIGIN ROASTERY — ROCKFORD HILLS'}
              </span>
              <span className="bg-white/15 text-white text-[9px] font-oswald px-1.5 py-0.2 rounded uppercase">
                {cameraMode === 'third_person' ? '3RD PERSON' : '1ST PERSON'}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-200 font-condensed mt-0.5 leading-snug">
              {isDriving ? (
                <>
                  Press <kbd className="bg-white text-black px-1 rounded font-bold">W</kbd>{' '}
                  <kbd className="bg-white text-black px-1 rounded font-bold">S</kbd> to drive,{' '}
                  <kbd className="bg-white text-black px-1 rounded font-bold">A</kbd>{' '}
                  <kbd className="bg-white text-black px-1 rounded font-bold">D</kbd> to steer, or{' '}
                  <kbd className="bg-yellow-400 text-black px-1 rounded font-bold">G</kbd> to exit vehicle.
                </>
              ) : nearCar ? (
                <>
                  Press <kbd className="bg-yellow-400 text-black px-1.5 rounded font-bold">G</kbd> or click button below to enter the{' '}
                  <strong className="text-red-400">Pegassi GT Sports Car</strong>.
                </>
              ) : (
                <>
                  Press <kbd className="bg-white text-black px-1 rounded font-bold">V</kbd> to switch Camera View,{' '}
                  <kbd className="bg-white text-black px-1 rounded font-bold">SHIFT</kbd> to Sprint, or walk into yellow markers.
                </>
              )}
            </p>
          </div>

          {/* Contextual Drive / Exit Vehicle Action Pill */}
          {(nearCar || isDriving) && (
            <button
              onClick={toggleDriving}
              className="pointer-events-auto self-start flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-black font-oswald font-black text-xs uppercase tracking-wider px-4 py-2 rounded-lg shadow-2xl transition-transform active:scale-95"
            >
              <Car className="w-4 h-4" />
              <span>{isDriving ? 'EXIT VEHICLE [G]' : 'DRIVE PEGASSI GT [G]'}</span>
            </button>
          )}
        </div>

        {/* Top-Right: Iconic GTA V Wanted Stars, Cash Counter & Quick Tools */}
        <div className="flex flex-col items-end gap-1.5">
          {/* 5 Wanted Stars Row */}
          <div
            onClick={() => openModal('how_to_play')}
            title="Golden Bean Wanted Level (Collect all 5 Golden Beans for 15% OFF!)"
            className="pointer-events-auto cursor-pointer flex items-center space-x-1 bg-black/65 px-2.5 py-1 rounded-full border border-white/10"
          >
            {[1, 2, 3, 4, 5].map((starIdx) => (
              <span
                key={starIdx}
                className={`text-base sm:text-lg leading-none transition-all ${
                  starIdx <= wantedLevel
                    ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]'
                    : 'text-gray-600/70'
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-[10px] font-oswald text-gray-300 uppercase ml-1.5">
              {foundBeanIds.length}/5 BEANS
            </span>
          </div>

          {/* GTA V Bold Green Cash Display */}
          <div className="font-oswald text-2xl sm:text-3xl font-black tracking-tight text-[#4ADE80] drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] leading-none">
            ${playerBankCash.toLocaleString()}
          </div>

          {/* Utility Buttons Row */}
          <div className="pointer-events-auto flex items-center space-x-1.5 mt-1">
            {/* Toggle 3rd-Person / 1st-Person GTA Camera [V] */}
            <button
              onClick={toggleCameraMode}
              className="flex items-center space-x-1.5 bg-black/85 hover:bg-yellow-400 hover:text-black text-white border border-white/25 px-3 py-1.5 rounded-full text-xs font-oswald uppercase font-bold transition-all shadow-lg"
              title="Toggle 3rd-Person / 1st-Person View (V)"
            >
              <User className="w-3.5 h-3.5 text-yellow-400" />
              <span>{cameraMode === 'third_person' ? '3RD CAM (V)' : '1ST CAM (V)'}</span>
            </button>

            {/* Snapmatic Photo Mode */}
            <button
              onClick={handlePhotoCapture}
              className="p-2 rounded-full bg-black/85 border border-white/20 hover:border-yellow-400 text-gray-200 hover:text-yellow-400 transition-all shadow-md"
              title="Snapmatic Photo Capture"
            >
              <Camera className="w-4 h-4" />
            </button>

            {/* Day / Night Toggle */}
            <button
              onClick={toggleDayNight}
              className="p-2 rounded-full bg-black/85 border border-white/20 hover:border-yellow-400 text-gray-200 transition-all shadow-md"
              title="Toggle Los Santos Sunset / Night"
            >
              {dayNightMode === 'day' ? (
                <Sun className="w-4 h-4 text-yellow-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400" />
              )}
            </button>

            {/* Audio Mute Toggle */}
            <button
              onClick={toggleAudio}
              className="p-2 rounded-full bg-black/85 border border-white/20 hover:border-white text-gray-200 transition-all shadow-md"
              title="Toggle Sound"
            >
              {isAudioMuted ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Controls Help */}
            <button
              onClick={() => openModal('how_to_play')}
              className="p-2 rounded-full bg-black/85 border border-white/20 hover:border-white text-gray-200 transition-all shadow-md"
              title="Controls & Guide"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. CENTER RETICLE DOT                                    */}
      {/* ======================================================== */}
      {isPointerLocked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_4px_#000]" />
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. BOTTOM HUD: GTA V RADAR (LEFT) & ACTIONS (RIGHT)      */}
      {/* ======================================================== */}
      <footer className="flex flex-col gap-2.5">
        {/* Fast-Travel Waypoints Bar (Collapsible) */}
        {isTeleportOpen && (
          <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full">
            <div className="bg-black/90 border border-yellow-400/50 p-2 rounded-xl backdrop-blur-md shadow-2xl flex items-center space-x-2">
              <span className="font-oswald text-xs uppercase font-bold text-yellow-400 px-2">
                Fast Travel:
              </span>
              {STORE_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    teleportToZone(zone.id);
                    setIsTeleportOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-oswald uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
                    currentZone === zone.id
                      ? 'bg-yellow-400 text-black shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-gray-200'
                  }`}
                >
                  {zone.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end justify-between gap-3">
          {/* Bottom-Left: GTA V Live Minimap + Look Controls */}
          <div className="flex items-end space-x-3">
            <GtaMinimap onOpenMap={() => openModal('store_map')} />

            {/* Look & Fast-Travel Controls Cluster */}
            <div className="pointer-events-auto hidden sm:flex flex-col gap-1.5">
              <button
                onClick={() => setIsTeleportOpen(!isTeleportOpen)}
                className="flex items-center space-x-1.5 bg-black/85 hover:bg-yellow-400 hover:text-black border border-white/25 px-3 py-1.5 rounded-lg text-white font-oswald text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <Compass className="w-3.5 h-3.5 text-yellow-400" />
                <span>Fast Travel</span>
              </button>

              <div className="flex items-center space-x-1 bg-black/85 border border-white/25 px-2 py-1 rounded-lg shadow-xl">
                <button
                  onMouseDown={() => startTurning('left')}
                  onMouseUp={stopTurning}
                  onMouseLeave={stopTurning}
                  onTouchStart={() => startTurning('left')}
                  onTouchEnd={stopTurning}
                  className="p-1.5 rounded bg-white/10 hover:bg-yellow-400 hover:text-black text-white transition-all"
                  title="Turn Left (← / Q)"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onMouseDown={() => startTurning('right')}
                  onMouseUp={stopTurning}
                  onMouseLeave={stopTurning}
                  onTouchStart={() => startTurning('right')}
                  onTouchEnd={stopTurning}
                  className="p-1.5 rounded bg-white/10 hover:bg-yellow-400 hover:text-black text-white transition-all"
                  title="Turn Right (→ / E)"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={turnAround180}
                  className="px-2 py-1 rounded bg-white/10 hover:bg-yellow-400 hover:text-black text-[10px] font-oswald font-bold text-white transition-all"
                  title="Look 180° Behind"
                >
                  180°
                </button>
                <button
                  onClick={togglePointerLock}
                  className={`p-1.5 rounded transition-all ${
                    isPointerLocked
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white/10 hover:bg-white/20 text-gray-200'
                  }`}
                  title="Lock Mouse Look"
                >
                  {isPointerLocked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom-Right: GTA V Street/Location Name Ticker & Basket */}
          <div className="flex flex-col items-end gap-2">
            {/* Classic GTA V Bottom-Right Zone & Street Name Readout */}
            <div className="text-right pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
              <div className="font-oswald text-lg sm:text-2xl font-bold uppercase tracking-wider text-white leading-none">
                {currentZoneObj?.title || 'Eclipse Boulevard'}
              </div>
              <div className="font-condensed text-xs sm:text-sm text-yellow-400 uppercase tracking-widest font-bold">
                {currentZone === 'exterior'
                  ? 'Rockford Hills • Los Santos'
                  : `Origin Roastery • ${currentZoneObj?.subtitle || 'Showroom'}`}
              </div>
            </div>

            {/* Shopping Basket Trigger */}
            <button
              onClick={() => openModal('cart_drawer')}
              className="pointer-events-auto flex items-center space-x-2.5 bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-2xl border-2 border-yellow-400/80 transition-all transform hover:scale-105 active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totals.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totals.itemCount}
                  </span>
                )}
              </div>
              <span>INVENTORY / CART (B)</span>
              <span className="bg-black/30 px-2 py-0.5 rounded text-xs text-yellow-300">
                €{totals.total.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
