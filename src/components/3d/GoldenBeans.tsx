import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

interface BeanItem {
  id: string;
  name: string;
  position: [number, number, number];
  hint: string;
}

const BEANS_DATA: BeanItem[] = [
  {
    id: 'bean-1',
    name: 'Street Canal Bean',
    position: [-6.0, 0.7, 18.0],
    hint: 'Resting on an outdoor street bench under the tree canopy.'
  },
  {
    id: 'bean-2',
    name: 'Barista Secret Roast Bean',
    position: [-3.8, 1.45, -9.8],
    hint: 'Tucked right next to the coffee grinder at the Tasting Bar.'
  },
  {
    id: 'bean-3',
    name: 'Subscription Lounge Velvet Bean',
    position: [-6.4, 0.65, -12.8],
    hint: 'Resting by the leather armchairs in the Subscription Club.'
  },
  {
    id: 'bean-4',
    name: 'Postal Pigeon Bean',
    position: [6.6, 1.6, -12.8],
    hint: 'Sitting atop the Dutch post-office drop-box at Customer Support.'
  },
  {
    id: 'bean-5',
    name: 'Equatorial FairChain Bean',
    position: [0.0, 1.15, -12.4],
    hint: 'Glowing on the plinth right in front of the 3D rotating Earth Globe.'
  }
];

export const GoldenBeans: React.FC = () => {
  const { foundBeanIds, collectBean } = useStore();
  const beanRefs = useRef<THREE.Group[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    beanRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.rotation.y = t * 2.0 + idx;
        ref.position.y = BEANS_DATA[idx].position[1] + Math.sin(t * 3.0 + idx) * 0.08;
      }
    });
  });

  return (
    <group name="golden-beans">
      {BEANS_DATA.map((bean, idx) => {
        const isFound = foundBeanIds.includes(bean.id);
        if (isFound) return null; // Already collected!

        return (
          <group
            key={bean.id}
            ref={(el) => {
              if (el) beanRefs.current[idx] = el;
            }}
            position={bean.position}
            onClick={(e) => {
              e.stopPropagation();
              collectBean(bean.id);
            }}
          >
            {/* Glowing Golden Coffee Bean Mesh */}
            <mesh castShadow scale={[1.2, 1.6, 1.0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color="#FFD700"
                metalness={0.9}
                roughness={0.1}
                emissive="#FFB300"
                emissiveIntensity={0.8}
              />
            </mesh>

            {/* Coffee bean center split crease */}
            <mesh position={[0, 0, 0.11]}>
              <boxGeometry args={[0.03, 0.28, 0.02]} />
              <meshStandardMaterial color="#3E2723" roughness={0.9} />
            </mesh>

            {/* Radiant halo light */}
            <pointLight color="#FFD700" intensity={4} distance={2} />

            {/* Floating interactive indicator */}
            <Html position={[0, 0.35, 0]} center distanceFactor={8}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  collectBean(bean.id);
                }}
                className="bg-moyee-charcoal/90 border border-moyee-yellow px-2 py-0.5 rounded-full text-[9px] font-oswald text-moyee-yellow uppercase font-bold tracking-wider cursor-pointer whitespace-nowrap shadow-lg animate-pulse"
              >
                ✨ Collect Golden Bean!
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
