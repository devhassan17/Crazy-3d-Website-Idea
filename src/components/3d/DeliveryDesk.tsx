import React from 'react';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

export const DeliveryDesk: React.FC = () => {
  const { openModal } = useStore();

  return (
    <group position={[6.5, 0, 7.5]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Wooden Dispatch Counter */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 1.0, 1.0]} />
        <meshStandardMaterial color="#374151" roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.04, 0]} castShadow>
        <boxGeometry args={[1.7, 0.08, 1.1]} />
        <meshStandardMaterial color="#1F2937" roughness={0.3} />
      </mesh>

      {/* Stacked Cardboard Shipping Parcels (PostNL / DHL climate neutral) */}
      <mesh position={[-0.3, 1.25, 0]} castShadow>
        <boxGeometry args={[0.5, 0.35, 0.4]} />
        <meshStandardMaterial color="#BCAAA4" roughness={0.8} />
      </mesh>
      <mesh position={[0.3, 1.2, -0.1]} castShadow>
        <boxGeometry args={[0.45, 0.28, 0.4]} />
        <meshStandardMaterial color="#A1887F" roughness={0.8} />
      </mesh>

      {/* Dispatch Terminal Screen */}
      <group position={[0, 1.1, 0.25]}>
        <mesh position={[0, 0.25, 0]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.5, 0.35, 0.04]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
      </group>

      {/* Overhead Delivery Banner */}
      <group position={[0, 2.6, 0]}>
        <ProximityHtml radius={5.0} center transform distanceFactor={5}>
          <div className="bg-moyee-charcoal/90 border-2 border-moyee-pink px-4 py-1.5 rounded-xl text-center select-none shadow-xl">
            <span className="text-sm">🚚</span>
            <h4 className="font-oswald text-xs font-bold text-white uppercase">ORDER TRACKING</h4>
            <p className="text-[10px] text-moyee-yellow font-condensed">DISPATCH STATUS & COURIER</p>
          </div>
        </ProximityHtml>
      </group>

      {/* Proximity Interaction Prompt */}
      <ProximityHtml radius={3.5} position={[0, 2.0, 0]} center distanceFactor={10}>
        <button
          onClick={() => openModal('delivery_tracking')}
          className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none animate-bounce"
        >
          <div className="bg-moyee-pink text-white font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border-2 border-moyee-yellow">
            <span>📦 TRACK YOUR ORDER</span>
          </div>
          <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2 py-0.5 rounded-md mt-1 shadow-md">
            Click to Track Odoo Shipments
          </div>
        </button>
      </ProximityHtml>
    </group>
  );
};
