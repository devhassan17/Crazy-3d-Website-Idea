import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const CheckoutCounter: React.FC = () => {
  const { playerPosition, openModal, getCartTotals, activeModal } = useStore();
  const totals = getCartTotals();

  // Distance check for proximity highlight
  const playerVec = useMemo(() => new THREE.Vector3(...playerPosition), [playerPosition]);
  const counterVec = useMemo(() => new THREE.Vector3(4.5, 1.7, -9.5), []);
  const distance = playerVec.distanceTo(counterVec);
  const isNearby = distance < 4.5;

  return (
    <group position={[4.5, 0, -10]} rotation={[0, Math.PI, 0]}>
      {/* ======================================================== */}
      {/* 1. CHECKOUT COUNTER DESK                                 */}
      {/* ======================================================== */}
      {/* Main Counter Base (Dark Walnut & Black steel) */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 1.1, 1.4]} />
        <meshStandardMaterial color="#212529" roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Countertop Surface (Polished White Italian Marble) */}
      <mesh position={[0, 1.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.6]} />
        <meshStandardMaterial color="#F8F9FA" roughness={0.15} metalness={0.1} />
      </mesh>

      {/* Hot Pink Accent Strip around Counter */}
      <mesh position={[0, 0.95, 0.71]}>
        <boxGeometry args={[4.2, 0.06, 0.02]} />
        <meshStandardMaterial color="#E5007D" emissive="#E5007D" emissiveIntensity={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. CASHIER NPC (Liam)                                    */}
      {/* ======================================================== */}
      <group position={[0, 1.1, -0.4]}>
        {/* Torso with Moyee Apron */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.28, 0.8, 12]} />
          <meshStandardMaterial color="#272727" roughness={0.6} />
        </mesh>
        {/* Moyee Hot Pink Apron Patch */}
        <mesh position={[0, 0.55, 0.22]}>
          <boxGeometry args={[0.3, 0.5, 0.02]} />
          <meshStandardMaterial color="#E5007D" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#ECC8A8" roughness={0.8} />
        </mesh>
        {/* Barista Cap */}
        <mesh position={[0, 1.3, 0]}>
          <cylinderGeometry args={[0.19, 0.2, 0.1, 12]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. DIGITAL TOUCHSCREEN POS TERMINAL                      */}
      {/* ======================================================== */}
      <group position={[0.9, 1.18, 0.2]}>
        {/* POS Stand */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
          <meshStandardMaterial color="#111827" metalness={0.8} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.32, 0]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.55, 0.38, 0.04]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Live POS Display using HTML */}
        <Html position={[0, 0.32, 0.03]} rotation={[-0.4, 0, 0]} transform distanceFactor={4}>
          <div className="bg-moyee-dark text-white p-2 rounded w-44 font-condensed text-[10px] select-none border border-moyee-pink shadow-lg">
            <div className="flex justify-between items-center border-b border-gray-700 pb-1">
              <span className="font-bold text-moyee-yellow">ODOO 18 POS</span>
              <span className="bg-moyee-pink text-white text-[9px] px-1 rounded">LIVE</span>
            </div>
            <div className="py-1">
              <div className="flex justify-between">
                <span>Items in Cart:</span>
                <span className="font-bold text-white">{totals.itemCount}</span>
              </div>
              <div className="flex justify-between font-bold text-moyee-yellow">
                <span>Total:</span>
                <span>€{totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Html>
      </group>

      {/* Card Payment Pin Pad Terminal */}
      <group position={[0.2, 1.18, 0.3]}>
        <mesh rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.16, 0.08, 0.24]} />
          <meshStandardMaterial color="#1E2024" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Takeaway Moyee Coffee Cup Display on Counter */}
      <group position={[-1.2, 1.18, 0.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.07, 0.22, 12]} />
          <meshStandardMaterial color="#E5007D" roughness={0.5} />
        </mesh>
        {/* Lid */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.095, 0.095, 0.03, 12]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 4. LARGE ILLUMINATED CEILING SIGN                        */}
      {/* ======================================================== */}
      <group position={[0, 3.8, 0]}>
        {/* Hanging wire supports */}
        <mesh position={[-1.6, 0.8, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.6, 4]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
        <mesh position={[1.6, 0.8, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.6, 4]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
        {/* Sign Board */}
        <mesh castShadow>
          <boxGeometry args={[4.2, 0.9, 0.15]} />
          <meshStandardMaterial color="#111827" roughness={0.3} />
        </mesh>
        <Html position={[0, 0, 0.09]} center transform distanceFactor={7}>
          <div className="bg-moyee-charcoal/90 border-2 border-moyee-yellow px-6 py-2 rounded-xl text-center select-none shadow-2xl">
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white">
              CHECKOUT & PAYMENT
            </h3>
            <p className="text-[11px] font-condensed text-moyee-yellow font-bold uppercase tracking-widest">
              SECURE ODOO 18 CHECKOUT GATEWAY
            </p>
          </div>
        </Html>
        {/* Spot light onto counter */}
        <spotLight
          position={[0, 0, 0]}
          target-position={[0, -3.8, 0]}
          color="#FFF9C4"
          intensity={6}
          angle={0.6}
          penumbra={0.4}
        />
      </group>

      {/* ======================================================== */}
      {/* 5. INTERACTIVE PROXIMITY CALLOUT                         */}
      {/* ======================================================== */}
      {isNearby && activeModal === null && (
        <Html position={[0, 2.2, 0]} center distanceFactor={10}>
          <button
            onClick={() => openModal('checkout')}
            className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none animate-bounce"
          >
            <div className="bg-moyee-pink text-white font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-moyee-yellow">
              <span>💳 PAY & REVIEW BASKET ({totals.itemCount})</span>
            </div>
            <div className="bg-moyee-charcoal text-moyee-yellow text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-md mt-1 shadow-md">
              Click to Open Checkout Counter
            </div>
          </button>
        </Html>
      )}
    </group>
  );
};
