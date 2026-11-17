import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { sounds } from '../../utils/audio';
import { textureFactory } from '../../utils/textures';
import { ProximityHtml } from './ProximityHtml';

export const TastingBar: React.FC = () => {
  const openModal = useStore((s) => s.openModal);
  const steamRef = useRef<THREE.Group>(null);
  const darkMarbleTexture = useMemo(() => textureFactory.getMarbleTexture(true), []);

  useFrame(({ clock }) => {
    if (steamRef.current) {
      const t = clock.getElapsedTime();
      steamRef.current.position.y = 1.35 + (t % 1.5) * 0.35;
      steamRef.current.scale.setScalar(0.8 + (t % 1.5) * 0.55);
      steamRef.current.children.forEach((child, i) => {
        child.rotation.y = t * (0.8 + i * 0.2);
      });
    }
  });

  const handleBaristaInteract = () => {
    sounds.playSteamHiss();
    openModal('tasting_bar');
  };

  return (
    <group position={[-4.5, 0, -10]} rotation={[0, Math.PI, 0]}>
      {/* ======================================================== */}
      {/* 1. TASTING BAR WALNUT SLAT & NERO MARQUINA MARBLE COUNTER*/}
      {/* ======================================================== */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 1.1, 1.4]} />
        <meshStandardMaterial color="#3B2518" roughness={0.5} />
      </mesh>
      {/* Nero Marquina Black Veined Marble Countertop */}
      <mesh position={[0, 1.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.6]} />
        <meshPhysicalMaterial
          map={darkMarbleTexture}
          roughness={0.14}
          metalness={0.15}
          clearcoat={0.95}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Brushed Brass Accent Edge Strip */}
      <mesh position={[0, 0.95, 0.71]}>
        <boxGeometry args={[4.2, 0.05, 0.02]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. LA MARZOCCO-STYLE CHROME ESPRESSO MACHINE             */}
      {/* ======================================================== */}
      <group position={[-0.8, 1.18, 0]}>
        {/* Polished Stainless Steel Body */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.92, 0.64, 0.68]} />
          <meshPhysicalMaterial
            color="#E4E4E7"
            metalness={0.95}
            roughness={0.08}
            clearcoat={0.8}
          />
        </mesh>
        {/* Brass Side Trim Panels */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.94, 0.52, 0.56]} />
          <meshStandardMaterial color="#B45309" metalness={0.75} roughness={0.2} />
        </mesh>
        {/* Top Cup Warmer Tray with Ceramic Cups */}
        <mesh position={[0, 0.69, 0]}>
          <boxGeometry args={[0.86, 0.04, 0.64]} />
          <meshStandardMaterial color="#D4D4D8" metalness={0.85} roughness={0.2} />
        </mesh>
        {[-0.25, 0, 0.25].map((x, i) => (
          <mesh key={`cup-${i}`} position={[x, 0.75, 0]}>
            <cylinderGeometry args={[0.05, 0.035, 0.07, 10]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
          </mesh>
        ))}

        {/* Dual Chrome Groupheads & Walnut Portafilters */}
        {[-0.22, 0.22].map((x, i) => (
          <group key={`grouphead-${i}`} position={[x, 0.22, 0.36]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.06, 0.1, 10]} />
              <meshStandardMaterial color="#E4E4E7" metalness={0.95} roughness={0.05} />
            </mesh>
            <mesh position={[0, -0.04, 0.16]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.28, 8]} />
              <meshStandardMaterial color="#4A2E1B" roughness={0.35} />
            </mesh>
          </group>
        ))}

        {/* Steam Wand */}
        <mesh position={[0.42, 0.25, 0.3]} rotation={[0.4, 0.2, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
          <meshStandardMaterial color="#F4F4F5" metalness={0.95} roughness={0.1} />
        </mesh>

        {/* Animated Rising Steam Particles */}
        <group ref={steamRef} position={[0.45, 1.35, 0.35]}>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
          </mesh>
          <mesh position={[0.02, 0.08, 0.02]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.2} />
          </mesh>
          <mesh position={[-0.03, 0.18, -0.01]}>
            <sphereGeometry args={[0.11, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.12} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 3. PRECISION BURR COFFEE GRINDER & POUR-OVER STATION     */}
      {/* ======================================================== */}
      <group position={[0.4, 1.18, 0.1]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.3, 0.5, 0.35]} />
          <meshStandardMaterial color="#18181B" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.16, 0.08, 0.35, 12]} />
          <meshPhysicalMaterial
            color="#D97706"
            transparent
            opacity={0.55}
            roughness={0.08}
            clearcoat={1.0}
          />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.13, 0.07, 0.25, 10]} />
          <meshStandardMaterial color="#3B2314" roughness={0.85} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 4. ARTICULATED BARISTA NPC (Amara)                       */}
      {/* ======================================================== */}
      <group position={[-0.15, 0, -0.95]}>
        {/* Legs */}
        <mesh position={[-0.1, 0.45, 0]}>
          <cylinderGeometry args={[0.075, 0.065, 0.9, 10]} />
          <meshStandardMaterial color="#18181B" roughness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.45, 0]}>
          <cylinderGeometry args={[0.075, 0.065, 0.9, 10]} />
          <meshStandardMaterial color="#18181B" roughness={0.8} />
        </mesh>
        {/* Crisp White Linen Barista Shirt */}
        <mesh position={[0, 1.24, 0]} castShadow>
          <boxGeometry args={[0.42, 0.7, 0.24]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
        </mesh>
        {/* Olive Canvas Barista Apron */}
        <mesh position={[0, 1.22, 0.13]}>
          <boxGeometry args={[0.35, 0.6, 0.02]} />
          <meshStandardMaterial color="#2D4A3E" roughness={0.7} />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.26, 1.3, 0.08]} rotation={[-0.4, 0, 0.12]} castShadow>
          <cylinderGeometry args={[0.058, 0.05, 0.55, 10]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
        </mesh>
        <mesh position={[0.26, 1.3, 0.08]} rotation={[-0.4, 0, -0.12]} castShadow>
          <cylinderGeometry args={[0.058, 0.05, 0.55, 10]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
        </mesh>
        {/* Neck & Head */}
        <mesh position={[0, 1.65, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 0.13, 10]} />
          <meshStandardMaterial color="#8D5524" roughness={0.65} />
        </mesh>
        <mesh position={[0, 1.82, 0]} castShadow>
          <sphereGeometry args={[0.155, 16, 16]} />
          <meshStandardMaterial color="#8D5524" roughness={0.65} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.052, 1.84, 0.14]}>
          <sphereGeometry args={[0.017, 8, 8]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[0.052, 1.84, 0.14]}>
          <sphereGeometry args={[0.017, 8, 8]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        {/* Hair Crown */}
        <mesh position={[0, 1.94, -0.04]}>
          <sphereGeometry args={[0.165, 12, 12]} />
          <meshStandardMaterial color="#141416" roughness={0.85} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 5. CEILING SIGN                                          */}
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
          <div className="bg-moyee-charcoal/95 border border-moyee-pink/80 px-6 py-2 rounded-xl text-center select-none shadow-2xl">
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white">
              ESPRESSO & TASTING BAR
            </h3>
            <p className="text-[11px] font-condensed text-moyee-yellow font-bold uppercase tracking-widest">
              HEAD BARISTA AMARA • LIVE ROAST SAMPLING
            </p>
          </div>
        </ProximityHtml>
      </group>

      {/* Proximity Interaction Prompt */}
      <ProximityHtml radius={3.5} position={[0, 2.2, 0]} center distanceFactor={10}>
        <button
          onClick={handleBaristaInteract}
          className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none"
        >
          <div className="bg-moyee-yellow text-moyee-charcoal font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border border-moyee-pink">
            <span>☕ TALK TO BARISTA AMARA</span>
          </div>
          <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2.5 py-0.5 rounded-md mt-1 shadow-md">
            Click for Coffee Tasting & Recommendations
          </div>
        </button>
      </ProximityHtml>
    </group>
  );
};
