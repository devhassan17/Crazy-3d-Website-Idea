import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { STORE_ZONES } from '../../data/products';
import { sounds } from '../../utils/audio';

export const PlayerController: React.FC = () => {
  const { camera, gl } = useThree();
  const {
    playerPosition,
    setPlayerPosition,
    playerRotationY,
    setPlayerRotationY,
    targetPosition,
    setTargetPosition,
    setCurrentZone,
    setIsInsideStore,
    activeModal,
    openModal,
    isPointerLocked,
    setPointerLocked
  } = useStore();

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const moveDistanceAccumulator = useRef(0);
  const yaw = useRef(playerRotationY);
  const pitch = useRef(0);

  // Sync yaw with playerRotationY from store (e.g. after teleporting)
  useEffect(() => {
    yaw.current = playerRotationY;
  }, [playerRotationY]);

  // Pointer Lock handling for realistic FPS exploration
  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === gl.domElement;
      setPointerLocked(locked);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement === gl.domElement && activeModal === null) {
        const sensitivity = 0.0022;
        yaw.current -= e.movementX * sensitivity;
        pitch.current -= e.movementY * sensitivity;
        pitch.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, pitch.current));
      }
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gl, activeModal, setPointerLocked]);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;

      // Shortcut Keys (only if no modal active)
      if (activeModal === null) {
        if (e.key.toLowerCase() === 'm') {
          openModal('store_map');
        } else if (e.key.toLowerCase() === 'b') {
          openModal('cart_drawer');
        } else if (e.key.toLowerCase() === 'e') {
          // Check closest interactable
          // Default E opens map if nothing else
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activeModal, openModal]);

  // Collision detection checking
  const checkCollisions = (newX: number, newZ: number): { x: number; z: number } => {
    let x = newX;
    let z = newZ;

    // 1. Outer World Boundary Limits
    if (z > 14) {
      // Exterior street limits
      x = Math.max(-18, Math.min(18, x));
      z = Math.min(28, z);
    } else {
      // Inside Store limits
      x = Math.max(-11.6, Math.min(11.6, x));
      z = Math.max(-14.8, Math.min(14, z));
    }

    // 2. Front Doorway Barrier (Doors are open at X: [-2.2, 2.2], but walls block else at Z: 14)
    if (Math.abs(z - 14) < 0.35) {
      if (Math.abs(x) > 2.2) {
        z = z > 14 ? 14.3 : 13.7;
      }
    }

    // 3. Left Shelf Barrier (X: -11.5, Z: -5.5 to 5.5)
    if (x < -10.2 && z >= -5.5 && z <= 5.5) {
      x = -10.2;
    }

    // 4. Right Shelf Barrier (X: 11.5, Z: -4.5 to 4.5)
    if (x > 10.2 && z >= -4.5 && z <= 4.5) {
      x = 10.2;
    }

    // 5. Tasting Bar Counter Obstacle (X: -6.8 to -2.2, Z: -11.0 to -8.8)
    if (x >= -6.8 && x <= -2.2 && z >= -11.0 && z <= -8.8) {
      // Push out to nearest side
      if (Math.abs(z - -8.8) < Math.abs(z - -11.0)) z = -8.7;
      else z = -11.1;
    }

    // 6. Checkout Counter Obstacle (X: 2.2 to 6.8, Z: -11.0 to -8.8)
    if (x >= 2.2 && x <= 6.8 && z >= -11.0 && z <= -8.8) {
      if (Math.abs(z - -8.8) < Math.abs(z - -11.0)) z = -8.7;
      else z = -11.1;
    }

    // 7. FairChain Globe Center Plinth (Circle at 0, -13.5, Radius: 2.1)
    const distToGlobe = Math.hypot(x, z - -13.5);
    if (distToGlobe < 2.1) {
      const angle = Math.atan2(z - -13.5, x);
      x = Math.cos(angle) * 2.15;
      z = -13.5 + Math.sin(angle) * 2.15;
    }

    return { x, z };
  };

  useFrame((_, delta) => {
    // If modal is open, halt WASD walking
    if (activeModal !== null) return;

    let moveX = 0;
    let moveZ = 0;
    const isSprint = keysPressed.current['shift'];
    const speed = (isSprint ? 7.5 : 4.2) * delta;

    // Standard WASD
    if (keysPressed.current['w'] || keysPressed.current['arrowup']) moveZ -= 1;
    if (keysPressed.current['s'] || keysPressed.current['arrowdown']) moveZ += 1;
    if (keysPressed.current['a'] || keysPressed.current['arrowleft']) moveX -= 1;
    if (keysPressed.current['d'] || keysPressed.current['arrowright']) moveX += 1;

    let currX = playerPosition[0];
    let currZ = playerPosition[2];

    // Keyboard-based movement
    if (moveX !== 0 || moveZ !== 0) {
      const moveVec = new THREE.Vector3(moveX, 0, moveZ).normalize();
      moveVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw.current);

      const targetX = currX + moveVec.x * speed;
      const targetZ = currZ + moveVec.z * speed;

      const resolved = checkCollisions(targetX, targetZ);
      currX = resolved.x;
      currZ = resolved.z;

      // Accumulate distance for footstep sound
      moveDistanceAccumulator.current += speed;
      if (moveDistanceAccumulator.current > 1.3) {
        sounds.playFootstep();
        moveDistanceAccumulator.current = 0;
      }

      setPlayerPosition([currX, 1.7, currZ]);
      setPlayerRotationY(yaw.current);
    } else if (targetPosition) {
      // Click-to-move glide navigation
      const dx = targetPosition[0] - currX;
      const dz = targetPosition[2] - currZ;
      const dist = Math.hypot(dx, dz);

      if (dist > 0.2) {
        const step = Math.min(speed, dist);
        const resolved = checkCollisions(currX + (dx / dist) * step, currZ + (dz / dist) * step);
        currX = resolved.x;
        currZ = resolved.z;
        setPlayerPosition([currX, 1.7, currZ]);
      } else {
        setTargetPosition(null);
      }
    }

    // Smooth camera updates
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, currX, 0.25);
    camera.position.y = 1.7;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, currZ, 0.25);

    // Apply rotation to camera
    const euler = new THREE.Euler(pitch.current, yaw.current, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler);

    // Update inside/outside status
    const isInside = currZ <= 14;
    setIsInsideStore(isInside);

    // Dynamic Zone Determination based on coordinates
    let detectedZone: typeof STORE_ZONES[0]['id'] = 'exterior';
    if (!isInside) {
      detectedZone = 'exterior';
    } else if (currZ > 10) {
      detectedZone = 'entrance';
    } else if (currX < -7 && currZ >= -5 && currZ <= 5) {
      detectedZone = 'beans_shelf';
    } else if (currX > 7 && currZ >= 0 && currZ <= 5) {
      detectedZone = 'capsules_shelf';
    } else if (currX > 7 && currZ < 0 && currZ >= -5) {
      detectedZone = 'bundles_shelf';
    } else if (currX < -1 && currZ < -6 && currZ > -11) {
      detectedZone = 'tasting_bar';
    } else if (currX > 1 && currZ < -6 && currZ > -11) {
      detectedZone = 'checkout_counter';
    } else if (currX < -4 && currZ <= -11) {
      detectedZone = 'subscription_lounge';
    } else if (currX > 4 && currZ <= -11) {
      detectedZone = 'helpdesk';
    } else if (Math.abs(currX) <= 4 && currZ <= -11) {
      detectedZone = 'fairchain_gallery';
    } else if (currX < -3 && currZ > 5 && currZ <= 10) {
      detectedZone = 'coffee_quiz';
    } else if (currX > 3 && currZ > 5 && currZ <= 10) {
      detectedZone = 'delivery_desk';
    }

    setCurrentZone(detectedZone);
  });

  return null;
};
