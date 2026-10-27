import React from 'react';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

export const CustomerSupportDesk: React.FC = () => {
  const { openModal } = useStore();

  return (
    <group position={[8, 0, -13]}>
      {/* ======================================================== */}
      {/* 1. WOODEN SERVICE COUNTER & POSTBOX                      */}
      {/* ======================================================== */}
      {/* Service Counter Desk */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 1.1, 1.2]} />
        <meshStandardMaterial color="#4E342E" roughness={0.6} />
      </mesh>
      {/* Countertop */}
      <mesh position={[0, 1.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.08, 1.4]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.4} />
      </mesh>

      {/* Classic Red Post Office Drop-box on Left Side */}
      <group position={[-1.4, 0, 0.2]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 1.4, 16]} />
          <meshStandardMaterial color="#C62828" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.45, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#B71C1C" />
        </mesh>
        {/* Mail Drop Slot */}
        <mesh position={[0, 1.2, 0.28]}>
          <boxGeometry args={[0.26, 0.04, 0.05]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. SUPPORT REP NPC (Melanie from Kenya)                  */}
      {/* ======================================================== */}
      <group position={[0.2, 1.1, -0.3]}>
        {/* Torso with Smart Business Casual Shirt */}
        <mesh position={[0, 0.55, 0]} castShadow>
          <cylinderGeometry args={[0.24, 0.26, 0.8, 12]} />
          <meshStandardMaterial color="#E5007D" roughness={0.5} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <sphereGeometry args={[0.17, 16, 16]} />
          <meshStandardMaterial color="#5D4037" roughness={0.8} />
        </mesh>
        {/* Hair Bun */}
        <mesh position={[0, 1.3, -0.05]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
        {/* Support Headset */}
        <mesh position={[0.18, 1.15, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#FFD900" />
        </mesh>
      </group>

      {/* Support Computer Screen */}
      <group position={[0.2, 1.18, 0.2]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.05, 0.3, 6]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
        <mesh position={[0, 0.32, 0]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.6, 0.4, 0.04]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 3. WALL MAILBOX CUBBIES & POSTAL GRID                    */}
      {/* ======================================================== */}
      <group position={[0, 2.8, -2.7]}>
        {/* Wooden Mail Cabinet */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.4, 2.2, 0.35]} />
          <meshStandardMaterial color="#3E2723" roughness={0.6} />
        </mesh>
        {/* Grid dividers */}
        {[-1.0, -0.5, 0, 0.5, 1.0].map((x, idx) => (
          <mesh key={`grid-${idx}`} position={[x, 0, 0.1]}>
            <boxGeometry args={[0.04, 2.0, 0.15]} />
            <meshStandardMaterial color="#2E1C14" />
          </mesh>
        ))}
        {/* Mail letters inside cubbies */}
        {[-0.8, -0.3, 0.2, 0.7].map((x, idx) => (
          <mesh key={`letter-${idx}`} position={[x, 0.2, 0.1]}>
            <boxGeometry args={[0.3, 0.18, 0.05]} />
            <meshStandardMaterial color="#FFF8E1" />
          </mesh>
        ))}
      </group>

      {/* ======================================================== */}
      {/* 4. CEILING BANNER & PROXIMITY CALLOUT                    */}
      {/* ======================================================== */}
      <group position={[0, 4.3, -2.1]}>
        <ProximityHtml radius={5.5} center distanceFactor={7}>
          <div className="bg-moyee-charcoal/95 border-2 border-moyee-yellow px-6 py-2.5 rounded-2xl text-center select-none shadow-2xl">
            <span className="bg-moyee-yellow text-moyee-charcoal text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-full">
              CUSTOMER CARE
            </span>
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white mt-1">
              MOYEE HELP DESK & POST OFFICE
            </h3>
            <p className="font-condensed text-xs text-gray-300">
              Meet Melanie from Kenya • FAQs • Complaints • Order Inquiries
            </p>
          </div>
        </ProximityHtml>
      </group>

      {/* Proximity Interaction Prompt */}
      <ProximityHtml radius={3.5} position={[0, 2.2, 0.2]} center distanceFactor={10}>
        <button
          onClick={() => openModal('customer_support')}
          className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none animate-bounce"
        >
          <div className="bg-moyee-yellow text-moyee-charcoal font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-moyee-pink">
            <span>📮 TALK TO CUSTOMER SUPPORT</span>
          </div>
          <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-md mt-1 shadow-md">
            Click to Open Helpdesk & FAQ Form
          </div>
        </button>
      </ProximityHtml>
    </group>
  );
};
