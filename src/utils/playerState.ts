// Mutable, non-reactive player & vehicle state for 60fps GTA V gameplay.
// Updated every frame by PlayerController WITHOUT triggering React re-renders.
export const playerState = {
  x: 0,
  z: 23,
  /** Smoothed camera yaw actually applied to the camera */
  yaw: 0,
  /** Target yaw the camera eases towards (UI turn buttons & mouse write here) */
  targetYaw: 0,
  /** Character facing direction in 3rd-person mode */
  characterYaw: Math.PI,
  /** Current movement speed (m/s) for animations & radar */
  speed: 0,
  /** Camera view mode: 'third_person' (GTA V follow cam) or 'first_person' */
  cameraMode: 'third_person' as 'first_person' | 'third_person',
  /** Whether the player is currently driving the curbside sports car */
  isDriving: false,
  /** Sports car world position & heading */
  carX: -8.5,
  carZ: 22.8,
  carYaw: 0,
  carSpeed: 0,
  /** Distance from player to driveable sports car */
  distToCar: 99,
  /** Analog joystick input (-1..1); written by MobileControls on touchmove */
  joyX: 0,
  joyY: 0
};
