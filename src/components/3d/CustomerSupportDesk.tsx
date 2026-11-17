import React from 'react';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

export const CustomerSupportDesk: React.FC = () => {
  const openModal = useStore((s) => s.openModal);

  return (
    <group position={[8, 0, -13]}>
      {/* ======================================================== */}
      {/* 1. WOODEN CONCIERGE COUNTER & POSTBOX                    */}
      {/* ======================================================== */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 1.1, 1.2]} />
        <meshStandardMaterial color="#3E2723" roughness={0.55} />
      </mesh>
      <mesh position={[0, 1.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.08, 1.4]} />
        <meshStandardMaterial color="#D6D3D1" roughness={0.22} metalness={0.1} />
      </mesh>

      {/* Classic Cast-Iron Post Drop-box on Left Side */}
      <group position={[-1.4, 0, 0.2]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 1.4, 16]} />
          <meshStandardMaterial color="#991B1B" roughness={0.35} metalness={0.3} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#7F1D1D" roughness={0.35} metalness={0.3} />
        </mesh>
        <mesh position={[0, 1.2, 0.28]}>
          <boxGeometry args={[0.26, 0.04, 0.05]} />
          <meshStandardMaterial color="#18181B" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. ARTICULATED CONCIERGE REP NPC (Melanie)               */}
      {/* ======================================================== */}
      <group position={[0.2, 0, -0.85]}>
        <mesh position={[-0.1, 0.45, 0]}>
          <cylinderGeometry args={[0.075, 0.065, 0.9, 10]} />
          <meshStandardMaterial color="#18181B" roughness={0.8} />
        </mesh>
        <mesh position={[0.1, 0.45, 0]}>
          <cylinderGeometry args={[0.075, 0.065, 0.9, 10]} />
          <meshStandardMaterial color="#18181B" roughness={0.8} />
        </mesh>
        {/* Terracotta Blazer */}
        <mesh position={[0, 1.24, 0]} castShadow>
          <boxGeometry args={[0.42, 0.7, 0.24]} />
          <meshStandardMaterial color="#B45309" roughness={0.55} />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.25, 1.3, 0.06]} rotation={[-0.3, 0, 0.1]} castShadow>
          <cylinderGeometry args={[0.055, 0.048, 0.54, 10]} />
          <meshStandardMaterial color="#B45309" roughness={0.55} />
        </mesh>
        <mesh position={[0.25, 1.3, 0.06]} rotation={[-0.3, 0, -0.1]} castShadow>
          <cylinderGeometry args={[0.055, 0.048, 0.54, 10]} />
          <meshStandardMaterial color="#B45309" roughness={0.55} />
        </mesh>
        {/* Neck & Head */}
        <mesh position={[0, 1.65, 0]}>
          <cylinderGeometry args={[0.058, 0.068, 0.13, 10]} />
          <meshStandardMaterial color="#5D4037" roughness={0.65} />
        </mesh>
        <mesh position={[0, 1.82, 0]} castShadow>
          <sphereGeometry args={[0.155, 16, 16]} />
          <meshStandardMaterial color="#5D4037" roughness={0.65} />
        </mesh>
        {/* Hair Bun & Concierge Headset */}
        <mesh position={[0, 1.96, -0.05]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#141416" />
        </mesh>
        <mesh position={[0.16, 1.82, 0]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} />
        </mesh>
      </group>

      {/* Support Computer Monitor */}
      <group position={[0.2, 1.18, 0.2]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#18181B" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.32, 0]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.6, 0.38, 0.03]} />
          <meshStandardMaterial color="#090A0F" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. WALL MAILBOX CUBBIES & POSTAL GRID                    */}
      {/* ======================================================== */}
      <group position={[0, 2.8, -2.7]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.2, 0.35]} />
          <meshStandardMaterial color="#3E2723" roughness={0.6} />
        </mesh>
        {[-1.0, -0.5, 0, 0.5, 1.0].map((x, idx) => (
          <mesh key={`grid-${idx}`} position={[x, 0, 0.1]}>
            <boxGeometry args={[0.04, 2.0, 0.15]} />
            <meshStandardMaterial color="#271710" />
          </mesh>
        ))}
        {[-0.8, -0.3, 0.2, 0.7].map((x, idx) => (
          <mesh key={`letter-${idx}`} position={[x, 0.2, 0.1]}>
            <boxGeometry args={[0.3, 0.18, 0.05]} />
            <meshStandardMaterial color="#FFFBEB" />
          </mesh>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 4. CEILING BANNER & PROXIMITY CALLOUT                    */}
      {/* ======================================================== */}
      <group position={[0, 4.3, -2.1]}>
        <ProximityHtml radius={5.5} center distanceFactor={7}>
          <div className="bg-moyee-charcoal/95 border border-moyee-yellow/80 px-6 py-2.5 rounded-2xl text-center select-none shadow-2xl">
            <span className="bg-moyee-yellow text-moyee-charcoal text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-full">
              CONCIERGE DESK
            </span>
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white mt-1">
              CLIENT CARE & POST STATION
            </h3>
            <p className="font-condensed text-xs text-gray-300">
              Meet Melanie • FAQs • Order Support • Direct Inquiries
            </p>
          </div>
        </ProximityHtml>
      </group>

      <ProximityHtml radius={3.5} position={[0, 2.2, 0.2]} center distanceFactor={10}>
        <button
          onClick={() => openModal('customer_support')}
          className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none"
        >
          <div className="bg-moyee-yellow text-moyee-charcoal font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border border-moyee-pink">
            <span>📮 TALK TO CONCIERGE SUPPORT</span>
          </div>
          <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2.5 py-0.5 rounded-md mt-1 shadow-md">
            Click to Open Helpdesk & FAQ Form
          </div>
        </button>
      </ProximityHtml>
    </group>
  );
};
