import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { textureFactory } from '../../utils/textures';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

export const FairChainGallery: React.FC = () => {
  const openModal = useStore((s) => s.openModal);
  const globeRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  const earthTexture = useMemo(() => textureFactory.getEarthGlobeTexture(), []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.22;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.14;
    }
  });

  return (
    <group position={[0, 0, -13.5]}>
      {/* ======================================================== */}
      {/* 1. MUSEUM PEDESTAL & 3D ROTATING EARTH GLOBE             */}
      {/* ======================================================== */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 2.1, 0.9, 32]} />
        <meshStandardMaterial color="#14161A" roughness={0.25} metalness={0.75} />
      </mesh>
      {/* Brushed Brass Rim */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[1.85, 1.85, 0.05, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Floating 3D Earth Globe */}
      <mesh ref={globeRef} position={[0, 2.3, 0]} castShadow>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshPhysicalMaterial
          map={earthTexture}
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.6}
          emissive="#0A2540"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Brass Orbital Trajectory Ring */}
      <group ref={ringRef} position={[0, 2.3, 0]} rotation={[0.4, 0.2, 0.3]}>
        <mesh>
          <torusGeometry args={[1.5, 0.016, 12, 48]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} emissive="#B45309" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. TWO PILLARS INFOGRAPHIC PANELS                        */}
      {/* ======================================================== */}
      <group position={[-2.8, 0, 0.4]} rotation={[0, 0.3, 0]}>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[1.2, 2.4, 0.15]} />
          <meshStandardMaterial color="#14161A" roughness={0.35} metalness={0.5} />
        </mesh>
        <ProximityHtml radius={4.5} position={[0, 1.4, 0.09]} center transform distanceFactor={5}>
          <div className="bg-moyee-charcoal/95 border border-moyee-pink/80 p-3 rounded-lg text-center w-48 select-none">
            <span className="text-xl">🏭</span>
            <h4 className="font-oswald text-xs font-bold text-moyee-yellow uppercase">1. ORIGIN ROASTERIES</h4>
            <p className="text-[10px] text-gray-200 font-condensed mt-1">
              Roasting at Source in Addis Ababa & Nairobi. +300% local economic impact.
            </p>
          </div>
        </ProximityHtml>
      </group>

      <group position={[2.8, 0, 0.4]} rotation={[0, -0.3, 0]}>
        <mesh position={[0, 1.4, 0]} castShadow>
          <boxGeometry args={[1.2, 2.4, 0.15]} />
          <meshStandardMaterial color="#14161A" roughness={0.35} metalness={0.5} />
        </mesh>
        <ProximityHtml radius={4.5} position={[0, 1.4, 0.09]} center transform distanceFactor={5}>
          <div className="bg-moyee-charcoal/95 border border-moyee-yellow/80 p-3 rounded-lg text-center w-48 select-none">
            <span className="text-xl">🤝</span>
            <h4 className="font-oswald text-xs font-bold text-moyee-yellow uppercase">2. GROWER EQUITY</h4>
            <p className="text-[10px] text-gray-200 font-condensed mt-1">
              Living incomes above LIRP. 20% above open market rates for all smallholders.
            </p>
          </div>
        </ProximityHtml>
      </group>

      {/* ======================================================== */}
      {/* 3. WALL BANNER & CALLOUT                                 */}
      {/* ======================================================== */}
      <group position={[0, 4.3, -2.1]}>
        <ProximityHtml radius={5.5} center distanceFactor={7}>
          <div className="bg-moyee-charcoal/95 border border-moyee-yellow/80 px-6 py-2.5 rounded-2xl text-center select-none shadow-2xl">
            <span className="bg-moyee-pink text-white text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-full">
              VERIFIED TRACEABILITY
            </span>
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-white mt-1">
              DIRECT ORIGIN 50/50 IMPACT
            </h3>
            <p className="font-condensed text-xs text-moyee-yellow font-bold uppercase tracking-widest">
              ETHIOPIA & KENYA ROASTERIES • FARM-TO-CUP TRANSPARENCY
            </p>
          </div>
        </ProximityHtml>
      </group>

      <ProximityHtml radius={3.5} position={[0, 2.4, 1.2]} center distanceFactor={10}>
        <button
          onClick={() => openModal('fairchain_gallery')}
          className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none"
        >
          <div className="bg-moyee-pink text-white font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border border-moyee-yellow">
            <span>🌍 EXPLORE 3D ORIGIN GLOBE</span>
          </div>
          <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2.5 py-0.5 rounded-md mt-1 shadow-md">
            Click to Discover Farm Traceability & Carbon Data
          </div>
        </button>
      </ProximityHtml>
    </group>
  );
};
