import React, { useMemo } from 'react';
import * as THREE from 'three';
import { textureFactory } from '../../utils/textures';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

// Sleek GTA-Style Parked Sports Coupe / Sedan with Metallic Clearcoat & LED Light Bars
const ParkedCar: React.FC<{
  position: [number, number, number];
  rotationY?: number;
  bodyColor: string;
  isNight: boolean;
}> = ({ position, rotationY = 0, bodyColor, isNight }) => {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Main Lower Chassis Body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.52, 1.92]} />
        <meshPhysicalMaterial
          color={bodyColor}
          metalness={0.85}
          roughness={0.14}
          clearcoat={1.0}
          clearcoatRoughness={0.08}
        />
      </mesh>

      {/* Aerodynamic Upper Cabin / Greenhouse */}
      <mesh position={[-0.2, 0.88, 0]} castShadow>
        <boxGeometry args={[2.3, 0.44, 1.62]} />
        <meshPhysicalMaterial
          color="#0F172A"
          metalness={0.9}
          roughness={0.05}
          clearcoat={1.0}
        />
      </mesh>

      {/* Roof Panel */}
      <mesh position={[-0.2, 1.11, 0]}>
        <boxGeometry args={[2.1, 0.04, 1.56]} />
        <meshPhysicalMaterial color={bodyColor} metalness={0.85} roughness={0.14} clearcoat={1.0} />
      </mesh>

      {/* Front Grille */}
      <mesh position={[2.21, 0.4, 0]}>
        <boxGeometry args={[0.04, 0.28, 1.3]} />
        <meshStandardMaterial color="#090A0F" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* LED Headlights (Front +X) */}
      {[-0.68, 0.68].map((zOff, i) => (
        <mesh key={`hl-${i}`} position={[2.21, 0.52, zOff]}>
          <boxGeometry args={[0.04, 0.1, 0.36]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#E0F2FE"
            emissiveIntensity={isNight ? 3.5 : 1.2}
          />
        </mesh>
      ))}

      {/* Full-Width LED Taillight Bar (Rear -X) */}
      <mesh position={[-2.21, 0.54, 0]}>
        <boxGeometry args={[0.04, 0.09, 1.72]} />
        <meshStandardMaterial
          color="#EF4444"
          emissive="#DC2626"
          emissiveIntensity={isNight ? 3.2 : 1.2}
        />
      </mesh>

      {/* 4 Alloy Wheels & Tires */}
      {[
        [-1.35, 0.34, 0.94],
        [1.35, 0.34, 0.94],
        [-1.35, 0.34, -0.94],
        [1.35, 0.34, -0.94]
      ].map(([wx, wy, wz], idx) => (
        <group key={`wheel-${idx}`} position={[wx, wy, wz]} rotation={[Math.PI / 2, 0, 0]}>
          {/* Tire */}
          <mesh castShadow>
            <cylinderGeometry args={[0.34, 0.34, 0.24, 16]} />
            <meshStandardMaterial color="#141416" roughness={0.85} />
          </mesh>
          {/* Metallic Alloy Rim */}
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 0.25, 12]} />
            <meshStandardMaterial color="#D4D4D8" metalness={0.95} roughness={0.15} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const StoreBuilding: React.FC = () => {
  const isInsideStore = useStore((s) => s.isInsideStore);
  const dayNightMode = useStore((s) => s.dayNightMode);
  const isNight = dayNightMode === 'night';

  const woodFloorTexture = useMemo(() => textureFactory.getWoodFloorTexture(), []);
  const woodBumpTexture = useMemo(() => textureFactory.getWoodBumpTexture(), []);
  const streetTexture = useMemo(() => textureFactory.getStreetTexture(), []);
  const sidewalkTexture = useMemo(() => textureFactory.getSidewalkTexture(), []);
  const brickWallTexture = useMemo(() => textureFactory.getBrickWallTexture(), []);
  const neonSignTexture = useMemo(() => textureFactory.getNeonSignTexture(), []);

  const cityFacadeLeft = useMemo(
    () => textureFactory.getCityBuildingTexture(isNight, '#2B303A'),
    [isNight]
  );
  const cityFacadeRight = useMemo(
    () => textureFactory.getCityBuildingTexture(isNight, '#362F2B'),
    [isNight]
  );
  const cityFacadeOpposite = useMemo(
    () => textureFactory.getCityBuildingTexture(isNight, '#232832'),
    [isNight]
  );

  // Framed interior art prints
  const poster1 = useMemo(
    () => textureFactory.getPosterTexture('HIGH ALTITUDE HARVEST', 'SHADE GROWN ARABICA • 2,100M', '#D4AF37'),
    []
  );
  const poster2 = useMemo(
    () => textureFactory.getPosterTexture('DIRECT ORIGIN SHARE', '50/50 VALUE AT SOURCE • TRADE NOT AID', '#C86D2D'),
    []
  );
  const poster3 = useMemo(
    () => textureFactory.getPosterTexture('ARTISAN SMALL BATCH', 'ROASTED IN ADDIS ABABA & NAIROBI', '#EAB308'),
    []
  );

  return (
    <group name="store-building">
      {/* ======================================================== */}
      {/* 1. GTA-STYLE CITY BOULEVARD, CROSSWALK & SIDEWALKS       */}
      {/* ======================================================== */}
      {/* Main Asphalt Roadway (Z: 18 to 38, X: -40 to 40) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 27]} receiveShadow>
        <planeGeometry args={[80, 22]} />
        <meshStandardMaterial
          map={streetTexture}
          roughness={0.62}
          metalness={0.18}
        />
      </mesh>

      {/* Storefront Granite Sidewalk Promenade (Z: 14 to 19.2) */}
      <mesh position={[0, 0.08, 16.6]} receiveShadow>
        <boxGeometry args={[64, 0.16, 5.2]} />
        <meshStandardMaterial map={sidewalkTexture} roughness={0.75} metalness={0.08} />
      </mesh>

      {/* Granite Curb Edge */}
      <mesh position={[0, 0.09, 19.22]} receiveShadow>
        <boxGeometry args={[64, 0.18, 0.18]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.6} />
      </mesh>

      {/* Opposite Boulevard Sidewalk (Z: 33.5) */}
      <mesh position={[0, 0.08, 33.5]} receiveShadow>
        <boxGeometry args={[80, 0.16, 4.0]} />
        <meshStandardMaterial map={sidewalkTexture} roughness={0.8} />
      </mesh>

      {/* Road Center Dashed Double Yellow & Lane Dividers */}
      {[-24, -18, -12, -6, 6, 12, 18, 24].map((xDash, idx) => (
        <mesh key={`lane-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[xDash, 0.015, 26.2]}>
          <planeGeometry args={[3.2, 0.16]} />
          <meshBasicMaterial color="#EAB308" />
        </mesh>
      ))}

      {/* Zebra Pedestrian Crosswalk Leading to Store Entrance */}
      {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((xStripe, idx) => (
        <mesh key={`zebra-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[xStripe, 0.016, 21.2]}>
          <planeGeometry args={[0.35, 3.2]} />
          <meshBasicMaterial color="#F1F5F9" />
        </mesh>
      ))}

      {/* ======================================================== */}
      {/* 2. PARKED CARS, OUTDOOR PATIO TERRACE & STREET PROPS     */}
      {/* ======================================================== */}
      {/* Parked Sports Coupe (Left Curbside) */}
      <ParkedCar position={[-9.5, 0, 22.8]} rotationY={0.02} bodyColor="#1E3A8A" isNight={isNight} />

      {/* Parked Luxury Touring Sedan (Right Curbside) */}
      <ParkedCar position={[10.5, 0, 22.8]} rotationY={-0.02} bodyColor="#3F3F46" isNight={isNight} />

      {/* Sidewalk Café Bistro Tables & Umbrellas (Left & Right of Entrance) */}
      {[-5.2, 5.2].map((xPatio, idx) => (
        <group key={`patio-${idx}`} position={[xPatio, 0.16, 16.0]}>
          {/* Round Marble Bistro Table */}
          <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.65, 0.65, 0.05, 20]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.1} />
          </mesh>
          {/* Cast Iron Pedestal */}
          <mesh position={[0, 0.37, 0]}>
            <cylinderGeometry args={[0.05, 0.26, 0.74, 10]} />
            <meshStandardMaterial color="#18181B" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Architectural Canvas Café Parasol */}
          <mesh position={[0, 1.35, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
            <meshStandardMaterial color="#D4AF37" metalness={0.8} />
          </mesh>
          <mesh position={[0, 2.05, 0]} castShadow>
            <coneGeometry args={[1.35, 0.45, 8]} />
            <meshStandardMaterial color="#1E2026" roughness={0.85} />
          </mesh>
          {/* Espresso Cups on Patio Table */}
          <mesh position={[-0.2, 0.8, 0.1]}>
            <cylinderGeometry args={[0.05, 0.04, 0.07, 10]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.15} />
          </mesh>
          <mesh position={[0.22, 0.8, -0.1]}>
            <cylinderGeometry args={[0.05, 0.04, 0.07, 10]} />
            <meshStandardMaterial color="#C86D2D" roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Street Trees & Architectural Planters */}
      {[-10, 10].map((xPos, idx) => (
        <group key={`tree-${idx}`} position={[xPos, 0.16, 17.8]}>
          {/* Corten Steel & Granite Planter Box */}
          <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.8, 0.76, 1.8]} />
            <meshStandardMaterial color="#27272A" roughness={0.6} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.77, 0]}>
            <boxGeometry args={[1.6, 0.04, 1.6]} />
            <meshStandardMaterial color="#2E1F14" roughness={1.0} />
          </mesh>
          {/* Natural Tree Trunk & Branches */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.22, 2.8, 10]} />
            <meshStandardMaterial color="#4A321F" roughness={0.9} />
          </mesh>
          {/* Multi-Cluster Realistic Foliage Canopy */}
          <mesh position={[0, 4.0, 0]} castShadow>
            <dodecahedronGeometry args={[1.45, 2]} />
            <meshStandardMaterial color={isNight ? '#1B3B22' : '#2D5A27'} roughness={0.82} />
          </mesh>
          <mesh position={[-0.65, 3.6, 0.4]} castShadow>
            <dodecahedronGeometry args={[0.95, 2]} />
            <meshStandardMaterial color={isNight ? '#23492B' : '#3A6B33'} roughness={0.82} />
          </mesh>
          <mesh position={[0.6, 3.7, -0.3]} castShadow>
            <dodecahedronGeometry args={[1.0, 2]} />
            <meshStandardMaterial color={isNight ? '#18331E' : '#254D20'} roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Sidewalk Benches (Kept at [-6, 0, 18] & [6, 0, 18] so Golden Bean #1 sits naturally on the bench) */}
      {[-6, 6].map((xPos, idx) => (
        <group key={`bench-${idx}`} position={[xPos, 0.16, 18.0]} rotation={[0, xPos > 0 ? -0.15 : 0.15, 0]}>
          <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.1, 0.08, 0.58]} />
            <meshStandardMaterial color="#6D4C3D" roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.82, -0.25]} castShadow>
            <boxGeometry args={[2.1, 0.65, 0.07]} />
            <meshStandardMaterial color="#6D4C3D" roughness={0.55} />
          </mesh>
          <mesh position={[-0.85, 0.21, 0]}>
            <boxGeometry args={[0.08, 0.42, 0.5]} />
            <meshStandardMaterial color="#18181B" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0.85, 0.21, 0]}>
            <boxGeometry args={[0.08, 0.42, 0.5]} />
            <meshStandardMaterial color="#18181B" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Architectural Street Lamps */}
      {[-13.5, 13.5].map((xPos, idx) => (
        <group key={`lamp-${idx}`} position={[xPos, 0.16, 18.6]}>
          <mesh position={[0, 2.7, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.12, 5.4, 10]} />
            <meshStandardMaterial color="#18181B" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 5.5, 0.35]}>
            <boxGeometry args={[0.3, 0.12, 0.8]} />
            <meshStandardMaterial color="#18181B" metalness={0.9} />
          </mesh>
          <mesh position={[0, 5.42, 0.55]}>
            <boxGeometry args={[0.24, 0.04, 0.45]} />
            <meshStandardMaterial
              color="#FFFBEB"
              emissive="#F59E0B"
              emissiveIntensity={isNight ? 3.5 : 0.8}
            />
          </mesh>
        </group>
      ))}
      {/* Single consolidated exterior street light for night atmosphere */}
      {isNight && (
        <pointLight position={[0, 6.5, 19]} color="#F59E0B" intensity={18} distance={28} decay={1.7} />
      )}

      {/* ======================================================== */}
      {/* 3. SURROUNDING GTA-STYLE URBAN CITY BLOCK BUILDINGS      */}
      {/* ======================================================== */}
      {/* Upper Residential/Office Floors Above Flagship Store */}
      <mesh position={[0, 11.5, 12.5]}>
        <boxGeometry args={[26.4, 10.0, 4.0]} />
        <meshStandardMaterial map={cityFacadeLeft} roughness={0.65} metalness={0.15} />
      </mesh>
      {/* Left Neighboring Commercial Building */}
      <mesh position={[-23.5, 9.0, 13.5]}>
        <boxGeometry args={[18, 18, 8]} />
        <meshStandardMaterial map={cityFacadeRight} roughness={0.7} />
      </mesh>
      {/* Right Neighboring Commercial Building */}
      <mesh position={[23.5, 10.0, 13.5]}>
        <boxGeometry args={[18, 20, 8]} />
        <meshStandardMaterial map={cityFacadeLeft} roughness={0.7} />
      </mesh>
      {/* Across-the-Street City Block Skyline */}
      <mesh position={[-16, 11.0, 37.5]}>
        <boxGeometry args={[22, 22, 6]} />
        <meshStandardMaterial map={cityFacadeOpposite} roughness={0.7} />
      </mesh>
      <mesh position={[8, 13.0, 37.5]}>
        <boxGeometry args={[24, 26, 6]} />
        <meshStandardMaterial map={cityFacadeLeft} roughness={0.7} />
      </mesh>

      {/* ======================================================== */}
      {/* 4. FLAGSHIP STORE EXTERIOR FACADE & ARCHITECTURAL SIGN   */}
      {/* ======================================================== */}
      {/* Upper Fascia Beam & Columns */}
      <mesh position={[0, 5.4, 14.1]} castShadow receiveShadow>
        <boxGeometry args={[26.6, 2.2, 0.5]} />
        <meshStandardMaterial color="#14161A" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Left & Right Corner Stone Pilasters */}
      {[-12.6, 12.6].map((xCol, idx) => (
        <mesh key={`pilaster-${idx}`} position={[xCol, 3.25, 14.1]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 6.5, 0.55]} />
          <meshStandardMaterial color="#181A20" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}
      {/* Entrance Portal Mullion Columns */}
      {[-2.6, 2.6].map((xMul, idx) => (
        <mesh key={`mullion-${idx}`} position={[xMul, 2.2, 14.12]} castShadow>
          <boxGeometry args={[0.28, 4.4, 0.35]} />
          <meshStandardMaterial color="#111317" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}

      {/* Warm Cedar Wood Entrance Canopy Overhang */}
      <mesh position={[0, 4.35, 14.85]} castShadow>
        <boxGeometry args={[26.4, 0.18, 1.5]} />
        <meshStandardMaterial color="#7C4D2B" roughness={0.45} metalness={0.1} />
      </mesh>

      {/* Illuminated ORIGIN ROASTERY Flagship Signboard */}
      <group position={[0, 5.45, 14.4]}>
        <mesh castShadow>
          <boxGeometry args={[14.2, 1.9, 0.22]} />
          <meshStandardMaterial color="#0F1115" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={[13.8, 1.75]} />
          <meshBasicMaterial map={neonSignTexture} toneMapped={false} />
        </mesh>
      </group>

      {/* Front Architectural Glass Curtain Wall Windows */}
      <mesh position={[-7.5, 2.2, 14.12]}>
        <boxGeometry args={[9.4, 4.3, 0.08]} />
        <meshPhysicalMaterial
          color="#E2E8F0"
          transparent
          opacity={0.28}
          roughness={0.04}
          metalness={0.15}
          reflectivity={0.95}
          clearcoat={1.0}
        />
      </mesh>
      <mesh position={[7.5, 2.2, 14.12]}>
        <boxGeometry args={[9.4, 4.3, 0.08]} />
        <meshPhysicalMaterial
          color="#E2E8F0"
          transparent
          opacity={0.28}
          roughness={0.04}
          metalness={0.15}
          reflectivity={0.95}
          clearcoat={1.0}
        />
      </mesh>

      {/* Glass Automatic Sliding Entrance Doors (X: -2.4 to 2.4) */}
      <group position={[0, 2.1, 14.12]}>
        <mesh position={[isInsideStore ? -2.2 : -1.15, 0, 0]}>
          <boxGeometry args={[2.15, 4.1, 0.06]} />
          <meshPhysicalMaterial
            color="#F8FAFC"
            transparent
            opacity={0.32}
            roughness={0.05}
            metalness={0.1}
            clearcoat={1.0}
          />
        </mesh>
        <mesh position={[isInsideStore ? 2.2 : 1.15, 0, 0]}>
          <boxGeometry args={[2.15, 4.1, 0.06]} />
          <meshPhysicalMaterial
            color="#F8FAFC"
            transparent
            opacity={0.32}
            roughness={0.05}
            metalness={0.1}
            clearcoat={1.0}
          />
        </mesh>
        {/* Brushed Brass Door Header */}
        <mesh position={[0, 2.1, 0]}>
          <boxGeometry args={[5.0, 0.12, 0.18]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Ribbed Charcoal Coir Welcome Mat at Entrance */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 13.5]} receiveShadow>
        <planeGeometry args={[3.8, 1.8]} />
        <meshStandardMaterial color="#1F242B" roughness={0.95} />
      </mesh>

      {/* ======================================================== */}
      {/* 5. STORE INTERIOR (Hardwood Floor, Brick Walls, Ceiling) */}
      {/* ======================================================== */}
      {/* Interior Polished Walnut-Oak Floor with Bump & Specular Finish */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -1]} receiveShadow>
        <planeGeometry args={[26, 30]} />
        <meshStandardMaterial
          map={woodFloorTexture}
          bumpMap={woodBumpTexture}
          bumpScale={0.015}
          roughness={0.26}
          metalness={0.08}
        />
      </mesh>

      {/* Ceiling (Y: 6.0) with Architectural Coffers & Acoustic Timber Beams */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 6.0, -1]}>
        <planeGeometry args={[26, 30]} />
        <meshStandardMaterial color="#111317" roughness={0.85} />
      </mesh>
      {[-10, -5, 0, 5, 10].map((zBeam, idx) => (
        <mesh key={`beam-${idx}`} position={[0, 5.82, zBeam]}>
          <boxGeometry args={[25.6, 0.28, 0.35]} />
          <meshStandardMaterial color="#3E2723" roughness={0.55} />
        </mesh>
      ))}

      {/* Back Wall (Z: -16) — Warm Architectural Travertine */}
      <mesh position={[0, 3.0, -16]} receiveShadow>
        <boxGeometry args={[26, 6.0, 0.4]} />
        <meshStandardMaterial color="#E5E0D5" roughness={0.65} />
      </mesh>

      {/* Left Wall (X: -13) — Exposed Industrial Brick */}
      <mesh position={[-13, 3.0, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 6.0, 0.4]} />
        <meshStandardMaterial map={brickWallTexture} roughness={0.78} />
      </mesh>

      {/* Right Wall (X: 13) — Exposed Industrial Brick */}
      <mesh position={[13, 3.0, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[30, 6.0, 0.4]} />
        <meshStandardMaterial map={brickWallTexture} roughness={0.78} />
      </mesh>

      {/* ======================================================== */}
      {/* 6. FRAMED GALLERY ARTWORK                                */}
      {/* ======================================================== */}
      <mesh position={[-12.75, 3.5, 4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.4, 3.6]} />
        <meshBasicMaterial map={poster1} />
      </mesh>
      <mesh position={[-12.75, 3.5, -4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.4, 3.6]} />
        <meshBasicMaterial map={poster2} />
      </mesh>
      <mesh position={[12.75, 3.5, 4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2.4, 3.6]} />
        <meshBasicMaterial map={poster3} />
      </mesh>

      {/* ======================================================== */}
      {/* 7. INTERIOR PENDANT LIGHTING FIXTURES (Emissive Optimized)*/}
      {/* ======================================================== */}
      {[-6, 0, 6].map((x) =>
        [-8, 0, 8].map((z) => (
          <group key={`pendant-${x}-${z}`} position={[x, 5.0, z]}>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 1.0, 6]} />
              <meshStandardMaterial color="#18181B" />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.38, 0.34, 12, 1, true]} />
              <meshStandardMaterial color="#18181B" metalness={0.85} roughness={0.22} />
            </mesh>
            <mesh position={[0, -0.05, 0]}>
              <sphereGeometry args={[0.12, 10, 10]} />
              <meshStandardMaterial color="#FFFBEB" emissive="#F59E0B" emissiveIntensity={2.4} />
            </mesh>
          </group>
        ))
      )}

      {/* ======================================================== */}
      {/* 8. ARCHITECTURAL HANGING AISLE & DEPARTMENT SIGNS        */}
      {/* ======================================================== */}
      <group position={[-10.8, 4.2, 0]}>
        <ProximityHtml radius={6.5} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]} transform center distanceFactor={14}>
          <div className="bg-moyee-charcoal/95 border border-moyee-yellow/70 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 select-none whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-moyee-yellow animate-pulse" />
            <span className="font-oswald text-xs sm:text-sm uppercase font-bold tracking-widest text-white">
              ☕ AISLE 1: SINGLE ESTATE & ORIGIN BEANS
            </span>
          </div>
        </ProximityHtml>
      </group>

      <group position={[10.8, 4.2, 0]}>
        <ProximityHtml radius={6.5} position={[0, 0, 0]} rotation={[0, -Math.PI / 2, 0]} transform center distanceFactor={14}>
          <div className="bg-moyee-charcoal/95 border border-moyee-pink/70 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 select-none whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-moyee-pink animate-pulse" />
            <span className="font-oswald text-xs sm:text-sm uppercase font-bold tracking-widest text-white">
              📦 AISLE 2: NITROGEN CAPSULES & TASTING BUNDLES
            </span>
          </div>
        </ProximityHtml>
      </group>

      <group position={[-4.5, 4.0, -8.5]}>
        <ProximityHtml radius={6.5} position={[0, 0, 0]} transform center distanceFactor={14}>
          <div className="bg-moyee-charcoal/95 border border-moyee-yellow/70 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 select-none whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-oswald text-xs sm:text-sm uppercase font-bold tracking-widest text-white">
              ☕ ESPRESSO & TASTING BAR • FRESH EXTRACTIONS
            </span>
          </div>
        </ProximityHtml>
      </group>

      <group position={[4.5, 4.0, -8.5]}>
        <ProximityHtml radius={6.5} position={[0, 0, 0]} transform center distanceFactor={14}>
          <div className="bg-moyee-charcoal/95 border border-emerald-500/70 px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md flex items-center space-x-2 select-none whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-oswald text-xs sm:text-sm uppercase font-bold tracking-widest text-white">
              💳 CASHIER & EXPRESS POS CHECKOUT
            </span>
          </div>
        </ProximityHtml>
      </group>
    </group>
  );
};
