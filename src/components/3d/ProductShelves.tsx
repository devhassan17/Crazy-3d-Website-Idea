import React, { useMemo, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MOYEE_PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { textureFactory } from '../../utils/textures';
import { useStore } from '../../store/useStore';
import { sounds } from '../../utils/audio';

interface CoffeeBagMeshProps {
  product: Product;
  position: [number, number, number];
  rotationY: number;
}

const CoffeeBagMesh: React.FC<CoffeeBagMeshProps> = ({ product, position, rotationY }) => {
  const { playerPosition, openProductDetail, quickPickProduct, activeModal } = useStore();
  const [hovered, setHovered] = useState(false);

  // Generate unique procedural bag texture
  const bagTexture = useMemo(
    () =>
      textureFactory.getCoffeeBagTexture(
        product.name,
        product.colorHex,
        product.tagline,
        product.badge
      ),
    [product]
  );

  // Calculate distance from player
  const playerVec = useMemo(() => new THREE.Vector3(...playerPosition), [playerPosition]);
  const bagVec = useMemo(() => new THREE.Vector3(...position), [position]);
  const distance = playerVec.distanceTo(bagVec);
  const isNearby = distance < 3.8;

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    openProductDetail(product);
  };

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* 3D Coffee Bag Geometry */}
      <mesh
        castShadow
        receiveShadow
        scale={hovered ? [1.08, 1.08, 1.08] : [1, 1, 1]}
        position={[0, 0.45, 0]}
      >
        {/* Soft rounded box resembling a standing gusset coffee pouch */}
        <boxGeometry args={[0.55, 0.85, 0.35]} />
        <meshStandardMaterial
          map={bagTexture}
          roughness={0.4}
          metalness={0.1}
          emissive={hovered ? product.colorHex : '#000000'}
          emissiveIntensity={hovered ? 0.35 : 0}
        />
      </mesh>

      {/* Top Fold Seal of Bag */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.52, 0.08, 0.1]} />
        <meshStandardMaterial color={product.colorHex} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Pedestal / Shelf Spotlight Glow */}
      {hovered && (
        <pointLight position={[0, 0.8, 0.5]} color={product.colorHex} intensity={3} distance={2.5} />
      )}

      {/* Proximity / Hover Interactive Badge (HTML Billboard) */}
      {(hovered || isNearby) && activeModal === null && (
        <Html position={[0, 1.25, 0]} center distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center select-none animate-fadeIn pointer-events-auto">
            <div className="bg-moyee-charcoal/95 border-2 border-moyee-pink px-3.5 py-1.5 rounded-full shadow-2xl flex items-center space-x-2 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-moyee-yellow animate-ping" />
              <span className="font-oswald text-xs uppercase tracking-wider text-white font-bold">
                {product.name}
              </span>
              <span className="bg-moyee-pink text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                €{product.price.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center space-x-1.5 mt-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  quickPickProduct(product);
                }}
                className="bg-moyee-pink hover:bg-moyee-pink-hover active:scale-90 text-white text-[10px] font-bold font-oswald uppercase px-2.5 py-1 rounded-lg shadow-md transition-all flex items-center space-x-1"
                title="Quick Pick into Basket"
              >
                <span>🛒 Pick Up</span>
              </button>
              <button
                onClick={handleClick}
                className="bg-moyee-yellow hover:bg-yellow-400 active:scale-90 text-moyee-charcoal text-[10px] font-bold font-oswald uppercase px-2.5 py-1 rounded-lg shadow-md transition-all"
                title="Inspect Details"
              >
                <span>🔍 Details</span>
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

export const ProductShelves: React.FC = () => {
  // Beans Shelves on Left Wall (X: -11.5)
  // Capsules Shelves on Right Wall (X: 11.5)
  const beanProducts = MOYEE_PRODUCTS.filter((p) => p.category === 'beans');
  const otherProducts = MOYEE_PRODUCTS.filter((p) => p.category !== 'beans');

  return (
    <group name="product-shelves">
      {/* ======================================================== */}
      {/* 1. LEFT WALL: SPECIALTY COFFEE BEANS DISPLAY SHELF       */}
      {/* ======================================================== */}
      <group position={[-11.5, 0, 0]}>
        {/* Large Oak Wooden Shelving Unit */}
        {/* Back panel */}
        <mesh position={[-0.4, 2.5, 0]} receiveShadow>
          <boxGeometry args={[0.2, 5.0, 12]} />
          <meshStandardMaterial color="#4E342E" roughness={0.7} />
        </mesh>
        {/* Upright Dividers */}
        {[-6, -3, 0, 3, 6].map((zPos, idx) => (
          <mesh key={`upright-left-${idx}`} position={[0, 2.5, zPos]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 5.0, 0.1]} />
            <meshStandardMaterial color="#3E2723" roughness={0.6} />
          </mesh>
        ))}
        {/* Horizontal Tiers */}
        {[0.8, 1.8, 2.8, 3.8].map((yPos, idx) => (
          <mesh key={`tier-left-${idx}`} position={[0, yPos, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.08, 12.2]} />
            <meshStandardMaterial color="#5D4037" roughness={0.5} />
          </mesh>
        ))}

        {/* LED Strip Glow Under Tiers */}
        <pointLight position={[0.4, 2.7, 0]} color="#FFD900" intensity={4} distance={6} />
        <pointLight position={[0.4, 1.7, 0]} color="#FFD900" intensity={4} distance={6} />

        {/* Illuminated Shelf Header */}
        <group position={[0, 4.3, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.6, 10]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <Html position={[0.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} transform center>
            <div className="bg-moyee-charcoal px-4 py-1.5 border-2 border-moyee-pink rounded-lg font-oswald text-sm font-bold uppercase tracking-widest text-white whitespace-nowrap shadow-xl">
              ☕ SPECIALTY FAIRCHAIN BEANS • 100% ARABICA
            </div>
          </Html>
        </group>

        {/* Place 3D Coffee Bags on the Shelves */}
        {beanProducts.map((product, idx) => {
          const zOffset = 4.0 - idx * 2.0;
          return (
            <React.Fragment key={product.id}>
              {/* Primary front bag */}
              <CoffeeBagMesh
                product={product}
                position={[0.2, 1.84, zOffset]}
                rotationY={Math.PI / 2}
              />
              {/* Duplicate backup bag behind for depth & realistic grocery density */}
              <CoffeeBagMesh
                product={product}
                position={[-0.15, 1.84, zOffset - 0.2]}
                rotationY={Math.PI / 2 + 0.15}
              />
              {/* Lower Tier Replica */}
              <CoffeeBagMesh
                product={product}
                position={[0.2, 0.84, zOffset]}
                rotationY={Math.PI / 2}
              />
            </React.Fragment>
          );
        })}
      </group>

      {/* ======================================================== */}
      {/* 2. RIGHT WALL: CAPSULES & BUNDLES DISPLAY SHELF          */}
      {/* ======================================================== */}
      <group position={[11.5, 0, 0]}>
        {/* Back panel */}
        <mesh position={[0.4, 2.5, 0]} receiveShadow>
          <boxGeometry args={[0.2, 5.0, 10]} />
          <meshStandardMaterial color="#4E342E" roughness={0.7} />
        </mesh>
        {/* Upright Dividers */}
        {[-5, -2.5, 0, 2.5, 5].map((zPos, idx) => (
          <mesh key={`upright-right-${idx}`} position={[0, 2.5, zPos]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 5.0, 0.1]} />
            <meshStandardMaterial color="#3E2723" roughness={0.6} />
          </mesh>
        ))}
        {/* Horizontal Tiers */}
        {[0.8, 1.8, 2.8, 3.8].map((yPos, idx) => (
          <mesh key={`tier-right-${idx}`} position={[0, yPos, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.0, 0.08, 10.2]} />
            <meshStandardMaterial color="#5D4037" roughness={0.5} />
          </mesh>
        ))}

        {/* LED Strip Glow Under Tiers */}
        <pointLight position={[-0.4, 2.7, 0]} color="#E5007D" intensity={4} distance={6} />

        {/* Illuminated Shelf Header */}
        <group position={[0, 4.3, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.6, 8]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <Html position={[-0.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} transform center>
            <div className="bg-moyee-charcoal px-4 py-1.5 border-2 border-moyee-yellow rounded-lg font-oswald text-sm font-bold uppercase tracking-widest text-white whitespace-nowrap shadow-xl">
              📦 CAPSULES & BUNDLES • NITRO-SEALED
            </div>
          </Html>
        </group>

        {/* Place 3D Capsule Boxes & Bundles */}
        {otherProducts.map((product, idx) => {
          const zOffset = 3.5 - idx * 2.0;
          return (
            <React.Fragment key={product.id}>
              <CoffeeBagMesh
                product={product}
                position={[-0.2, 1.84, zOffset]}
                rotationY={-Math.PI / 2}
              />
              <CoffeeBagMesh
                product={product}
                position={[0.15, 1.84, zOffset + 0.2]}
                rotationY={-Math.PI / 2 - 0.1}
              />
              <CoffeeBagMesh
                product={product}
                position={[-0.2, 0.84, zOffset]}
                rotationY={-Math.PI / 2}
              />
            </React.Fragment>
          );
        })}
      </group>
    </group>
  );
};
