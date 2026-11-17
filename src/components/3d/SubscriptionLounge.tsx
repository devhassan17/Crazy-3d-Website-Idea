import React from 'react';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

export const SubscriptionLounge: React.FC = () => {
  const openModal = useStore((s) => s.openModal);

  return (
    <group position={[-8, 0, -13]}>
      {/* ======================================================== */}
      {/* 1. WOVEN RUG, TRAVERTINE COFFEE TABLE & LEATHER CHAIRS   */}
      {/* ======================================================== */}
      <mesh position={[0, 0.02, 0]} receiveShadow>
        <cylinderGeometry args={[2.8, 2.8, 0.02, 28]} />
        <meshStandardMaterial color="#2C221E" roughness={0.92} />
      </mesh>

      {/* Modern Round Travertine Coffee Table */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.06, 24]} />
          <meshPhysicalMaterial color="#E7E5E4" roughness={0.18} clearcoat={0.7} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.08, 0.25, 0.44, 12]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.22} />
        </mesh>

        {/* Stacked Artisan Coffee Subscription Gift Boxes */}
        {[-0.15, 0.15].map((x, i) => (
          <mesh key={`box-${i}`} position={[x, 0.55 + i * 0.16, 0.05]} castShadow>
            <boxGeometry args={[0.45, 0.15, 0.35]} />
            <meshStandardMaterial color={i === 0 ? '#B45309' : '#18181B'} roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* Two Mid-Century Cognac Leather Armchairs */}
      {[-1.6, 1.6].map((xPos, idx) => (
        <group
          key={`chair-${idx}`}
          position={[xPos, 0, 0.2]}
          rotation={[0, xPos < 0 ? 0.7 : -0.7, 0]}
        >
          {/* Seat Cushion */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[1.0, 0.2, 0.9]} />
            <meshPhysicalMaterial color="#6D3B1E" roughness={0.38} clearcoat={0.25} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.95, -0.4]} castShadow>
            <boxGeometry args={[1.0, 0.8, 0.18]} />
            <meshPhysicalMaterial color="#6D3B1E" roughness={0.38} clearcoat={0.25} />
          </mesh>
          {/* Armrests */}
          {[-0.46, 0.46].map((ax, ai) => (
            <mesh key={`arm-${ai}`} position={[ax, 0.65, -0.05]} castShadow>
              <boxGeometry args={[0.12, 0.22, 0.82]} />
              <meshPhysicalMaterial color="#5C3016" roughness={0.4} clearcoat={0.2} />
            </mesh>
          ))}
          {/* Walnut Legs */}
          {[-0.4, 0.4].map((lx) =>
            [-0.35, 0.35].map((lz) => (
              <mesh key={`leg-${lx}-${lz}`} position={[lx, 0.18, lz]}>
                <cylinderGeometry args={[0.03, 0.02, 0.35, 6]} />
                <meshStandardMaterial color="#18181B" metalness={0.7} roughness={0.3} />
              </mesh>
            ))
          )}
        </group>
      ))}

      {/* Brushed Brass Reading Floor Lamp */}
      <group position={[1.8, 0, -1.5]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 2.4, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 2.3, 0]}>
          <coneGeometry args={[0.25, 0.3, 12, 1, true]} />
          <meshStandardMaterial color="#18181B" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#FFFBEB" emissive="#F59E0B" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* ======================================================== */}
      {/* 2. WALL-MOUNTED INTERACTIVE DIGITAL SCREEN               */}
      {/* ======================================================== */}
      <group position={[0, 3.2, -2.8]}>
        <mesh castShadow>
          <boxGeometry args={[4.2, 2.2, 0.1]} />
          <meshStandardMaterial color="#090A0F" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[4.0, 2.0, 0.02]} />
          <meshStandardMaterial color="#1E2028" emissive="#B45309" emissiveIntensity={0.2} />
        </mesh>

        <ProximityHtml radius={5.0} position={[0, 0, 0.1]} transform distanceFactor={6} center>
          <div className="bg-moyee-charcoal/95 border border-moyee-yellow/70 p-5 rounded-2xl w-80 text-center select-none shadow-2xl">
            <span className="bg-moyee-yellow text-moyee-charcoal text-[10px] font-bold font-oswald uppercase px-2.5 py-1 rounded-full">
              COMPLIMENTARY SHIPPING
            </span>
            <h3 className="font-oswald text-xl font-bold uppercase tracking-wider text-white mt-2">
              ROASTER SUBSCRIPTION CLUB
            </h3>
            <p className="font-condensed text-xs text-gray-300 mt-1">
              Custom delivery schedule • Fresh roast at origin • Pause or cancel anytime
            </p>
            <div className="mt-3 inline-block bg-moyee-pink text-white font-oswald text-xs uppercase px-4 py-2 rounded-lg font-bold shadow-md">
              Tap Screen to Customize
            </div>
          </div>
        </ProximityHtml>
      </group>

      <ProximityHtml radius={3.5} position={[0, 2.0, 0]} center distanceFactor={10}>
        <button
          onClick={() => openModal('subscription_lounge')}
          className="flex flex-col items-center group cursor-pointer transition-transform transform hover:scale-105 select-none"
        >
          <div className="bg-moyee-pink text-white font-oswald text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 border border-moyee-yellow">
            <span>☕ ENTER ROASTER CLUB</span>
          </div>
          <div className="bg-moyee-charcoal text-white text-[10px] font-bold font-oswald uppercase px-2.5 py-0.5 rounded-md mt-1 shadow-md">
            Click to Setup Automatic Delivery
          </div>
        </button>
      </ProximityHtml>
    </group>
  );
};
