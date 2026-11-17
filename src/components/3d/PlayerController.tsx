import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { MOYEE_PRODUCTS } from '../../data/products';
import { sounds } from '../../utils/audio';
import { playerState } from '../../utils/playerState';
import { StoreZoneId } from '../../types';

// Re-used objects (zero per-frame allocations / GC stutter)
const UP = new THREE.Vector3(0, 1, 0);
const inputVec = new THREE.Vector3();
const targetVel = new THREE.Vector3();
const euler = new THREE.Euler(0, 0, 0, 'YXZ');

const PITCH_LIMIT = Math.PI / 2.4;
const WALK_SPEED = 6.0;
const RUN_SPEED = 11.2;
const GLIDE_MAX_SPEED = 9.5;
const BASE_FOV = 65;
const SPRINT_FOV = 72;
const PRODUCT_PICK_RADIUS = 3.2;

/** Frame-rate independent smoothing factor */
const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);

// Collision detection against the store & street layout
const checkCollisions = (newX: number, newZ: number): { x: number; z: number } => {
  let x = newX;
  let z = newZ;

  // 1. Outer World Boundary Limits
  if (z > 14) {
    // Exterior city boulevard limits
    x = Math.max(-22, Math.min(22, x));
    z = Math.min(31, z);
  } else {
    // Inside Store limits
    x = Math.max(-11.6, Math.min(11.6, x));
    z = Math.max(-14.8, Math.min(14, z));
  }

  // 2. Front Doorway Barrier (Doors are open at X: [-2.4, 2.4], glass curtain wall blocks else at Z: 14)
  if (Math.abs(z - 14) < 0.38 && Math.abs(x) > 2.35) {
    z = z > 14 ? 14.38 : 13.62;
  }

  // 3. Left Shelf Barrier (X: -11.5, Z: -5.5 to 5.5)
  if (x < -10.2 && z >= -5.5 && z <= 5.5) x = -10.2;

  // 4. Right Shelf Barrier (X: 11.5, Z: -4.5 to 4.5)
  if (x > 10.2 && z >= -4.5 && z <= 4.5) x = 10.2;

  // 5. Tasting Bar Counter Obstacle (X: -6.8 to -2.2, Z: -11.0 to -8.8)
  if (x >= -6.8 && x <= -2.2 && z >= -11.0 && z <= -8.8) {
    z = Math.abs(z + 8.8) < Math.abs(z + 11.0) ? -8.7 : -11.1;
  }

  // 6. Checkout Counter Obstacle (X: 2.2 to 6.8, Z: -11.0 to -8.8)
  if (x >= 2.2 && x <= 6.8 && z >= -11.0 && z <= -8.8) {
    z = Math.abs(z + 8.8) < Math.abs(z + 11.0) ? -8.7 : -11.1;
  }

  // 7. Origin Globe Center Plinth (Circle at 0, -13.5, Radius: 2.1)
  const distToGlobe = Math.hypot(x, z + 13.5);
  if (distToGlobe < 2.1) {
    const angle = Math.atan2(z + 13.5, x);
    x = Math.cos(angle) * 2.15;
    z = -13.5 + Math.sin(angle) * 2.15;
  }

  // 8. Exterior Parked Sports Cars Collision (Left car at [-9.5, 22.8], Right SUV at [10.5, 22.8])
  if (z > 20.8 && z < 24.8) {
    if (x > -12.3 && x < -6.7) {
      z = z < 22.8 ? 20.75 : 24.85;
    }
    if (x > 7.5 && x < 13.5) {
      z = z < 22.8 ? 20.75 : 24.85;
    }
  }

  return { x, z };
};

// Zone lookup based on coordinates
const detectZone = (x: number, z: number): StoreZoneId => {
  if (z > 14) return 'exterior';
  if (z > 10) return 'entrance';
  if (x < -7 && z >= -5 && z <= 5) return 'beans_shelf';
  if (x > 7 && z >= 0 && z <= 5) return 'capsules_shelf';
  if (x > 7 && z < 0 && z >= -5) return 'bundles_shelf';
  if (x < -1 && z < -6 && z > -11) return 'tasting_bar';
  if (x > 1 && z < -6 && z > -11) return 'checkout_counter';
  if (x < -4 && z <= -11) return 'subscription_lounge';
  if (x > 4 && z <= -11) return 'helpdesk';
  if (Math.abs(x) <= 4 && z <= -11) return 'fairchain_gallery';
  if (x < -3 && z > 5 && z <= 10) return 'coffee_quiz';
  if (x > 3 && z > 5 && z <= 10) return 'delivery_desk';
  return 'entrance';
};

/**
 * High-Responsiveness First-Person Controller (GTA V/VI First-Person Feel).
 *
 * PERFORMANCE NOTE: Zero per-frame React state writes. Position & rotation live
 * in mutable `playerState`, with dynamic sprint FOV and natural stride physics.
 */
export const PlayerController: React.FC = () => {
  const { camera, gl } = useThree();
  const activeModal = useStore((s) => s.activeModal);
  const setPointerLocked = useStore((s) => s.setPointerLocked);

  const keysPressed = useRef<Record<string, boolean>>({});
  const moveDistanceAccumulator = useRef(0);
  const pitch = useRef(0);
  const targetPitch = useRef(0);
  const velocity = useRef(new THREE.Vector3());
  const walkBobTimer = useRef(0);
  const frameCounter = useRef(0);
  const lastNearbyId = useRef<string | null>(null);

  // Drag-look tracking
  const lookPointerId = useRef<number | null>(null);
  const lastPointerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    camera.position.set(playerState.x, 1.7, playerState.z);
  }, [camera]);

  // Pointer Lock + Mouse/Touch drag-to-look
  useEffect(() => {
    const dom = gl.domElement;

    const handlePointerLockChange = () => {
      setPointerLocked(document.pointerLockElement === dom);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (activeModal !== null || lookPointerId.current !== null) return;
      lookPointerId.current = e.pointerId;
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (activeModal !== null) return;

      if (document.pointerLockElement === dom) {
        const sensitivity = 0.0022;
        playerState.targetYaw -= e.movementX * sensitivity;
        targetPitch.current -= e.movementY * sensitivity;
      } else if (e.pointerId === lookPointerId.current) {
        const dx = e.clientX - lastPointerPos.current.x;
        const dy = e.clientY - lastPointerPos.current.y;
        lastPointerPos.current = { x: e.clientX, y: e.clientY };

        const sensitivity = e.pointerType === 'touch' ? 0.0055 : 0.0038;
        playerState.targetYaw -= dx * sensitivity;
        targetPitch.current -= dy * sensitivity;
      } else {
        return;
      }
      targetPitch.current = Math.max(-PITCH_LIMIT, Math.min(PITCH_LIMIT, targetPitch.current));
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (e.pointerId === lookPointerId.current) lookPointerId.current = null;
    };

    const handleDoubleClick = () => {
      if (activeModal === null && document.pointerLockElement !== dom) {
        dom.requestPointerLock?.();
      }
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

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

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;

      const state = useStore.getState();
      if (state.activeModal !== null) return;

      if (key === 'm') state.openModal('store_map');
      else if (key === 'b') state.openModal('cart_drawer');
      else if ((key === 'f' || key === 'enter') && state.nearbyProduct) {
        state.quickPickProduct(state.nearbyProduct);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    const handleBlur = () => {
      keysPressed.current = {};
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useFrame((_, rawDelta) => {
    const state = useStore.getState();
    if (state.activeModal !== null) return;

    const dt = Math.min(rawDelta, 0.05);
    const keys = keysPressed.current;

    const isSprint = !!keys['shift'] || state.isSprinting;
    const maxSpeed = isSprint ? RUN_SPEED : WALK_SPEED;

    // ---------- Look (keyboard turning) ----------
    const turnRate = (isSprint ? 3.0 : 2.3) * dt;
    if (keys['arrowleft'] || keys['q']) playerState.targetYaw += turnRate;
    if (keys['arrowright'] || keys['e']) playerState.targetYaw -= turnRate;

    // Crisp camera look smoothing
    const lookSmooth = damp(24, dt);
    playerState.yaw += (playerState.targetYaw - playerState.yaw) * lookSmooth;
    pitch.current += (targetPitch.current - pitch.current) * lookSmooth;

    // ---------- Movement input ----------
    let moveX = 0;
    let moveZ = 0;
    if (keys['w'] || keys['arrowup']) moveZ -= 1;
    if (keys['s'] || keys['arrowdown']) moveZ += 1;
    if (keys['a']) moveX -= 1;
    if (keys['d']) moveX += 1;

    const joyX = playerState.joyX;
    const joyY = playerState.joyY;
    if (Math.abs(joyX) > 0.06 || Math.abs(joyY) > 0.06) {
      moveX += joyX;
      moveZ += joyY;
    }

    inputVec.set(moveX, 0, moveZ);
    const inputLen = Math.min(inputVec.length(), 1);
    const targetPosition = state.targetPosition;

    if (inputLen > 0.04) {
      if (targetPosition) state.setTargetPosition(null);
      inputVec.normalize().applyAxisAngle(UP, playerState.yaw);
      targetVel.copy(inputVec).multiplyScalar(maxSpeed * inputLen);
    } else if (targetPosition) {
      const dx = targetPosition[0] - playerState.x;
      const dz = targetPosition[2] - playerState.z;
      const dist = Math.hypot(dx, dz);
      if (dist > 0.2) {
        const glideSpeed = Math.min(GLIDE_MAX_SPEED, Math.max(3.5, dist * 3.8));
        targetVel.set((dx / dist) * glideSpeed, 0, (dz / dist) * glideSpeed);
      } else {
        targetVel.set(0, 0, 0);
        state.setTargetPosition(null);
      }
    } else {
      targetVel.set(0, 0, 0);
    }

    // Snappy acceleration and clean deceleration
    velocity.current.lerp(targetVel, damp(inputLen > 0.04 ? 16 : 12, dt));

    const speed = velocity.current.length();
    if (speed > 0.01) {
      const resolved = checkCollisions(
        playerState.x + velocity.current.x * dt,
        playerState.z + velocity.current.z * dt
      );
      playerState.x = resolved.x;
      playerState.z = resolved.z;

      moveDistanceAccumulator.current += speed * dt;
      if (moveDistanceAccumulator.current > (isSprint ? 2.1 : 1.65)) {
        sounds.playFootstep();
        moveDistanceAccumulator.current = 0;
      }
      walkBobTimer.current += dt * (isSprint ? 13.5 : 9.2);
    } else {
      velocity.current.set(0, 0, 0);
    }

    // ---------- Direct Camera Tracking (Zero Floaty Lag) ----------
    camera.position.x = playerState.x;
    camera.position.z = playerState.z;

    // Realistic first-person stride bob & subtle shoulder roll
    const speedRatio = Math.min(speed / RUN_SPEED, 1);
    const bobAmount = speedRatio * 0.032;
    const targetY = 1.7 + Math.sin(walkBobTimer.current) * bobAmount;
    camera.position.y += (targetY - camera.position.y) * damp(16, dt);

    const rollSway = Math.cos(walkBobTimer.current * 0.5) * speedRatio * 0.0045;
    euler.set(pitch.current, playerState.yaw, rollSway);
    camera.quaternion.setFromEuler(euler);

    // Dynamic GTA-style Sprint FOV Kick
    if (camera instanceof THREE.PerspectiveCamera) {
      const wantFov = isSprint && speed > WALK_SPEED * 0.8 ? SPRINT_FOV : BASE_FOV;
      if (Math.abs(camera.fov - wantFov) > 0.05) {
        camera.fov += (wantFov - camera.fov) * damp(8, dt);
        camera.updateProjectionMatrix();
      }
    }

    // ---------- Low-frequency world checks (every 8 frames) ----------
    frameCounter.current++;
    if (frameCounter.current % 8 !== 0) return;

    const x = playerState.x;
    const z = playerState.z;
    state.setIsInsideStore(z <= 14);
    state.setCurrentZone(detectZone(x, z));

    // Nearest product for quick-pick
    let closestDist = Infinity;
    let closestProd: (typeof MOYEE_PRODUCTS)[number] | null = null;
    for (const prod of MOYEE_PRODUCTS) {
      const d = Math.hypot(x - prod.shelfLocation.position[0], z - prod.shelfLocation.position[2]);
      if (d < closestDist) {
        closestDist = d;
        closestProd = prod;
      }
    }
    const nearbyId = closestProd && closestDist < PRODUCT_PICK_RADIUS ? closestProd.id : null;
    if (nearbyId !== lastNearbyId.current) {
      lastNearbyId.current = nearbyId;
      state.setNearbyProduct(nearbyId ? closestProd : null);
    }
  });

  return null;
};
