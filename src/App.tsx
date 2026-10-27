import React from 'react';
import { WorldScene } from './components/3d/WorldScene';
import { HUD } from './components/ui/HUD';
import { MobileControls } from './components/ui/MobileControls';
import { ModalContainer } from './components/ui/ModalContainer';

export const App: React.FC = () => {
  return (
    <main className="w-screen h-screen relative overflow-hidden bg-moyee-charcoal select-none">
      {/* 3D Simulation Canvas */}
      <WorldScene />

      {/* 2D Interactive HUD Overlay */}
      <HUD />

      {/* Touch Joystick & Quick-Pick Store Experience */}
      <MobileControls />

      {/* Popups & Modals */}
      <ModalContainer />
    </main>
  );
};

export default App;
