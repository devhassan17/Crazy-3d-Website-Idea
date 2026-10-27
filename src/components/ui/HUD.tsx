import React, { useState, useRef } from 'react';
import {
  Compass,
  ShoppingBag,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  HelpCircle,
  ExternalLink,
  Sparkles,
  Camera,
  RotateCcw,
  RotateCw,
  Eye,
  EyeOff,
  MoveHorizontal
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { STORE_ZONES } from '../../data/products';
import { StoreZoneId } from '../../types';

export const HUD: React.FC = () => {
  const {
    currentZone,
    cartItems,
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
    turnAround180
  } = useStore();

  const [isTeleportOpen, setIsTeleportOpen] = useState(false);
  const turnIntervalRef = useRef<number | null>(null);

  const startTurning = (direction: 'left' | 'right') => {
    // Immediate turn increment
    const delta = direction === 'left' ? 0.35 : -0.35;
    rotatePlayerY(delta);

    // Continuous smooth turning while button is held
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

  // Take Screenshot in Photo Mode
  const handlePhotoCapture = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `moyee-3d-coffee-world-${Date.now()}.png`;
      a.click();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-3 md:p-6 select-none font-sans">
      {/* ======================================================== */}
      {/* 1. TOP HEADER NAVIGATION BAR                             */}
      {/* ======================================================== */}
      <header className="flex items-center justify-between gap-3">
        {/* Moyee Brand Pill */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-moyee-charcoal/90 border border-moyee-pink/40 backdrop-blur-md px-4 py-2 rounded-full shadow-2xl">
          <div className="w-8 h-8 rounded-full bg-moyee-pink flex items-center justify-center font-oswald font-black text-white text-base shadow-md">
            M
          </div>
          <div>
            <h1 className="font-oswald text-sm md:text-base font-bold tracking-wider text-white uppercase flex items-center gap-1.5">
              MOYEE COFFEE
              <span className="hidden sm:inline-block bg-moyee-yellow text-moyee-charcoal text-[9px] px-1.5 py-0.2 rounded font-black tracking-normal">
                3D WORLD
              </span>
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-300 font-condensed">Odoo 18 Connected</span>
            </div>
          </div>
        </div>

        {/* Current Location Badge */}
        <div className="pointer-events-auto hidden md:flex items-center space-x-2 bg-moyee-dark/80 border border-moyee-yellow/30 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
          <Compass className="w-4 h-4 text-moyee-yellow animate-spin" style={{ animationDuration: '10s' }} />
          <span className="font-oswald text-xs uppercase font-bold text-white tracking-wide">
            {currentZoneObj?.title || 'Exploring'}
          </span>
          <span className="text-gray-400 text-xs">•</span>
          <span className="font-condensed text-xs text-moyee-yellow">
            {currentZoneObj?.subtitle || 'Moyee Store'}
          </span>
        </div>

        {/* Quick Utility Tools */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {/* Golden Bean Hunt Tracker */}
          <button
            onClick={() => openModal('how_to_play')}
            className="flex items-center space-x-1.5 bg-moyee-charcoal/90 border border-yellow-500/40 hover:border-yellow-400 px-3 py-1.5 rounded-full backdrop-blur-md transition-all shadow-md group"
            title="Golden Bean Hunt"
          >
            <Sparkles className="w-4 h-4 text-moyee-yellow group-hover:rotate-12 transition-transform" />
            <span className="font-oswald text-xs font-bold text-white">
              {foundBeanIds.length}/5
            </span>
            <span className="hidden lg:inline text-[10px] text-gray-300 font-condensed">Beans</span>
          </button>

          {/* Photo Mode Snapshot */}
          <button
            onClick={handlePhotoCapture}
            className="p-2 rounded-full bg-moyee-charcoal/90 border border-white/10 hover:border-moyee-pink text-gray-200 hover:text-moyee-pink backdrop-blur-md transition-all shadow-md"
            title="Take Photo"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Day / Night Toggle */}
          <button
            onClick={toggleDayNight}
            className="p-2 rounded-full bg-moyee-charcoal/90 border border-white/10 hover:border-moyee-yellow text-gray-200 hover:text-moyee-yellow backdrop-blur-md transition-all shadow-md"
            title="Toggle Day/Night"
          >
            {dayNightMode === 'day' ? <Sun className="w-4 h-4 text-moyee-yellow" /> : <Moon className="w-4 h-4 text-blue-400" />}
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={toggleAudio}
            className="p-2 rounded-full bg-moyee-charcoal/90 border border-white/10 hover:border-white text-gray-200 backdrop-blur-md transition-all shadow-md"
            title="Toggle Sound"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
          </button>

          {/* How to Play */}
          <button
            onClick={() => openModal('how_to_play')}
            className="p-2 rounded-full bg-moyee-charcoal/90 border border-white/10 hover:border-white text-gray-200 backdrop-blur-md transition-all shadow-md"
            title="How to Play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Switch to Classic Website */}
          <a
            href="https://www.moyeecoffee.com/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center space-x-1.5 bg-gray-800/90 hover:bg-gray-700 text-gray-200 text-xs font-condensed font-bold px-3 py-2 rounded-full border border-gray-600 transition-all shadow-md"
          >
            <span>Classic Web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. CENTER CROSSHAIR FOR POINTER LOCK                     */}
      {/* ======================================================== */}
      {isPointerLocked && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-moyee-pink border border-white opacity-80" />
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. BOTTOM ACTION BAR & NAVIGATION DOCK                   */}
      {/* ======================================================== */}
      <footer className="flex flex-col gap-3">
        {/* Teleport Quick Waypoints Dock (Collapsible) */}
        {isTeleportOpen && (
          <div className="pointer-events-auto flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            <div className="bg-moyee-charcoal/95 border border-moyee-pink/40 p-2 rounded-2xl backdrop-blur-md shadow-2xl flex items-center space-x-2">
              <span className="font-oswald text-xs uppercase font-bold text-moyee-yellow px-2">
                Teleport:
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
                      ? 'bg-moyee-pink text-white shadow-md'
                      : 'bg-moyee-dark hover:bg-gray-800 text-gray-300 hover:text-white'
                  }`}
                >
                  {zone.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Primary Bottom Navigation Bar */}
        <div className="flex items-center justify-between gap-3">
          {/* Left Actions: Map, Teleport, & Look Controls */}
          <div className="pointer-events-auto flex items-center space-x-2 flex-wrap gap-y-2">
            {/* Interactive Map Button */}
            <button
              onClick={() => openModal('store_map')}
              className="flex items-center space-x-2 bg-moyee-charcoal/90 hover:bg-moyee-charcoal border-2 border-moyee-yellow px-4 py-2.5 rounded-full shadow-2xl text-white font-oswald font-bold text-sm uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 backdrop-blur-md"
            >
              <Compass className="w-4 h-4 text-moyee-yellow" />
              <span>STORE MAP (M)</span>
            </button>

            {/* Fast Teleport Trigger */}
            <button
              onClick={() => setIsTeleportOpen(!isTeleportOpen)}
              className="flex items-center space-x-1.5 bg-moyee-dark/80 hover:bg-moyee-dark border border-white/20 px-3.5 py-2.5 rounded-full text-white font-oswald text-xs uppercase tracking-wider transition-all backdrop-blur-md"
            >
              <RotateCcw className="w-3.5 h-3.5 text-moyee-pink" />
              <span className="hidden sm:inline">Jump to Section</span>
            </button>

            {/* Camera Look Controller (Left / Right / 180 / FPS Mode) */}
            <div className="flex items-center space-x-1 bg-moyee-charcoal/90 border border-moyee-yellow/40 px-2 py-1.5 rounded-full shadow-2xl backdrop-blur-md">
              <span className="text-[10px] font-oswald uppercase font-bold text-moyee-yellow px-1 hidden sm:inline">
                Look:
              </span>
              {/* Turn Left Button */}
              <button
                onMouseDown={() => startTurning('left')}
                onMouseUp={stopTurning}
                onMouseLeave={stopTurning}
                onTouchStart={() => startTurning('left')}
                onTouchEnd={stopTurning}
                className="p-1.5 rounded-full bg-moyee-dark hover:bg-moyee-pink text-white transition-all active:scale-90"
                title="Turn Left (← / Q) - Click or hold"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Turn Right Button */}
              <button
                onMouseDown={() => startTurning('right')}
                onMouseUp={stopTurning}
                onMouseLeave={stopTurning}
                onTouchStart={() => startTurning('right')}
                onTouchEnd={stopTurning}
                className="p-1.5 rounded-full bg-moyee-dark hover:bg-moyee-pink text-white transition-all active:scale-90"
                title="Turn Right (→ / E) - Click or hold"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Turn 180° Button */}
              <button
                onClick={turnAround180}
                className="px-2 py-1 rounded-full bg-moyee-dark hover:bg-moyee-yellow hover:text-moyee-charcoal text-[11px] font-oswald font-bold text-gray-200 transition-all active:scale-90"
                title="Look Behind (180°)"
              >
                180°
              </button>

              {/* FPS Pointer Lock Toggle Button */}
              <button
                onClick={togglePointerLock}
                className={`p-1.5 rounded-full transition-all active:scale-90 ${
                  isPointerLocked
                    ? 'bg-moyee-pink text-white'
                    : 'bg-moyee-dark hover:bg-gray-700 text-gray-300 hover:text-white'
                }`}
                title={isPointerLocked ? 'Exit Mouse Look (Esc)' : 'Lock Mouse Look (FPS Mode)'}
              >
                {isPointerLocked ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Desktop Controls Hint Helper */}
          <div className="hidden xl:flex items-center space-x-3 bg-moyee-charcoal/70 border border-white/10 px-4 py-2 rounded-full text-xs font-condensed text-gray-300 backdrop-blur-md">
            <span><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-white border border-gray-600">W A S D</kbd> Walk</span>
            <span><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-white border border-gray-600">← →</kbd> / <kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-white border border-gray-600">Q E</kbd> Look Left/Right</span>
            <span><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-white border border-gray-600">Drag Mouse</kbd> Look 360°</span>
            <span><kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-white border border-gray-600">Click Floor</kbd> Glide</span>
          </div>

          {/* Right Action: Shopping Basket & Checkout */}
          <div className="pointer-events-auto flex items-center space-x-2">
            <button
              onClick={() => openModal('cart_drawer')}
              className="flex items-center space-x-2.5 bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald font-bold text-sm uppercase tracking-wider px-5 py-2.5 rounded-full shadow-2xl border-2 border-white/20 transition-all transform hover:scale-105 active:scale-95"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {totals.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-moyee-yellow text-moyee-charcoal text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {totals.itemCount}
                  </span>
                )}
              </div>
              <span>BASKET (B)</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                €{totals.total.toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
