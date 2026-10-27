import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, ContactShadows } from '@react-three/drei';
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

import { useFrame } from '@react-three/fiber';

// Animated Destination Floor Ring when clicking to glide
const FloorDestinationBeacon: React.FC<{ target: [number, number, number] }> = ({ target }) => {
  const ringRef = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = clock.getElapsedTime();
      const s = 1 + Math.sin(t * 6) * 0.18;
      ringRef.current.scale.set(s, s, s);
      ringRef.current.rotation.z += 0.02;
    }
  });

  return (
    <group position={[target[0], 0.06, target[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.35, 0.5, 32]} />
        <meshBasicMaterial color="#FFD900" transparent opacity={0.85} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.16, 24]} />
        <meshBasicMaterial color="#E5007D" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export const WorldScene: React.FC = () => {
  const { dayNightMode, setTargetPosition, targetPosition, activeModal } = useStore();
  const isNight = dayNightMode === 'night';

  const handleFloorClick = (e: { point: THREE.Vector3; stopPropagation: () => void; delta?: number }) => {
    // Only glide if no modal is active and pointer didn't drag to look around
    if (activeModal === null && (!e.delta || e.delta < 6)) {
      setTargetPosition([e.point.x, 1.7, e.point.z]);
    }
  };

  return (
    <div className="w-full h-full relative" style={{ touchAction: 'none' }}>
      <Canvas
        shadows
        dpr={[1, 1.75]}
        performance={{ min: 0.6 }}
        camera={{ fov: 65, near: 0.1, far: 120, position: [0, 1.7, 24] }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isNight ? 1.3 : 1.15
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* ======================================================== */}
          {/* 1. SKY & ENVIRONMENTAL ATMOSPHERE                        */}
          {/* ======================================================== */}
          {isNight ? (
            <color attach="background" args={['#080C14']} />
          ) : (
            <Sky
              distance={450000}
              sunPosition={[25, 40, 35]}
              inclination={0.6}
              azimuth={0.25}
              turbidity={8}
              rayleigh={2}
            />
          )}

          {/* ======================================================== */}
          {/* 2. DYNAMIC LIGHTING ENGINE                               */}
          {/* ======================================================== */}
          {/* Ambient Lighting */}
          <ambientLight
            color={isNight ? '#1E293B' : '#FFFFFF'}
            intensity={isNight ? 0.45 : 0.9}
          />

          {/* Directional Sun / Moon Light */}
          <directionalLight
            position={[15, 35, 25]}
            color={isNight ? '#90CAF9' : '#FFF8E1'}
            intensity={isNight ? 0.6 : 2.0}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-near={0.5}
            shadow-camera-far={80}
            shadow-camera-left={-25}
            shadow-camera-right={25}
            shadow-camera-top={25}
            shadow-camera-bottom={-25}
            shadow-bias={-0.0001}
          />

          {/* Store Interior Overhead Warm Lighting Array */}
          <pointLight position={[0, 5.2, 0]} color="#FFF3E0" intensity={12} distance={20} decay={2} />
          <pointLight position={[0, 5.2, -8]} color="#FFF8E1" intensity={10} distance={18} decay={2} />
          <pointLight position={[0, 5.2, 8]} color="#FFF8E1" intensity={10} distance={18} decay={2} />

          {/* ======================================================== */}
          {/* 3. INVISIBLE CLICK-TO-MOVE TARGET PLANE                  */}
          {/* ======================================================== */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0.005, 5]}
            visible={false}
            onClick={handleFloorClick}
          >
            <planeGeometry args={[50, 60]} />
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

          {/* Soft Ground Contact Shadows */}
          <ContactShadows
            position={[0, 0.02, 0]}
            opacity={0.65}
            scale={40}
            blur={2.0}
            far={10}
            resolution={1024}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
