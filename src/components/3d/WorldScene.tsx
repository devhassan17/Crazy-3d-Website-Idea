import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, Stars, ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { StoreBuilding } from './StoreBuilding';
import { ProductShelves } from './ProductShelves';
import { CheckoutCounter } from './CheckoutCounter';
import { TastingBar } from './TastingBar';
import { SubscriptionLounge } from './SubscriptionLounge';
import { FairChainGallery } from './FairChainGallery';
import { CustomerSupportDesk } from './CustomerSupportDesk';
import { CoffeeQuizKiosk } from './CoffeeQuizKiosk';
import { DeliveryDesk } from './DeliveryDesk';
import { GoldenBeans } from './GoldenBeans';
import { PlayerController } from './PlayerController';

// Animated Destination Floor Ring when clicking to glide
const FloorDestinationBeacon: React.FC<{ target: [number, number, number] }> = ({ target }) => {
  const ringRef = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();
      const s = 1 + Math.sin(t * 6) * 0.16;
      ringRef.current.scale.set(s, s, s);
      ringRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group position={[target[0], 0.06, target[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.32, 0.46, 32]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.14, 24]} />
        <meshBasicMaterial color="#FFFBEB" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const WorldScene: React.FC = () => {
  // Fine-grained Zustand selectors so WorldScene never re-renders on player movement
  const dayNightMode = useStore((s) => s.dayNightMode);
  const setTargetPosition = useStore((s) => s.setTargetPosition);
  const targetPosition = useStore((s) => s.targetPosition);
  const activeModal = useStore((s) => s.activeModal);

  const isNight = dayNightMode === 'night';

  const handleFloorClick = (e: { point: THREE.Vector3; stopPropagation: () => void; delta?: number }) => {
    if (activeModal === null && (!e.delta || e.delta < 6)) {
      setTargetPosition([e.point.x, 1.7, e.point.z]);
    }
  };

  return (
    <div className="w-full h-full relative" style={{ touchAction: 'none' }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        performance={{ min: 0.6 }}
        camera={{ fov: 65, near: 0.1, far: 130, position: [0, 1.7, 23] }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isNight ? 1.15 : 1.08
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* ======================================================== */}
          {/* 1. ATMOSPHERIC SKY, FOG & PBR ENVIRONMENT REFLECTIONS    */}
          {/* ======================================================== */}
          <color attach="background" args={[isNight ? '#060911' : '#C8DCEB']} />
          <fog attach="fog" args={[isNight ? '#060911' : '#D5E3EE', 32, 115]} />

          {isNight ? (
            <Stars radius={80} depth={40} count={1800} factor={3.5} saturation={0.2} fade speed={0.5} />
          ) : (
            <Sky
              distance={450000}
              sunPosition={[35, 18, 28]}
              inclination={0.52}
              azimuth={0.22}
              turbidity={6.5}
              rayleigh={1.6}
              mieCoefficient={0.005}
              mieDirectionalG={0.82}
            />
          )}

          {/* Offline Single-Frame PBR HDRI Environment Map for Realistic Specular & Clearcoat Reflections */}
          <Environment frames={1} resolution={256}>
            <color attach="background" args={[isNight ? '#0B101B' : '#1E293B']} />
            {/* Overhead Sky / Ceiling Softboxes */}
            <Lightformer
              form="rect"
              intensity={isNight ? 1.5 : 3.2}
              color={isNight ? '#93C5FD' : '#FFFBEB'}
              position={[0, 12, 0]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[24, 24, 1]}
            />
            {/* Golden Hour / Street Horizon Reflection Strip */}
            <Lightformer
              form="rect"
              intensity={isNight ? 2.2 : 4.5}
              color={isNight ? '#F59E0B' : '#FDE68A'}
              position={[20, 4, 25]}
              rotation={[0, -Math.PI / 4, 0]}
              scale={[18, 6, 1]}
            />
            {/* Cool City Bounce Strip */}
            <Lightformer
              form="rect"
              intensity={1.8}
              color="#38BDF8"
              position={[-20, 5, -15]}
              rotation={[0, Math.PI / 3, 0]}
              scale={[16, 6, 1]}
            />
          </Environment>

          {/* ======================================================== */}
          {/* 2. OPTIMIZED PHYSICALLY-BASED LIGHTING ENGINE            */}
          {/* ======================================================== */}
          {/* Natural Sky/Ground Bounce Light */}
          <hemisphereLight
            color={isNight ? '#3B82F6' : '#FFFBEB'}
            groundColor={isNight ? '#0F172A' : '#45382B'}
            intensity={isNight ? 0.45 : 0.75}
          />

          {/* Primary Directional Sun / Moon Light with Soft Shadows */}
          <directionalLight
            position={[22, 34, 26]}
            color={isNight ? '#93C5FD' : '#FFF3D6'}
            intensity={isNight ? 0.85 : 2.4}
            castShadow
            shadow-mapSize-width={1536}
            shadow-mapSize-height={1536}
            shadow-camera-near={1}
            shadow-camera-far={85}
            shadow-camera-left={-24}
            shadow-camera-right={24}
            shadow-camera-top={24}
            shadow-camera-bottom={-24}
            shadow-bias={-0.0002}
          />

          {/* Consolidated Interior Warm Architectural Fill Lights (Only 2 lights for 60fps performance) */}
          <pointLight position={[0, 5.2, 2]} color="#FFE4B5" intensity={14} distance={24} decay={1.8} />
          <pointLight position={[0, 5.2, -9]} color="#FFD89B" intensity={14} distance={22} decay={1.8} />

          {/* ======================================================== */}
          {/* 3. INVISIBLE CLICK-TO-MOVE TARGET PLANE                  */}
          {/* ======================================================== */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.005, 5]}
            visible={false}
            onClick={handleFloorClick}
          >
            <planeGeometry args={[52, 62]} />
            <meshBasicMaterial />
          </mesh>

          {/* ======================================================== */}
          {/* 4. ASSEMBLED 3D GAMEPLAY ENTITIES                        */}
          {/* ======================================================== */}
          <StoreBuilding />
          <ProductShelves />
          <CheckoutCounter />
          <TastingBar />
          <SubscriptionLounge />
          <FairChainGallery />
          <CustomerSupportDesk />
          <CoffeeQuizKiosk />
          <DeliveryDesk />
          <GoldenBeans />

          {/* First-Person Controller */}
          <PlayerController />

          {/* Target Glide Beacon on Floor */}
          {targetPosition && <FloorDestinationBeacon target={targetPosition} />}

          {/* Baked Single-Pass Ground Contact Shadows (Zero Per-Frame Cost) */}
          <ContactShadows
            position={[0, 0.02, 0]}
            frames={1}
            opacity={0.55}
            scale={42}
            blur={2.2}
            far={8}
            resolution={512}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
