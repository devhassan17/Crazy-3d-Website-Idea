import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

interface BeanItem {
  id: string;
  name: string;
  position: [number, number, number];
  hint: string;
}

const BEANS_DATA: BeanItem[] = [
  {
    id: 'bean-1',
    name: 'Boulevard Terrace Bean',
    position: [-6.0, 0.85, 18.0],
    hint: 'Resting on an outdoor bench under the street tree canopy.'
  },
  {
    id: 'bean-2',
    name: 'Barista Secret Roast Bean',
    position: [-3.8, 1.45, -9.8],
    hint: 'Tucked right next to the burr coffee grinder at the Tasting Bar.'
  },
  {
    id: 'bean-3',
    name: 'Roaster Lounge Velvet Bean',
    position: [-6.4, 0.65, -12.8],
    hint: 'Resting by the cognac leather armchairs in the Roaster Club Lounge.'
  },
  {
    id: 'bean-4',
    name: 'Postal Pigeon Bean',
    position: [6.6, 1.6, -12.8],
    hint: 'Sitting atop the cast-iron post drop-box at Concierge Support.'
  },
  {
    id: 'bean-5',
    name: 'Equatorial Origin Bean',
    position: [0.0, 1.15, -12.4],
    hint: 'Glowing on the plinth right in front of the 3D rotating Earth Globe.'
  }
];

export const GoldenBeans: React.FC = () => {
  const foundBeanIds = useStore((s) => s.foundBeanIds);
  const collectBean = useStore((s) => s.collectBean);
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
        if (isFound) return null;

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
            {/* 24K Gold Metallic Coffee Bean Mesh (Emissive Glow — Zero Extra PointLight Overhead) */}
            <mesh castShadow scale={[1.2, 1.6, 1.0]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshPhysicalMaterial
                color="#FFD700"
                metalness={1.0}
                roughness={0.08}
                clearcoat={1.0}
                emissive="#F59E0B"
                emissiveIntensity={1.1}
              />
            </mesh>

            {/* Coffee bean center split crease */}
            <mesh position={[0, 0, 0.11]}>
              <boxGeometry args={[0.03, 0.28, 0.02]} />
              <meshStandardMaterial color="#3E2723" roughness={0.9} />
            </mesh>

            {/* Floating interactive indicator */}
            <ProximityHtml radius={2.8} position={[0, 0.35, 0]} center distanceFactor={8}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  collectBean(bean.id);
                }}
                className="bg-moyee-charcoal/95 border border-moyee-yellow px-2.5 py-0.5 rounded-full text-[9px] font-oswald text-moyee-yellow uppercase font-bold tracking-wider cursor-pointer whitespace-nowrap shadow-lg animate-pulse"
              >
                ✨ Collect Golden Bean!
              </div>
            </ProximityHtml>
          </group>
        );
      })}
    </group>
  );
};
