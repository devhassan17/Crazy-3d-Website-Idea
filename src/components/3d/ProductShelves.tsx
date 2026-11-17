import React, { useMemo, useState } from 'react';
import { MOYEE_PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { textureFactory } from '../../utils/textures';
import { useStore } from '../../store/useStore';
import { ProximityHtml } from './ProximityHtml';

interface CoffeeBagMeshProps {
  product: Product;
  position: [number, number, number];
  rotationY: number;
  showBadge?: boolean;
}

const CoffeeBagMesh: React.FC<CoffeeBagMeshProps> = ({
  product,
  position,
  rotationY,
  showBadge = false
}) => {
  // Fine-grained selectors so bags don't re-render when unrelated store state changes
  const openProductDetail = useStore((s) => s.openProductDetail);
  const quickPickProduct = useStore((s) => s.quickPickProduct);
  const [hovered, setHovered] = useState(false);

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
      {/* Realistic Standing Gusseted Foil Coffee Pouch */}
      <mesh
        castShadow
        receiveShadow
        scale={hovered ? [1.06, 1.06, 1.06] : [1, 1, 1]}
        position={[0, 0.45, 0]}
      >
        <boxGeometry args={[0.52, 0.84, 0.32]} />
        <meshPhysicalMaterial
          map={bagTexture}
          roughness={0.32}
          metalness={0.12}
          clearcoat={0.35}
          clearcoatRoughness={0.25}
          emissive={hovered ? product.colorHex : '#000000'}
          emissiveIntensity={hovered ? 0.28 : 0}
        />
      </mesh>

      {/* Top Heat-Sealed Crimp Fold */}
      <mesh position={[0, 0.89, 0]}>
        <boxGeometry args={[0.5, 0.06, 0.08]} />
        <meshStandardMaterial color="#18181B" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Proximity / Hover Interactive Badge (HTML Billboard) */}
      {showBadge && (
        <ProximityHtml radius={2.4} position={[0, 1.25, 0]} center distanceFactor={10}>
          <div className="flex flex-col items-center select-none animate-fadeIn pointer-events-auto">
            <div className="bg-moyee-charcoal/95 border border-moyee-yellow/70 px-3.5 py-1.5 rounded-full shadow-2xl flex items-center space-x-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-moyee-yellow animate-ping" />
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
                className="bg-moyee-yellow hover:bg-moyee-yellow-hover active:scale-90 text-moyee-charcoal text-[10px] font-bold font-oswald uppercase px-2.5 py-1 rounded-lg shadow-md transition-all"
                title="Inspect Details"
              >
                <span>🔍 Details</span>
              </button>
            </div>
          </div>
        </ProximityHtml>
      )}
    </group>
  );
};

export const ProductShelves: React.FC = () => {
  const beanProducts = MOYEE_PRODUCTS.filter((p) => p.category === 'beans');
  const otherProducts = MOYEE_PRODUCTS.filter((p) => p.category !== 'beans');

  return (
    <group name="product-shelves">
      {/* ======================================================== */}
      {/* 1. LEFT WALL: SPECIALTY COFFEE BEANS DISPLAY SHELF       */}
      {/* ======================================================== */}
      <group position={[-11.5, 0, 0]}>
        {/* Architectural Walnut & Brushed Steel Shelving Unit */}
        <mesh position={[-0.4, 2.5, 0]} receiveShadow>
          <boxGeometry args={[0.18, 5.0, 12]} />
          <meshStandardMaterial color="#2D1E17" roughness={0.65} />
        </mesh>
        {/* Black Anodized Steel Upright Frames */}
        {[-6, -3, 0, 3, 6].map((zPos, idx) => (
          <mesh key={`upright-left-${idx}`} position={[0, 2.5, zPos]} castShadow receiveShadow>
            <boxGeometry args={[0.92, 5.0, 0.08]} />
            <meshStandardMaterial color="#18181B" metalness={0.8} roughness={0.28} />
          </mesh>
        ))}
        {/* Horizontal Walnut Tiers with Emissive LED Under-Shelf Strips */}
        {[0.8, 1.8, 2.8, 3.8].map((yPos, idx) => (
          <group key={`tier-left-${idx}`} position={[0, yPos, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.07, 12.2]} />
              <meshStandardMaterial color="#4A3222" roughness={0.42} metalness={0.1} />
            </mesh>
            {/* Warm LED Strip Bar Under Shelf */}
            <mesh position={[0.42, -0.04, 0]}>
              <boxGeometry args={[0.03, 0.015, 11.8]} />
              <meshStandardMaterial color="#FFFBEB" emissive="#F59E0B" emissiveIntensity={2.0} />
            </mesh>
          </group>
        ))}

        {/* Illuminated Shelf Header */}
        <group position={[0, 4.3, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.6, 10]} />
            <meshStandardMaterial color="#111317" metalness={0.6} roughness={0.3} />
          </mesh>
          <ProximityHtml radius={7} position={[0.2, 0, 0]} rotation={[0, Math.PI / 2, 0]} transform center>
            <div className="bg-moyee-charcoal px-4 py-1.5 border border-moyee-yellow/80 rounded-lg font-oswald text-sm font-bold uppercase tracking-widest text-white whitespace-nowrap shadow-xl">
              ☕ SINGLE ESTATE & ORIGIN BEANS • 100% ARABICA
            </div>
          </ProximityHtml>
        </group>

        {/* Place 3D Coffee Bags on the Shelves */}
        {beanProducts.map((product, idx) => {
          const zOffset = 4.0 - idx * 2.0;
          return (
            <React.Fragment key={product.id}>
              <CoffeeBagMesh
                product={product}
                position={[0.2, 1.84, zOffset]}
                rotationY={Math.PI / 2}
                showBadge
              />
              <CoffeeBagMesh
                product={product}
                position={[-0.15, 1.84, zOffset - 0.2]}
                rotationY={Math.PI / 2 + 0.12}
              />
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
        <mesh position={[0.4, 2.5, 0]} receiveShadow>
          <boxGeometry args={[0.18, 5.0, 10]} />
          <meshStandardMaterial color="#2D1E17" roughness={0.65} />
        </mesh>
        {[-5, -2.5, 0, 2.5, 5].map((zPos, idx) => (
          <mesh key={`upright-right-${idx}`} position={[0, 2.5, zPos]} castShadow receiveShadow>
            <boxGeometry args={[0.92, 5.0, 0.08]} />
            <meshStandardMaterial color="#18181B" metalness={0.8} roughness={0.28} />
          </mesh>
        ))}
        {[0.8, 1.8, 2.8, 3.8].map((yPos, idx) => (
          <group key={`tier-right-${idx}`} position={[0, yPos, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.07, 10.2]} />
              <meshStandardMaterial color="#4A3222" roughness={0.42} metalness={0.1} />
            </mesh>
            <mesh position={[-0.42, -0.04, 0]}>
              <boxGeometry args={[0.03, 0.015, 9.8]} />
              <meshStandardMaterial color="#FFFBEB" emissive="#F59E0B" emissiveIntensity={2.0} />
            </mesh>
          </group>
        ))}

        {/* Illuminated Shelf Header */}
        <group position={[0, 4.3, 0]}>
          <mesh>
            <boxGeometry args={[0.3, 0.6, 8]} />
            <meshStandardMaterial color="#111317" metalness={0.6} roughness={0.3} />
          </mesh>
          <ProximityHtml radius={7} position={[-0.2, 0, 0]} rotation={[0, -Math.PI / 2, 0]} transform center>
            <div className="bg-moyee-charcoal px-4 py-1.5 border border-moyee-yellow/80 rounded-lg font-oswald text-sm font-bold uppercase tracking-widest text-white whitespace-nowrap shadow-xl">
              📦 CAPSULES & TASTING BUNDLES • NITRO-SEALED
            </div>
          </ProximityHtml>
        </group>

        {otherProducts.map((product, idx) => {
          const zOffset = 3.5 - idx * 2.0;
          return (
            <React.Fragment key={product.id}>
              <CoffeeBagMesh
                product={product}
                position={[-0.2, 1.84, zOffset]}
                rotationY={-Math.PI / 2}
                showBadge
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
