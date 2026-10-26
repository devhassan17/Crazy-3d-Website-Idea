import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

export const CoffeeQuizKiosk: React.FC = () => {
  const { playerPosition, openModal, activeModal } = useStore();

  const playerVec = useMemo(() => new THREE.Vector3(...playerPosition), [playerPosition]);
  const kioskVec = useMemo(() => new THREE.Vector3(-6.5, 1.7, 7.5), []);
  const distance = playerVec.distanceTo(kioskVec);
  const isNearby = distance < 4.0;

  return (
    <group position={[-6.5, 0, 7.5]} rotation={[0, Math.PI / 4, 0]}>
      {/* Sleek Digital Kiosk Totem */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[0.9, 2.0, 0.4]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Glowing Neon Edge Frame */}
      <mesh position={[0, 1.0, 0.21]}>
        <boxGeometry args={[0.82, 1.9, 0.02]} />
        <meshStandardMaterial color="#E5007D" emissive="#E5007D" emissiveIntensity={0.5} />
      </mesh>

      {/* Touchscreen Interface */}
      <mesh position={[0, 1.25, 0.22]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[0.74, 1.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Screen Graphic Content */}
      <Html position={[0, 1.25, 0.24]} rotation={[-0.15, 0, 0]} transform distanceFactor={5} center>
        <div className="bg-moyee-charcoal/95 border-2 border-moyee-yellow p-4 rounded-xl text-center w-64 select-none shadow-2xl">
          <span className="text-2xl animate-pulse">🎯</span>
          <h3 className="font-oswald text-base font-bold text-white uppercase mt-1">
            COFFEE FINDER
          </h3>
          <p className="text-[11px] font-condensed text-moyee-yellow font-bold uppercase mt-0.5">
            FIND YOUR COFFEE IN 4 QUESTIONS
          </p>
          <div className="mt-3 bg-moyee-pink text-white text-[11px] font-oswald uppercase font-bold py-1.5 px-3 rounded-lg shadow">
            Take 30-Sec Taste Quiz
          </div>
        </div>
      </Html>

      {/* Proximity Interaction Prompt */}
      {isNearby && activeModal === null && (
        <Html position={[0, 2.3, 0]} center distanceFactor={10}>
          <button
            onClick={() => openModal('coffee_quiz')}
            className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none animate-bounce"
          >
            <div className="bg-moyee-yellow text-moyee-charcoal font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-moyee-pink">
              <span>☕ TAKE 4-QUESTION QUIZ</span>
            </div>
            <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-md mt-1 shadow-md">
              Get Personalized Coffee Recommendation
            </div>
          </button>
        </Html>
      )}
    </group>
  );
};
