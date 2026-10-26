import React, { useMemo, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { sounds } from '../../utils/audio';

export const TastingBar: React.FC = () => {
  const { playerPosition, openModal, activeModal } = useStore();
  const steamRef = useRef<THREE.Group>(null);

  // Animate rising steam
  useFrame(({ clock }) => {
    if (steamRef.current) {
      const t = clock.getElapsedTime();
      steamRef.current.position.y = 1.35 + (t % 1.5) * 0.35;
      steamRef.current.scale.setScalar(0.8 + (t % 1.5) * 0.6);
      steamRef.current.children.forEach((child, i) => {
        child.rotation.y = t * (0.8 + i * 0.2);
      });
    }
  });

  const playerVec = useMemo(() => new THREE.Vector3(...playerPosition), [playerPosition]);
  const barVec = useMemo(() => new THREE.Vector3(-4.5, 1.7, -9.5), []);
  const distance = playerVec.distanceTo(barVec);
  const isNearby = distance < 4.5;

  const handleBaristaInteract = () => {
    sounds.playSteamHiss();
    openModal('tasting_bar');
  };

  return (
    <group position={[-4.5, 0, -10]} rotation={[0, Math.PI, 0]}>
      {/* ======================================================== */}
      {/* 1. TASTING BAR WOODEN & GRANITE COUNTER                  */}
      {/* ======================================================== */}
      {/* Counter Base */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 1.1, 1.4]} />
        <meshStandardMaterial color="#3E2723" roughness={0.6} />
      </mesh>
      {/* Dark Granite Countertop */}
      <mesh position={[0, 1.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.6]} />
        <meshStandardMaterial color="#212529" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Yellow Neon Accent Edge Strip */}
      <mesh position={[0, 0.95, 0.71]}>
        <boxGeometry args={[4.2, 0.06, 0.02]} />
        <meshStandardMaterial color="#FFD900" emissive="#FFD900" emissiveIntensity={0.6} />
      </mesh>

      {/* ======================================================== */}
      {/* 2. CHROME COMMERCIAL ESPRESSO MACHINE                    */}
      {/* ======================================================== */}
      <group position={[-0.8, 1.18, 0]}>
        {/* Machine Main Body */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.9, 0.65, 0.7]} />
          <meshStandardMaterial color="#E0E0E0" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Top Cup Warmer Tray with espresso cups */}
        <mesh position={[0, 0.69, 0]}>
          <boxGeometry args={[0.85, 0.04, 0.65]} />
          <meshStandardMaterial color="#BDBDBD" metalness={0.8} roughness={0.2} />
        </mesh>
        {[-0.25, 0, 0.25].map((x, i) => (
          <mesh key={`cup-${i}`} position={[x, 0.75, 0]}>
            <cylinderGeometry args={[0.05, 0.035, 0.07, 10]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
          </mesh>
        ))}

        {/* Dual Chrome Groupheads */}
        {[-0.22, 0.22].map((x, i) => (
          <group key={`grouphead-${i}`} position={[x, 0.22, 0.36]}>
            {/* Spout */}
            <mesh>
              <cylinderGeometry args={[0.06, 0.06, 0.1, 8]} />
              <meshStandardMaterial color="#D6D6D6" metalness={0.95} roughness={0.05} />
            </mesh>
            {/* Portafilter Handle */}
            <mesh position={[0, -0.04, 0.16]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.28, 8]} />
              <meshStandardMaterial color="#1A1A1A" roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Steam Wand on side */}
        <mesh position={[0.42, 0.25, 0.3]} rotation={[0.4, 0.2, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 6]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.9} />
        </mesh>

        {/* Animated Rising Steam Particles */}
        <group ref={steamRef} position={[0.45, 1.35, 0.35]}>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
          </mesh>
          <mesh position={[0.02, 0.08, 0.02]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.25} />
          </mesh>
          <mesh position={[-0.03, 0.18, -0.01]}>
            <sphereGeometry args={[0.11, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.15} />
          </mesh>
        </group>
      </group>

      {/* ======================================================== */}
      {/* 3. COFFEE BEAN GRINDER                                   */}
      {/* ======================================================== */}
      <group position={[0.4, 1.18, 0.1]}>
        {/* Base */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[0.3, 0.5, 0.35]} />
          <meshStandardMaterial color="#212529" roughness={0.4} />
        </mesh>
        {/* Amber Glass Hopper filled with coffee beans */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.16, 0.08, 0.35, 12]} />
          <meshPhysicalMaterial
            color="#FFB300"
            transparent
            opacity={0.7}
            roughness={0.1}
            transmission={0.6}
          />
        </mesh>
        {/* Coffee beans inside */}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.13, 0.07, 0.25, 10]} />
          <meshStandardMaterial color="#3E2723" roughness={0.9} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 4. BARISTA NPC (Amara)                                   */}
      {/* ======================================================== */}
      <group position={[-0.2, 1.1, -0.4]}>
        {/* Torso */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.26, 0.8, 12]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
        </mesh>
        {/* Green/Pink Barista Apron */}
        <mesh position={[0, 0.55, 0.2]}>
          <boxGeometry args={[0.28, 0.55, 0.02]} />
          <meshStandardMaterial color="#2E7D32" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial color="#8D5524" roughness={0.8} />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 1.25, -0.04]}>
          <sphereGeometry args={[0.18, 12, 12]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 5. CEILING SIGN & SPOTLIGHT                              */}
      {/* ======================================================== */}
      <group position={[0, 3.8, 0]}>
        <mesh position={[-1.6, 0.8, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.6, 4]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
        <mesh position={[1.6, 0.8, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.6, 4]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
        <mesh castShadow>
          <boxGeometry args={[4.2, 0.9, 0.15]} />
          <meshStandardMaterial color="#111827" roughness={0.3} />
        </mesh>
        <Html position={[0, 0, 0.09]} center transform distanceFactor={7}>
          <div className="bg-moyee-charcoal/90 border-2 border-moyee-pink px-6 py-2 rounded-xl text-center select-none shadow-2xl">
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white">
              COFFEE TASTING & BREW BAR
            </h3>
            <p className="text-[11px] font-condensed text-moyee-pink font-bold uppercase tracking-widest">
              MEET BARISTA AMARA • LIVE ROAST SAMPLING
            </p>
          </div>
        </Html>
        <spotLight
          position={[0, 0, 0]}
          target-position={[0, -3.8, 0]}
          color="#FFE082"
          intensity={6}
          angle={0.6}
          penumbra={0.4}
        />
      </group>

      {/* Proximity Interaction Prompt */}
      {isNearby && activeModal === null && (
        <Html position={[0, 2.2, 0]} center distanceFactor={10}>
          <button
            onClick={handleBaristaInteract}
            className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none animate-bounce"
          >
            <div className="bg-moyee-yellow text-moyee-charcoal font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-moyee-pink">
              <span>☕ TALK TO BARISTA AMARA</span>
            </div>
            <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-md mt-1 shadow-md">
              Click for Coffee Tasting & Recommendations
            </div>
          </button>
        </Html>
      )}
    </group>
  );
};
