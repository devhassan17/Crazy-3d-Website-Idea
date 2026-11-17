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

const PITCH_LIMIT = Math.PI / 2.6;
const WALK_SPEED = 6.2;
const RUN_SPEED = 11.5;
const GLIDE_MAX_SPEED = 9.8;
const BASE_FOV = 65;
const SPRINT_FOV = 73;
const PRODUCT_PICK_RADIUS = 3.2;

/** Frame-rate independent smoothing factor */
const damp = (lambda: number, dt: number) => 1 - Math.exp(-lambda * dt);

/** Shortest angular difference between two angles in radians */
const angleDiff = (a: number, b: number) => {
  let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
};

// Collision detection against the store & street layout
const checkCollisions = (newX: number, newZ: number): { x: number; z: number } => {
  let x = newX;
  let z = newZ;

  // 1. Outer World Boundary Limits
  if (z > 14) {
    x = Math.max(-28, Math.min(28, x));
    z = Math.min(31.5, z);
  } else {
    x = Math.max(-11.6, Math.min(11.6, x));
    z = Math.max(-14.8, Math.min(14, z));
  }

  // 2. Front Doorway Barrier (Doors open at X: [-2.4, 2.4], glass curtain wall blocks else at Z: 14)
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
 * GTA V Hybrid 3rd-Person / 1st-Person Player & Vehicle Controller.
 *
 * Features:
 * - Articulated 3D GTA Protagonist Avatar with animated walking/sprinting limbs in 3rd-person view
 * - Seamless [V] camera toggle between 3rd-Person GTA Follow Cam and 1st-Person View
 * - Driveable curbside Pegassi GT Sports Car ([G] to Enter/Exit)
 */
export const PlayerController: React.FC = () => {
  const { camera, gl } = useThree();
  const activeModal = useStore((s) => s.activeModal);
  const setPointerLocked = useStore((s) => s.setPointerLocked);

  const keysPressed = useRef<Record<string, boolean>>({});
  const moveDistanceAccumulator = useRef(0);
  const pitch = useRef(-0.12);
  const targetPitch = useRef(-0.12);
  const velocity = useRef(new THREE.Vector3());
  const walkBobTimer = useRef(0);
  const frameCounter = useRef(0);
  const lastNearbyId = useRef<string | null>(null);

  // 3D Character Avatar limb refs for procedural GTA walk/run cycle
  const avatarGroupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  // Drag-look tracking
  const lookPointerId = useRef<number | null>(null);
  const lastPointerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    camera.position.set(playerState.x, 2.2, playerState.z + 2.6);
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

  // Keyboard controls (including GTA V [V] camera toggle & [G] enter/exit vehicle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current[key] = true;

      const state = useStore.getState();
      if (state.activeModal !== null) return;

      if (key === 'm') state.openModal('store_map');
      else if (key === 'b') state.openModal('cart_drawer');
      else if (key === 'v') state.toggleCameraMode();
      else if (key === 'g' && (state.nearCar || state.isDriving)) state.toggleDriving();
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

    // ========================================================
    // MODE A: DRIVING THE SPORTS CAR ON LOS SANTOS BOULEVARD
    // ========================================================
    if (playerState.isDriving) {
      let throttle = 0;
      let steer = 0;
      if (keys['w'] || keys['arrowup']) throttle += 1;
      if (keys['s'] || keys['arrowdown']) throttle -= 1;
      if (keys['a'] || keys['arrowleft']) steer += 1;
      if (keys['d'] || keys['arrowright']) steer -= 1;

      if (Math.abs(playerState.joyY) > 0.08) throttle -= playerState.joyY;
      if (Math.abs(playerState.joyX) > 0.08) steer -= playerState.joyX;

      const targetCarSpeed = throttle * 18.0;
      playerState.carSpeed += (targetCarSpeed - playerState.carSpeed) * damp(5.5, dt);

      if (Math.abs(playerState.carSpeed) > 0.3) {
        const dirSign = playerState.carSpeed >= 0 ? 1 : -1;
        playerState.carYaw += steer * 1.65 * dirSign * dt;
      }

      playerState.carX += Math.cos(playerState.carYaw) * playerState.carSpeed * dt;
      playerState.carZ -= Math.sin(playerState.carYaw) * playerState.carSpeed * dt;

      // Keep car on the city boulevard roadway
      playerState.carX = Math.max(-34, Math.min(34, playerState.carX));
      playerState.carZ = Math.max(20.4, Math.min(31.0, playerState.carZ));

      playerState.x = playerState.carX;
      playerState.z = playerState.carZ;
      playerState.speed = Math.abs(playerState.carSpeed);

      // Hide on-foot avatar while inside vehicle
      if (avatarGroupRef.current) avatarGroupRef.current.visible = false;

      // GTA V Vehicle Chase Camera behind the car
      const chaseYaw = playerState.carYaw - Math.PI / 2;
      playerState.yaw = chaseYaw;
      playerState.targetYaw = chaseYaw;

      const camDist = 6.2;
      const wantCamX = playerState.carX - Math.cos(playerState.carYaw) * camDist;
      const wantCamZ = playerState.carZ + Math.sin(playerState.carYaw) * camDist;

      camera.position.x += (wantCamX - camera.position.x) * damp(10, dt);
      camera.position.z += (wantCamZ - camera.position.z) * damp(10, dt);
      camera.position.y += (2.45 - camera.position.y) * damp(10, dt);
      camera.lookAt(playerState.carX, 0.9, playerState.carZ);
      return;
    }

    // ========================================================
    // MODE B: ON FOOT (3RD-PERSON GTA AVATAR OR 1ST-PERSON)
    // ========================================================
    const turnRate = (isSprint ? 3.0 : 2.3) * dt;
    if (keys['arrowleft'] || keys['q']) playerState.targetYaw += turnRate;
    if (keys['arrowright'] || keys['e']) playerState.targetYaw -= turnRate;

    const lookSmooth = damp(24, dt);
    playerState.yaw += (playerState.targetYaw - playerState.yaw) * lookSmooth;
    pitch.current += (targetPitch.current - pitch.current) * lookSmooth;

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

    velocity.current.lerp(targetVel, damp(inputLen > 0.04 ? 16 : 12, dt));

    const speed = velocity.current.length();
    playerState.speed = speed;

    if (speed > 0.01) {
      const resolved = checkCollisions(
        playerState.x + velocity.current.x * dt,
        playerState.z + velocity.current.z * dt
      );
      playerState.x = resolved.x;
      playerState.z = resolved.z;

      // Smoothly rotate 3D character toward movement direction
      const desiredCharYaw = Math.atan2(velocity.current.x, velocity.current.z);
      playerState.characterYaw += angleDiff(playerState.characterYaw, desiredCharYaw) * damp(14, dt);

      moveDistanceAccumulator.current += speed * dt;
      if (moveDistanceAccumulator.current > (isSprint ? 2.1 : 1.65)) {
        sounds.playFootstep();
        moveDistanceAccumulator.current = 0;
      }
      walkBobTimer.current += dt * (isSprint ? 14.0 : 9.5);
    } else {
      velocity.current.set(0, 0, 0);
    }

    // ---------- Animate 3D GTA Character Avatar ----------
    const isThirdPerson = playerState.cameraMode === 'third_person';
    if (avatarGroupRef.current) {
      avatarGroupRef.current.visible = isThirdPerson;
      if (isThirdPerson) {
        avatarGroupRef.current.position.set(playerState.x, 0, playerState.z);
        avatarGroupRef.current.rotation.y = playerState.characterYaw;

        const swingAmp = Math.min(speed / RUN_SPEED, 1) * 0.65;
        const phase = walkBobTimer.current;
        const swing = speed > 0.08 ? Math.sin(phase) * swingAmp : 0;

        if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
        if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
        if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.8;
        if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.8;
      }
    }

    // ---------- Camera Placement (3rd-Person GTA Follow vs 1st-Person) ----------
    const speedRatio = Math.min(speed / RUN_SPEED, 1);

    if (isThirdPerson) {
      const inside = playerState.z <= 14;
      const followDist = inside ? 1.55 : 2.65;
      const followHeight = inside ? 1.88 : 2.05;
      // Slight right-shoulder GTA V offset
      const shoulderRight = 0.28;

      const backwardX = Math.sin(playerState.yaw) * followDist + Math.cos(playerState.yaw) * shoulderRight;
      const backwardZ = Math.cos(playerState.yaw) * followDist - Math.sin(playerState.yaw) * shoulderRight;

      let camX = playerState.x + backwardX;
      let camZ = playerState.z + backwardZ;

      // Clamp camera inside store walls when indoors
      if (inside) {
        camX = Math.max(-12.2, Math.min(12.2, camX));
        camZ = Math.max(-15.3, Math.min(13.8, camZ));
      }

      camera.position.set(camX, followHeight - pitch.current * 0.6, camZ);
      euler.set(pitch.current * 0.65, playerState.yaw, 0);
      camera.quaternion.setFromEuler(euler);
    } else {
      camera.position.x = playerState.x;
      camera.position.z = playerState.z;
      const bobAmount = speedRatio * 0.032;
      const targetY = 1.7 + Math.sin(walkBobTimer.current) * bobAmount;
      camera.position.y += (targetY - camera.position.y) * damp(16, dt);

      const rollSway = Math.cos(walkBobTimer.current * 0.5) * speedRatio * 0.0045;
      euler.set(pitch.current, playerState.yaw, rollSway);
      camera.quaternion.setFromEuler(euler);
    }

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

    // Check proximity to driveable sports car outside
    const distCar = Math.hypot(x - playerState.carX, z - playerState.carZ);
    playerState.distToCar = distCar;
    state.setNearCar(z > 14 && distCar < 4.2);

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

  // Render Articulated 3D GTA Protagonist Avatar (Visible in 3rd-Person Mode)
  return (
    <group ref={avatarGroupRef} position={[playerState.x, 0, playerState.z]}>
      {/* Left Leg Pivot at Hip */}
      <group ref={leftLegRef} position={[-0.1, 0.84, 0]}>
        <mesh position={[0, -0.38, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.062, 0.76, 10]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* White Leather Sneaker */}
        <mesh position={[0, -0.78, 0.04]} castShadow>
          <boxGeometry args={[0.13, 0.09, 0.24]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
      </group>

      {/* Right Leg Pivot at Hip */}
      <group ref={rightLegRef} position={[0.1, 0.84, 0]}>
        <mesh position={[0, -0.38, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.062, 0.76, 10]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* White Leather Sneaker */}
        <mesh position={[0, -0.78, 0.04]} castShadow>
          <boxGeometry args={[0.13, 0.09, 0.24]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
      </group>

      {/* Torso — Tailored Leather Bomber Jacket over White Crew Tee */}
      <mesh position={[0, 1.18, 0]} castShadow>
        <boxGeometry args={[0.42, 0.64, 0.24]} />
        <meshPhysicalMaterial color="#18181B" roughness={0.35} clearcoat={0.3} />
      </mesh>
      {/* Inner White Shirt Strip & Gold Chain Detail */}
      <mesh position={[0, 1.2, 0.125]}>
        <boxGeometry args={[0.14, 0.56, 0.01]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
      </mesh>

      {/* Left Arm Pivot at Shoulder */}
      <group ref={leftArmRef} position={[-0.27, 1.44, 0]}>
        <mesh position={[0, -0.26, 0]} castShadow>
          <cylinderGeometry args={[0.058, 0.048, 0.54, 10]} />
          <meshPhysicalMaterial color="#18181B" roughness={0.35} clearcoat={0.3} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#E0AC8B" roughness={0.65} />
        </mesh>
      </group>

      {/* Right Arm Pivot at Shoulder */}
      <group ref={rightArmRef} position={[0.27, 1.44, 0]}>
        <mesh position={[0, -0.26, 0]} castShadow>
          <cylinderGeometry args={[0.058, 0.048, 0.54, 10]} />
          <meshPhysicalMaterial color="#18181B" roughness={0.35} clearcoat={0.3} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#E0AC8B" roughness={0.65} />
        </mesh>
      </group>

      {/* Neck & Head */}
      <mesh position={[0, 1.54, 0]}>
        <cylinderGeometry args={[0.058, 0.068, 0.12, 10]} />
        <meshStandardMaterial color="#E0AC8B" roughness={0.65} />
      </mesh>
      <mesh position={[0, 1.68, 0]} castShadow>
        <sphereGeometry args={[0.145, 16, 16]} />
        <meshStandardMaterial color="#E0AC8B" roughness={0.6} />
      </mesh>
      {/* Styled Hair */}
      <mesh position={[0, 1.75, -0.02]}>
        <sphereGeometry args={[0.148, 14, 14]} />
        <meshStandardMaterial color="#141416" roughness={0.8} />
      </mesh>
      {/* Aviator Sunglasses (Facing +Z in local character space) */}
      <mesh position={[0, 1.7, 0.135]}>
        <boxGeometry args={[0.18, 0.045, 0.03]} />
        <meshPhysicalMaterial color="#090A0F" metalness={0.9} roughness={0.1} clearcoat={1.0} />
      </mesh>
    </group>
  );
};
