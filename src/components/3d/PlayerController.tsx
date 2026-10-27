import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { STORE_ZONES, MOYEE_PRODUCTS } from '../../data/products';
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
    currentZone,
    setCurrentZone,
    setIsInsideStore,
    activeModal,
    openModal,
    isPointerLocked,
    setPointerLocked,
    mobileJoystickInput,
    isSprinting,
    nearbyProduct,
    setNearbyProduct,
    quickPickProduct,
    showToast
  } = useStore();

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const moveDistanceAccumulator = useRef(0);

  // Smooth camera yaw/pitch damping
  const yaw = useRef(playerRotationY);
  const targetYaw = useRef(playerRotationY);
  const pitch = useRef(0);
  const targetPitch = useRef(0);

  // Smooth velocity physics
  const velocity = useRef(new THREE.Vector3());
  const walkBobTimer = useRef(0);

  const isPointerDown = useRef(false);
  const lastPointerPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  // Sync yaw with playerRotationY from store (e.g. after teleporting or UI turn buttons)
  useEffect(() => {
    if (Math.abs(targetYaw.current - playerRotationY) > 0.05) {
      targetYaw.current = playerRotationY;
      yaw.current = playerRotationY;
    }
  }, [playerRotationY]);

  // Pointer Lock and Mouse/Touch Drag handling for 360° looking left, right, up, down
  useEffect(() => {
    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === gl.domElement;
      setPointerLocked(locked);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (activeModal !== null) return;
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, a, input, select, textarea, [data-interactive="true"]')) {
        return;
      }
      isPointerDown.current = true;
      hasDragged.current = false;
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (activeModal !== null) return;

      if (document.pointerLockElement === gl.domElement) {
        // True FPS pointer lock look
        const sensitivity = 0.0022;
        targetYaw.current -= e.movementX * sensitivity;
        targetPitch.current -= e.movementY * sensitivity;
        targetPitch.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetPitch.current));
      } else if (isPointerDown.current) {
        // Mouse / Touch drag to look left, right, up, down
        const dx = e.clientX - lastPointerPos.current.x;
        const dy = e.clientY - lastPointerPos.current.y;

        if (Math.hypot(dx, dy) > 3) {
          hasDragged.current = true;
        }

        const dragSensitivity = 0.0036;
        targetYaw.current -= dx * dragSensitivity;
        targetPitch.current -= dy * dragSensitivity;
        targetPitch.current = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, targetPitch.current));

        lastPointerPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handlePointerUp = () => {
      isPointerDown.current = false;
    };

    const handleDoubleClick = () => {
      if (activeModal === null && document.pointerLockElement !== gl.domElement) {
        gl.domElement.requestPointerLock?.();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      // Prevent context menu on canvas so right-click drag look is uninterrupted
      e.preventDefault();
    };

    const dom = gl.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);
    dom.addEventListener('dblclick', handleDoubleClick);
    dom.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      dom.removeEventListener('dblclick', handleDoubleClick);
      dom.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
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
          // If near a product, quick pick into basket!
          if (nearbyProduct) {
            quickPickProduct(nearbyProduct);
          }
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
  }, [activeModal, openModal, nearbyProduct, quickPickProduct]);

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
    // If modal is open, halt movement
    if (activeModal !== null) return;

    // Smooth camera damping: lerp from current to target
    yaw.current = THREE.MathUtils.lerp(yaw.current, targetYaw.current, 0.35);
    pitch.current = THREE.MathUtils.lerp(pitch.current, targetPitch.current, 0.35);

    const isSprint = keysPressed.current['shift'] || isSprinting;
    const maxSpeed = isSprint ? 8.6 : 5.4;
    const turnSpeed = (isSprint ? 3.4 : 2.4) * delta;

    // Smooth Keyboard Look Left / Right (ArrowLeft or Q / ArrowRight or E)
    if (keysPressed.current['arrowleft'] || keysPressed.current['q']) {
      targetYaw.current += turnSpeed;
      if (targetPosition) setTargetPosition(null);
    }
    if (keysPressed.current['arrowright'] || keysPressed.current['e']) {
      targetYaw.current -= turnSpeed;
      if (targetPosition) setTargetPosition(null);
    }

    // Smooth Keyboard Tilt Up / Down (PageUp/R / PageDown/F)
    if (keysPressed.current['pageup'] || keysPressed.current['r']) {
      targetPitch.current = Math.min(Math.PI / 2.5, targetPitch.current + turnSpeed * 0.7);
    }
    if (keysPressed.current['pagedown'] || keysPressed.current['f']) {
      targetPitch.current = Math.max(-Math.PI / 2.5, targetPitch.current - turnSpeed * 0.7);
    }

    useStore.setState({ playerRotationY: yaw.current });

    let moveX = 0;
    let moveZ = 0;

    // 1. WASD & ArrowUp/ArrowDown Movement
    if (keysPressed.current['w'] || keysPressed.current['arrowup']) moveZ -= 1;
    if (keysPressed.current['s'] || keysPressed.current['arrowdown']) moveZ += 1;
    if (keysPressed.current['a']) moveX -= 1; // Strafe Left
    if (keysPressed.current['d']) moveX += 1; // Strafe Right

    // 2. Mobile Touch Virtual Joystick Input
    const joy = mobileJoystickInput;
    if (Math.abs(joy.x) > 0.05 || Math.abs(joy.y) > 0.05) {
      moveX += joy.x;
      moveZ += joy.y;
    }

    let currX = playerPosition[0];
    let currZ = playerPosition[2];

    const inputVec = new THREE.Vector3(moveX, 0, moveZ);
    const hasInput = inputVec.lengthSq() > 0.005;

    if (hasInput) {
      if (targetPosition) setTargetPosition(null);

      // Normalize and orient relative to camera yaw
      inputVec.normalize();
      inputVec.applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw.current);

      const targetVel = inputVec.multiplyScalar(maxSpeed);
      // Smooth acceleration damping
      velocity.current.lerp(targetVel, 0.28);
    } else if (targetPosition) {
      // Click-to-move glide navigation
      const dx = targetPosition[0] - currX;
      const dz = targetPosition[2] - currZ;
      const dist = Math.hypot(dx, dz);

      if (dist > 0.25) {
        const dir = new THREE.Vector3(dx / dist, 0, dz / dist);
        const glideSpeed = Math.min(maxSpeed, dist * 3.5);
        velocity.current.lerp(dir.multiplyScalar(glideSpeed), 0.25);
      } else {
        velocity.current.set(0, 0, 0);
        setTargetPosition(null);
      }
    } else {
      // Smooth deceleration damping
      velocity.current.lerp(new THREE.Vector3(0, 0, 0), 0.3);
    }

    // Apply smooth velocity to position
    if (velocity.current.lengthSq() > 0.001) {
      const stepX = currX + velocity.current.x * delta;
      const stepZ = currZ + velocity.current.z * delta;

      const resolved = checkCollisions(stepX, stepZ);
      currX = resolved.x;
      currZ = resolved.z;

      // Accumulate distance for footstep sound
      moveDistanceAccumulator.current += velocity.current.length() * delta;
      if (moveDistanceAccumulator.current > 1.35) {
        sounds.playFootstep();
        moveDistanceAccumulator.current = 0;
      }

      setPlayerPosition([currX, 1.7, currZ]);

      // Realistic Subtle Head Bobbing when walking
      walkBobTimer.current += delta * (isSprint ? 13 : 9);
      const bobOffset = Math.sin(walkBobTimer.current) * 0.025;
      camera.position.y = 1.7 + bobOffset;
    } else {
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.7, 0.1);
    }

    // Smooth camera updates
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, currX, 0.35);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, currZ, 0.35);

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

    if (detectedZone !== currentZone) {
      setCurrentZone(detectedZone);
      const zoneObj = STORE_ZONES.find((z) => z.id === detectedZone);
      if (zoneObj && detectedZone !== 'exterior') {
        showToast(`📍 ${zoneObj.title} • ${zoneObj.subtitle}`);
      }
    }

    // Dynamic Product Proximity Detection for Quick Pick
    let closestDist = 999;
    let closestProd: typeof MOYEE_PRODUCTS[0] | null = null;

    for (const prod of MOYEE_PRODUCTS) {
      const dist = Math.hypot(currX - prod.shelfLocation.position[0], currZ - prod.shelfLocation.position[2]);
      if (dist < closestDist) {
        closestDist = dist;
        closestProd = prod;
      }
    }

    if (closestDist < 3.8 && closestProd) {
      if (nearbyProduct?.id !== closestProd.id) {
        setNearbyProduct(closestProd);
      }
    } else if (closestDist >= 3.8 && nearbyProduct !== null) {
      setNearbyProduct(null);
    }
  });

  return null;
};
