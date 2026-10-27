import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { playerState } from '../../utils/playerState';

type HtmlProps = React.ComponentProps<typeof Html>;

interface ProximityHtmlProps extends HtmlProps {
  /** Distance (in metres) at which the label appears */
  radius?: number;
}

const tmpVec = new THREE.Vector3();

/**
 * Drop-in replacement for drei's <Html> that is only mounted when the player
 * is within `radius` metres and no modal is open.
 *
 * - Distance is checked every few frames against the mutable playerState
 *   (no store subscription -> no per-frame React renders).
 * - Hysteresis prevents flicker when standing right at the edge.
 * - zIndex is kept below the HUD (z-40) and modals (z-50).
 */
export const ProximityHtml: React.FC<ProximityHtmlProps> = ({
  radius = 5,
  position,
  children,
  zIndexRange,
  ...htmlProps
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [isNear, setIsNear] = useState(false);
  const isNearRef = useRef(false);
  const modalOpen = useStore((s) => s.activeModal !== null);
  // Stagger checks across instances so they don't all run on the same frame
  const frameCounter = useRef(Math.floor(Math.random() * 6));

  useFrame(() => {
    frameCounter.current++;
    if (frameCounter.current % 6 !== 0 || !groupRef.current) return;

    groupRef.current.getWorldPosition(tmpVec);
    const dist = Math.hypot(tmpVec.x - playerState.x, tmpVec.z - playerState.z);
    const next = isNearRef.current ? dist < radius + 0.6 : dist < radius;

    if (next !== isNearRef.current) {
      isNearRef.current = next;
      setIsNear(next);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {isNear && !modalOpen && (
        <Html zIndexRange={zIndexRange ?? [30, 0]} {...htmlProps}>
          <div className="animate-fadeIn">{children}</div>
        </Html>
      )}
    </group>
  );
};
