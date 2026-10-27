import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { textureFactory } from '../../utils/textures';
import { useStore } from '../../store/useStore';

export const StoreBuilding: React.FC = () => {
  const { isInsideStore, dayNightMode } = useStore();

  const woodFloorTexture = useMemo(() => textureFactory.getWoodFloorTexture(), []);
  const streetTexture = useMemo(() => textureFactory.getStreetTexture(), []);
  const neonSignTexture = useMemo(() => textureFactory.getNeonSignTexture(), []);

  // Wall posters
  const poster1 = useMemo(
    () => textureFactory.getPosterTexture('RADICALLY GOOD COFFEE', 'WITH RADICAL IMPACT', '#E5007D'),
    []
  );
  const poster2 = useMemo(
    () => textureFactory.getPosterTexture('FAIRCHAIN 50/50', 'TRADE NOT AID • PROFITABLE FARMERS', '#FFD900'),
    []
  );
  const poster3 = useMemo(
    () => textureFactory.getPosterTexture('WE ROAST AT ORIGIN', 'ADDIS ABABA & NAIROBI FACILITIES', '#00E5FF'),
    []
  );

  const isNight = dayNightMode === 'night';

  return (
    <group name="store-building">
      {/* ======================================================== */}
      {/* 1. OUTSIDE ENVIRONMENT (Street, Sidewalk, Trees, Lights) */}
      {/* ======================================================== */}
      {/* Street Pavement (Z: 14 to 34, X: -26 to 26) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 24]} receiveShadow>
        <planeGeometry args={[52, 20]} />
        <meshStandardMaterial map={streetTexture} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Sidewalk Curb in front of Store */}
      <mesh position={[0, 0.08, 15.5]} receiveShadow>
        <boxGeometry args={[28, 0.16, 3]} />
        <meshStandardMaterial color="#6E737B" roughness={0.8} />
      </mesh>

      {/* Street Trees & Planters */}
      {[-10, 10].map((xPos, idx) => (
        <group key={`tree-${idx}`} position={[xPos, 0, 20]}>
          {/* Concrete Planter Box */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.8, 1.8]} />
            <meshStandardMaterial color="#333333" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.79, 0]}>
            <boxGeometry args={[1.6, 0.05, 1.6]} />
            <meshStandardMaterial color="#3E2723" roughness={1.0} />
          </mesh>
          {/* Tree Trunk */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.22, 2.8, 8]} />
            <meshStandardMaterial color="#4A2E18" roughness={0.9} />
          </mesh>
          {/* Foliage Canopy */}
          <mesh position={[0, 4.0, 0]} castShadow>
            <sphereGeometry args={[1.4, 12, 12]} />
            <meshStandardMaterial color={isNight ? '#1E3F20' : '#2E7D32'} roughness={0.8} />
          </mesh>
          <mesh position={[0, 4.6, 0]} castShadow>
            <sphereGeometry args={[1.0, 10, 10]} />
            <meshStandardMaterial color={isNight ? '#2A522C' : '#388E3C'} roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Street Benches */}
      {[-6, 6].map((xPos, idx) => (
        <group key={`bench-${idx}`} position={[xPos, 0, 18]} rotation={[0, xPos > 0 ? -0.2 : 0.2, 0]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <boxGeometry args={[2.2, 0.1, 0.6]} />
            <meshStandardMaterial color="#8D6E63" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.9, -0.25]} castShadow>
            <boxGeometry args={[2.2, 0.8, 0.08]} />
            <meshStandardMaterial color="#8D6E63" roughness={0.6} />
          </mesh>
          {/* Steel Legs */}
          <mesh position={[-0.9, 0.22, 0]}>
            <boxGeometry args={[0.08, 0.45, 0.5]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} />
          </mesh>
          <mesh position={[0.9, 0.22, 0]}>
            <boxGeometry args={[0.08, 0.45, 0.5]} />
            <meshStandardMaterial color="#1A1A1A" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Street Lantern Lamps with Warm Light */}
      {[-12, 12].map((xPos, idx) => (
        <group key={`lamp-${idx}`} position={[xPos, 0, 18]}>
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 5, 8]} />
            <meshStandardMaterial color="#212529" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 5.2, 0]}>
            <sphereGeometry args={[0.35, 12, 12]} />
            <meshStandardMaterial
              color="#FFF9C4"
              emissive="#FFD900"
              emissiveIntensity={isNight ? 2.5 : 0.6}
            />
          </mesh>
          <pointLight
            position={[0, 5.2, 0]}
            color="#FFD900"
            intensity={isNight ? 12 : 3}
            distance={16}
            decay={2}
          />
        </group>
      ))}

      {/* ======================================================== */}
      {/* 2. STORE EXTERIOR FACADE & ILLUMINATED SIGNAGE          */}
      {/* ======================================================== */}
      {/* Main Front Portal / Architrave */}
      <mesh position={[0, 3.25, 14.1]} castShadow receiveShadow>
        <boxGeometry args={[26.4, 6.5, 0.4]} />
        <meshStandardMaterial color="#1E2024" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Cutout for Glass Frontage (left and right glass pillars) */}
      {/* Massive Illuminated MOYEE COFFEE Signboard */}
      <group position={[0, 5.4, 14.35]}>
        <mesh castShadow>
          <boxGeometry args={[14, 2.0, 0.25]} />
          <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.14]}>
          <planeGeometry args={[13.6, 1.8]} />
          <meshBasicMaterial map={neonSignTexture} toneMapped={false} />
        </mesh>
        {/* Sign Neon Glow Light */}
        <pointLight
          position={[0, 0, 0.8]}
          color="#E5007D"
          intensity={isNight ? 18 : 6}
          distance={12}
          decay={1.8}
        />
      </group>

      {/* Front Architectural Glass Windows */}
      {/* Left Glass Window */}
      <mesh position={[-7.5, 2.5, 14.15]}>
        <boxGeometry args={[9, 4.4, 0.1]} />
        <meshPhysicalMaterial
          color="#E0F7FA"
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.1}
          transmission={0.8}
          ior={1.5}
        />
      </mesh>
      {/* Right Glass Window */}
      <mesh position={[7.5, 2.5, 14.15]}>
        <boxGeometry args={[9, 4.4, 0.1]} />
        <meshPhysicalMaterial
          color="#E0F7FA"
          transparent
          opacity={0.35}
          roughness={0.05}
          metalness={0.1}
          transmission={0.8}
          ior={1.5}
        />
      </mesh>

      {/* Glass Sliding Entrance Doors (X: -2.5 to 2.5) */}
      <group position={[0, 2.2, 14.15]}>
        {/* Left Door Panel */}
        <mesh position={[isInsideStore ? -2.2 : -1.2, 0, 0]}>
          <boxGeometry args={[2.2, 4.0, 0.08]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transparent
            opacity={0.4}
            roughness={0.1}
            transmission={0.7}
          />
        </mesh>
        {/* Right Door Panel */}
        <mesh position={[isInsideStore ? 2.2 : 1.2, 0, 0]}>
          <boxGeometry args={[2.2, 4.0, 0.08]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transparent
            opacity={0.4}
            roughness={0.1}
            transmission={0.7}
          />
        </mesh>
        {/* Door Frame Metal Trim */}
        <mesh position={[0, 2.05, 0]}>
          <boxGeometry args={[4.8, 0.12, 0.15]} />
          <meshStandardMaterial color="#E5007D" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Welcome Mat / Doormat at Entrance */}
      <mesh position={[0, 0.02, 13.6]} receiveShadow>
        <planeGeometry args={[3.6, 1.8]} />
        <meshStandardMaterial color="#E5007D" roughness={0.9} />
      </mesh>

      {/* ======================================================== */}
      {/* 3. STORE INTERIOR (Floor, Ceiling, Walls, Structure)     */}
      {/* ======================================================== */}
      {/* Interior Parquet Oak Wooden Floor (X: -13 to 13, Z: -16 to 14) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -1]} receiveShadow>
        <planeGeometry args={[26, 30]} />
        <meshStandardMaterial
          map={woodFloorTexture}
          roughness={0.4}
          metalness={0.05}
        />
      </mesh>

      {/* Ceiling (Y: 6.0) with Modern Recessed Dark Finish */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6.0, -1]} receiveShadow>
        <planeGeometry args={[26, 30]} />
        <meshStandardMaterial color="#1A1C20" roughness={0.8} />
      </mesh>

      {/* Back Wall (Z: -16) */}
      <mesh position={[0, 3.0, -16]} receiveShadow>
        <boxGeometry args={[26, 6.0, 0.4]} />
        <meshStandardMaterial color="#EEECE1" roughness={0.7} />
      </mesh>

      {/* Left Wall (X: -13, Z: -1 to 14) */}
      <mesh position={[-13, 3.0, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 6.0, 0.4]} />
        <meshStandardMaterial color="#272727" roughness={0.6} />
      </mesh>

      {/* Right Wall (X: 13, Z: -1 to 14) */}
      <mesh position={[13, 3.0, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 6.0, 0.4]} />
        <meshStandardMaterial color="#272727" roughness={0.6} />
      </mesh>

      {/* Warm Architectural Accent Trim along Ceiling */}
      <mesh position={[0, 5.85, -1]}>
        <boxGeometry args={[25.6, 0.2, 29.6]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* ======================================================== */}
      {/* 4. LARGE WALL POSTERS & BRANDING ARTWORK                 */}
      {/* ======================================================== */}
      {/* Poster 1 on Left Wall (Radically Good Coffee) */}
      <mesh position={[-12.75, 3.5, 4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.4, 3.6]} />
        <meshBasicMaterial map={poster1} />
      </mesh>

      {/* Poster 2 on Left Wall (FairChain 50/50 Split) */}
      <mesh position={[-12.75, 3.5, -4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.4, 3.6]} />
        <meshBasicMaterial map={poster2} />
      </mesh>

      {/* Poster 3 on Right Wall (We Roast at Origin) */}
      <mesh position={[12.75, 3.5, 4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2.4, 3.6]} />
        <meshBasicMaterial map={poster3} />
      </mesh>

      {/* ======================================================== */}
      {/* 5. INTERIOR PENDANT LIGHTING FIXTURES                    */}
      {/* ======================================================== */}
      {[-6, 0, 6].map((x) =>
        [-8, 0, 8].map((z) => (
          <group key={`pendant-${x}-${z}`} position={[x, 5.0, z]}>
            {/* Cord */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 1.0, 6]} />
              <meshStandardMaterial color="#1A1A1A" />
            </mesh>
            {/* Matte Black Shade */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.4, 0.35, 12, 1, true]} />
              <meshStandardMaterial color="#272727" metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Warm Bulb */}
            <mesh position={[0, -0.05, 0]}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshStandardMaterial color="#FFF8E1" emissive="#FFD54F" emissiveIntensity={1.8} />
            </mesh>
            <pointLight position={[0, -0.2, 0]} color="#FFF3E0" intensity={4} distance={8} decay={2} />
          </group>
        ))
      )}

      {/* ======================================================== */}
      {/* 6. REAL STORE HANGING AISLE & DEPARTMENT SIGNS          */}
      {/* ======================================================== */}
      {/* Left Wall Beans Sign */}
      <group position={[-10.8, 4.2, 0]}>
        <Html position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} transform center distanceFactor={14}>
          <div className="bg-moyee-charcoal/95 border-2 border-moyee-yellow px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 select-none whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-moyee-yellow animate-pulse" />
            <span className="font-oswald text-xs sm:text-sm uppercase font-bold tracking-widest text-white">
              ☕ AISLE 1: ETHIOPIAN SINGLE ORIGIN BEANS
            </span>
          </div>
        </Html>
      </group>

      {/* Right Wall Capsules Sign */}
      <group position={[10.8, 4.2, 0]}>
        <Html position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} transform center distanceFactor={14}>
          <div className="bg-moyee-charcoal/95 border-2 border-moyee-pink px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 select-none whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-moyee-pink animate-pulse" />
            <span className="font-oswald text-xs sm:text-sm uppercase font-bold tracking-widest text-white">
              🔴 AISLE 2: COMPOSTABLE CAPSULES & PODS
            </span>
          </div>
        </Html>
      </group>

      {/* Tasting Bar Overhead Sign */}
      <group position={[-4.5, 4.0, -8.5]}>
        <Html position={[0, 0, 0]} transform center distanceFactor={14}>
          <div className="bg-moyee-charcoal/95 border-2 border-moyee-yellow px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 select-none whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-oswald text-xs sm:text-sm uppercase font-bold tracking-widest text-white">
              ☕ TASTING BAR • SAMPLE FRESH ROASTS
            </span>
          </div>
        </Html>
      </group>

      {/* Checkout Overhead Sign */}
      <group position={[4.5, 4.0, -8.5]}>
        <Html position={[0, 0, 0]} transform center distanceFactor={14}>
          <div className="bg-moyee-charcoal/95 border-2 border-green-500 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 select-none whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-oswald text-xs sm:text-sm uppercase font-bold tracking-widest text-white">
              💳 CASHIER & EXPRESS CHECKOUT
            </span>
          </div>
        </Html>
      </group>
    </group>
  );
};
