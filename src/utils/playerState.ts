// Mutable, non-reactive player state.
// Updated every frame by PlayerController WITHOUT triggering React re-renders.
// Anything that needs per-frame player data (proximity checks, etc.) should read
// from here inside useFrame instead of subscribing to the Zustand store.
export const playerState = {
  x: 0,
  z: 24,
  /** Smoothed camera yaw actually applied to the camera */
  yaw: 0,
  /** Target yaw the camera eases towards (UI turn buttons write here) */
  targetYaw: 0,
  /** Analog joystick input (-1..1); written by MobileControls on touchmove */
  joyX: 0,
  joyY: 0
};
