import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { textureFactory } from '../../utils/textures';
import { ProximityHtml } from './ProximityHtml';

export const CheckoutCounter: React.FC = () => {
  const openModal = useStore((s) => s.openModal);
  const getCartTotals = useStore((s) => s.getCartTotals);
  // Subscribe to cartItems so the POS terminal updates when items change
  useStore((s) => s.cartItems);
  const totals = getCartTotals();

  const marbleTexture = useMemo(() => textureFactory.getMarbleTexture(false), []);

  return (
    <group position={[4.5, 0, -10]} rotation={[0, Math.PI, 0]}>
      {/* ======================================================== */}
      {/* 1. ARCHITECTURAL MARBLE & WALNUT CHECKOUT COUNTER        */}
      {/* ======================================================== */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 1.1, 1.4]} />
        <meshStandardMaterial color="#181A20" roughness={0.45} metalness={0.35} />
      </mesh>

      {/* Countertop Surface (Polished Italian Carrara Marble) */}
      <mesh position={[0, 1.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.6]} />
        <meshPhysicalMaterial
          map={marbleTexture}
          roughness={0.12}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Brushed Brass Accent Strip */}
      <mesh position={[0, 0.95, 0.71]}>
        <boxGeometry args={[4.2, 0.05, 0.02]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Glass Pastry & Croissant Display Case on Left of Counter */}
      <group position={[-1.25, 1.18, 0.15]}>
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[1.1, 0.44, 0.65]} />
          <meshPhysicalMaterial
            color="#F8FAFC"
            transparent
            opacity={0.32}
            roughness={0.05}
            clearcoat={1.0}
          />
        </mesh>
        {/* Brass Frame Base */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[1.14, 0.04, 0.68]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
        </mesh>
        {/* Artisanal Pastries Inside Display */}
        {[-0.3, 0, 0.3].map((px, idx) => (
          <mesh key={`pastry-${idx}`} position={[px, 0.12, 0]} castShadow>
            <sphereGeometry args={[0.1, 12, 10]} />
            <meshStandardMaterial color="#C87D32" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 2. ARTICULATED CASHIER NPC (Liam)                        */}
      {/* ======================================================== */}
      <group position={[0, 0, -0.95]}>
        {/* Legs / Trousers */}
        <mesh position={[-0.11, 0.45, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.9, 10]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        <mesh position={[0.11, 0.45, 0]}>
          <cylinderGeometry args={[0.08, 0.07, 0.9, 10]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Torso & Tailored Charcoal Shirt */}
        <mesh position={[0, 1.25, 0]} castShadow>
          <boxGeometry args={[0.46, 0.72, 0.26]} />
          <meshStandardMaterial color="#1F242D" roughness={0.65} />
        </mesh>
        {/* Leather Roastery Apron */}
        <mesh position={[0, 1.22, 0.14]}>
          <boxGeometry args={[0.38, 0.62, 0.02]} />
          <meshStandardMaterial color="#7C4D2B" roughness={0.45} />
        </mesh>
        {/* Shoulders & Arms */}
        <mesh position={[-0.29, 1.32, 0.08]} rotation={[-0.35, 0, 0.12]} castShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.58, 10]} />
          <meshStandardMaterial color="#1F242D" roughness={0.65} />
        </mesh>
        <mesh position={[0.29, 1.32, 0.08]} rotation={[-0.35, 0, -0.12]} castShadow>
          <cylinderGeometry args={[0.065, 0.055, 0.58, 10]} />
          <meshStandardMaterial color="#1F242D" roughness={0.65} />
        </mesh>
        {/* Neck & Head */}
        <mesh position={[0, 1.66, 0]}>
          <cylinderGeometry args={[0.065, 0.075, 0.14, 10]} />
          <meshStandardMaterial color="#E5B895" roughness={0.7} />
        </mesh>
        <mesh position={[0, 1.84, 0]} castShadow>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#E5B895" roughness={0.65} />
        </mesh>
        {/* Eyes & Facial Detail */}
        <mesh position={[-0.055, 1.86, 0.145]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[0.055, 1.86, 0.145]}>
          <sphereGeometry args={[0.018, 8, 8]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        {/* Styled Hair & Cap */}
        <mesh position={[0, 1.96, -0.02]}>
          <cylinderGeometry args={[0.165, 0.17, 0.1, 14]} />
          <meshStandardMaterial color="#18181B" roughness={0.8} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. DIGITAL TOUCHSCREEN POS TERMINAL                      */}
      {/* ======================================================== */}
      <group position={[0.9, 1.18, 0.2]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.3, 8]} />
          <meshStandardMaterial color="#18181B" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.32, 0]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.55, 0.38, 0.03]} />
          <meshStandardMaterial color="#090A0F" metalness={0.6} roughness={0.2} />
        </mesh>

        <ProximityHtml radius={3.5} position={[0, 0.32, 0.03]} rotation={[-0.4, 0, 0]} transform distanceFactor={4}>
          <div className="bg-moyee-dark text-white p-2 rounded w-44 font-condensed text-[10px] select-none border border-moyee-yellow/60 shadow-lg">
            <div className="flex justify-between items-center border-b border-gray-700 pb-1">
              <span className="font-bold text-moyee-yellow">ORIGIN POS</span>
              <span className="bg-emerald-600 text-white text-[9px] px-1 rounded">LIVE</span>
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
        </ProximityHtml>
      </group>

      {/* Contactless Card Reader Terminal */}
      <group position={[0.25, 1.18, 0.32]}>
        <mesh rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.15, 0.07, 0.22]} />
          <meshStandardMaterial color="#1E2024" roughness={0.25} metalness={0.75} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 4. ILLUMINATED CEILING SIGN                              */}
      {/* ======================================================== */}
      <group position={[0, 3.8, 0]}>
        <mesh position={[-1.6, 0.8, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.6, 4]} />
          <meshStandardMaterial color="#18181B" />
        </mesh>
        <mesh position={[1.6, 0.8, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.6, 4]} />
          <meshStandardMaterial color="#18181B" />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[4.2, 0.9, 0.14]} />
          <meshStandardMaterial color="#111317" roughness={0.3} metalness={0.5} />
        </mesh>
        <ProximityHtml radius={5.5} position={[0, 0, 0.09]} center transform distanceFactor={7}>
          <div className="bg-moyee-charcoal/95 border border-moyee-yellow/80 px-6 py-2 rounded-xl text-center select-none shadow-2xl">
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white">
              CHECKOUT & PAYMENT
            </h3>
            <p className="text-[11px] font-condensed text-moyee-yellow font-bold uppercase tracking-widest">
              EXPRESS POS & ORDER COUNTER
            </p>
          </div>
        </ProximityHtml>
      </group>

      {/* ======================================================== */}
      {/* 5. INTERACTIVE PROXIMITY CALLOUT                         */}
      {/* ======================================================== */}
      <ProximityHtml radius={3.5} position={[0, 2.2, 0]} center distanceFactor={10}>
        <button
          onClick={() => openModal('checkout')}
          className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none"
        >
          <div className="bg-moyee-pink text-white font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border border-moyee-yellow">
            <span>💳 PAY & REVIEW BASKET ({totals.itemCount})</span>
          </div>
          <div className="bg-moyee-charcoal text-moyee-yellow text-[10px] font-bold font-oswald uppercase px-2.5 py-0.5 rounded-md mt-1 shadow-md">
            Click to Open Checkout Counter
          </div>
        </button>
      </ProximityHtml>
    </group>
  );
};
