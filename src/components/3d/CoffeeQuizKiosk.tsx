import React from 'react';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

export const CoffeeQuizKiosk: React.FC = () => {
  const openModal = useStore((s) => s.openModal);

  return (
    <group position={[-6.5, 0, 7.5]} rotation={[0, Math.PI / 4, 0]}>
      {/* Sleek Brushed Aluminum Digital Kiosk Totem */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <boxGeometry args={[0.9, 2.0, 0.36]} />
        <meshStandardMaterial color="#14161A" metalness={0.8} roughness={0.22} />
      </mesh>
      {/* Warm Brass Bezel Edge Frame */}
      <mesh position={[0, 1.0, 0.19]}>
        <boxGeometry args={[0.82, 1.9, 0.02]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Touchscreen Glass Interface */}
      <mesh position={[0, 1.25, 0.2]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[0.74, 1.1]} />
        <meshPhysicalMaterial color="#090A0F" roughness={0.08} clearcoat={1.0} />
      </mesh>

      <ProximityHtml radius={4.5} position={[0, 1.25, 0.22]} rotation={[-0.15, 0, 0]} transform distanceFactor={5} center>
        <div className="bg-moyee-charcoal/95 border border-moyee-yellow/80 p-4 rounded-xl text-center w-64 select-none shadow-2xl">
          <span className="text-2xl">🎯</span>
          <h3 className="font-oswald text-base font-bold text-white uppercase mt-1">
            ROAST SOMMELIER
          </h3>
          <p className="text-[11px] font-condensed text-moyee-yellow font-bold uppercase mt-0.5">
            MATCH YOUR PERFECT ROAST IN 4 STEPS
          </p>
          <div className="mt-3 bg-moyee-pink text-white text-[11px] font-oswald uppercase font-bold py-1.5 px-3 rounded-lg shadow">
            Start 30-Sec Taste Quiz
          </div>
        </div>
      </ProximityHtml>

      <ProximityHtml radius={3.5} position={[0, 2.3, 0]} center distanceFactor={10}>
        <button
          onClick={() => openModal('coffee_quiz')}
          className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none"
        >
          <div className="bg-moyee-yellow text-moyee-charcoal font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border border-moyee-pink">
            <span>☕ TAKE 4-QUESTION ROAST QUIZ</span>
          </div>
          <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2.5 py-0.5 rounded-md mt-1 shadow-md">
            Get Personalized Coffee Recommendation
          </div>
        </button>
      </ProximityHtml>
    </group>
  );
};
