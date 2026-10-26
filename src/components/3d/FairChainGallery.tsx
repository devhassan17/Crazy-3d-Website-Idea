import React, { useMemo, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { textureFactory } from '../../utils/textures';
import { useStore } from '../../store/useStore';

export const FairChainGallery: React.FC = () => {
  const { playerPosition, openModal, activeModal } = useStore();
  const globeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  const earthTexture = useMemo(() => textureFactory.getEarthGlobeTexture(), []);

  // Continuous subtle globe rotation
  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.15;
    }
  });

  const playerVec = useMemo(() => new THREE.Vector3(...playerPosition), [playerPosition]);
  const galleryVec = useMemo(() => new THREE.Vector3(0, 1.7, -13.5), []);
  const distance = playerVec.distanceTo(galleryVec);
  const isNearby = distance < 4.5;

  return (
    <group position={[0, 0, -13.5]}>
      {/* ======================================================== */}
      {/* 1. PEDESTAL & 3D ROTATING EARTH GLOBE                    */}
      {/* ======================================================== */}
      {/* Museum Base Plinth */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 2.1, 0.9, 32]} />
        <meshStandardMaterial color="#1A1C20" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Brass Rim */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[1.85, 1.85, 0.05, 32]} />
        <meshStandardMaterial color="#FFD900" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Floating 3D Earth Globe with FairChain Route Pins */}
      <mesh ref={globeRef} position={[0, 2.3, 0]} castShadow>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.6}
          metalness={0.2}
          emissive="#004D40"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Glowing Orbital Trajectory Ring */}
      <group ref={ringRef} position={[0, 2.3, 0]} rotation={[0.4, 0.2, 0.3]}>
        <mesh>
          <torusGeometry args={[1.5, 0.015, 12, 48]} />
          <meshBasicMaterial color="#E5007D" />
        </mesh>
      </group>

      {/* Pedestal Uplight */}
      <pointLight position={[0, 1.1, 0]} color="#00E5FF" intensity={6} distance={4} />

      {/* ======================================================== */}
      {/* 2. THREE PILLARS INFOGRAPHIC PANELS                      */}
      {/* ======================================================== */}
      {/* Pillar 1: FACTORIES (Left: X: -2.8) */}
      <group position={[-2.8, 0, 0.4]} rotation={[0, 0.3, 0]}>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[1.2, 2.4, 0.15]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
        <Html position={[0, 1.4, 0.09]} center transform distanceFactor={5}>
          <div className="bg-moyee-charcoal/90 border border-moyee-pink p-3 rounded-lg text-center w-48 select-none">
            <span className="text-xl">🏭</span>
            <h4 className="font-oswald text-xs font-bold text-moyee-pink uppercase">1. FACTORIES</h4>
            <p className="text-[10px] text-gray-200 font-condensed mt-1">
              Roasting at Origin in Addis Ababa & Nairobi. +300% local economic impact!
            </p>
          </div>
        </Html>
      </group>

      {/* Pillar 2: FARMERS (Right: X: 2.8) */}
      <group position={[2.8, 0, 0.4]} rotation={[0, -0.3, 0]}>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[1.2, 2.4, 0.15]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
        <Html position={[0, 1.4, 0.09]} center transform distanceFactor={5}>
          <div className="bg-moyee-charcoal/90 border border-moyee-yellow p-3 rounded-lg text-center w-48 select-none">
            <span className="text-xl">🤝</span>
            <h4 className="font-oswald text-xs font-bold text-moyee-yellow uppercase">2. FARMERS</h4>
            <p className="text-[10px] text-gray-200 font-condensed mt-1">
              Living incomes above LIRP. 20% above open market rates for all smallholders.
            </p>
          </div>
        </Html>
      </group>

      {/* ======================================================== */}
      {/* 3. WALL ILLUMINATION & BANNER                            */}
      {/* ======================================================== */}
      <group position={[0, 4.3, -2.1]}>
        <Html center distanceFactor={7}>
          <div className="bg-moyee-charcoal/95 border-2 border-moyee-pink px-6 py-2.5 rounded-2xl text-center select-none shadow-2xl">
            <span className="bg-moyee-pink text-white text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-full">
              VERIFIED IMPACT
            </span>
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-white mt-1">
              THE FAIRCHAIN REVOLUTION
            </h3>
            <p className="font-condensed text-xs text-moyee-yellow font-bold uppercase tracking-widest">
              ETHIOPIA & KENYA ROASTERIES • 50/50 VALUE REVOLUTION
            </p>
          </div>
        </Html>
      </group>

      {/* Proximity Interaction Prompt */}
      {isNearby && activeModal === null && (
        <Html position={[0, 2.4, 1.2]} center distanceFactor={10}>
          <button
            onClick={() => openModal('fairchain_gallery')}
            className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none animate-bounce"
          >
            <div className="bg-moyee-pink text-white font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-moyee-yellow">
              <span>🌍 EXPLORE FAIRCHAIN 3D ORIGIN</span>
            </div>
            <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-md mt-1 shadow-md">
              Click to Discover Stories & Carbon Data
            </div>
          </button>
        </Html>
      )}
    </group>
  );
};
