import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const SubscriptionLounge: React.FC = () => {
  const { playerPosition, openModal, activeModal } = useStore();

  const playerVec = useMemo(() => new THREE.Vector3(...playerPosition), [playerPosition]);
  const loungeVec = useMemo(() => new THREE.Vector3(-8, 1.7, -13), []);
  const distance = playerVec.distanceTo(loungeVec);
  const isNearby = distance < 4.5;

  return (
    <group position={[-8, 0, -13]}>
      {/* ======================================================== */}
      {/* 1. CIRCULAR COFFEE TABLE & LEATHER ARMCHAIRS             */}
      {/* ======================================================== */}
      {/* Plush Circular Rug */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 2.8, 0.02, 24]} />
        <meshStandardMaterial color="#3E2723" roughness={0.9} />
      </mesh>

      {/* Modern Round Coffee Table */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.06, 24]} />
          <meshStandardMaterial color="#D7CCC8" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Brass Legs */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.25, 0.44, 12]} />
          <meshStandardMaterial color="#FFD900" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Stacked Moyee Coffee Subscription Gift Boxes */}
        {[-0.15, 0.15].map((x, i) => (
          <mesh key={`box-${i}`} position={[x, 0.55 + i * 0.16, 0.05]} castShadow>
            <boxGeometry args={[0.45, 0.15, 0.35]} />
            <meshStandardMaterial color={i === 0 ? '#E5007D' : '#111827'} roughness={0.4} />
          </mesh>
        ))}
      </group>

      {/* Two Mid-Century Leather Armchairs */}
      {[-1.6, 1.6].map((xPos, idx) => (
        <group
          key={`chair-${idx}`}
          position={[xPos, 0, 0.2]}
          rotation={[0, xPos < 0 ? 0.7 : -0.7, 0]}
        >
          {/* Seat Cushion */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[1.0, 0.2, 0.9]} />
            <meshStandardMaterial color="#4E342E" roughness={0.5} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.95, -0.4]} castShadow>
            <boxGeometry args={[1.0, 0.8, 0.18]} />
            <meshStandardMaterial color="#4E342E" roughness={0.5} />
          </mesh>
          {/* Wooden Legs */}
          {[-0.4, 0.4].map((lx) =>
            [-0.35, 0.35].map((lz) => (
              <mesh key={`leg-${lx}-${lz}`} position={[lx, 0.18, lz]}>
                <cylinderGeometry args={[0.03, 0.02, 0.35, 6]} />
                <meshStandardMaterial color="#212529" />
              </mesh>
            ))
          )}
        </group>
      ))}

      {/* Brass Reading Floor Lamp with Soft Glow */}
      <group position={[1.8, 0, -1.5]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 2.4, 8]} />
          <meshStandardMaterial color="#FFD900" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <coneGeometry args={[0.25, 0.3, 12, 1, true]} />
          <meshStandardMaterial color="#E5007D" metalness={0.6} />
        </mesh>
        <pointLight position={[0, 2.1, 0]} color="#FFE0B2" intensity={4} distance={5} />
      </group>

      {/* ======================================================== */}
      {/* 2. WALL-MOUNTED INTERACTIVE DIGITAL SCREEN               */}
      {/* ======================================================== */}
      <group position={[0, 3.2, -2.8]}>
        {/* Screen Frame */}
        <mesh castShadow>
          <boxGeometry args={[4.2, 2.2, 0.1]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[4.0, 2.0, 0.02]} />
          <meshStandardMaterial color="#E5007D" emissive="#E5007D" emissiveIntensity={0.3} />
        </mesh>

        {/* Digital Lounge Billboard */}
        <Html position={[0, 0, 0.1]} transform distanceFactor={6} center>
          <div className="bg-moyee-charcoal/95 border-2 border-moyee-pink p-5 rounded-2xl w-80 text-center select-none shadow-2xl">
            <span className="bg-moyee-yellow text-moyee-charcoal text-[10px] font-bold font-oswald uppercase px-2.5 py-1 rounded-full">
              FREE SHIPPING ALWAYS
            </span>
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white mt-2">
              NEVER RUN OUT OF COFFEE
            </h3>
            <p className="font-condensed text-xs text-gray-300 mt-1">
              Custom delivery schedule • Fresh roast at origin • Pause or cancel anytime
            </p>
            <div className="mt-3 inline-block bg-moyee-pink text-white font-oswald text-xs uppercase px-4 py-2 rounded-lg font-bold shadow-md">
              Tap Screen to Customize
            </div>
          </div>
        </Html>
      </group>

      {/* Proximity Interaction Prompt */}
      {isNearby && activeModal === null && (
        <Html position={[0, 2.0, 0]} center distanceFactor={10}>
          <button
            onClick={() => openModal('subscription_lounge')}
            className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none animate-bounce"
          >
            <div className="bg-moyee-pink text-white font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-moyee-yellow">
              <span>☕ ENTER SUBSCRIPTION CLUB</span>
            </div>
            <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-md mt-1 shadow-md">
              Click to Setup Automatic Delivery
            </div>
          </button>
        </Html>
      )}
    </group>
  );
};
