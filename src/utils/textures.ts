import * as THREE from 'three';

// Procedural Canvas Texture Generator for Instant, Realistic 3D Visuals
class TextureFactory {
  private cache: Map<string, THREE.CanvasTexture> = new Map();

  // Realistic Wooden Floor (Parquet oak planks)
  public getWoodFloorTexture(): THREE.CanvasTexture {
    if (this.cache.has('wood_floor')) return this.cache.get('wood_floor')!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base wood warm undertone
    ctx.fillStyle = '#C19A6B';
    ctx.fillRect(0, 0, 1024, 1024);

    // Draw wood planks
    const plankHeight = 64;
    const plankWidth = 256;

    for (let y = 0; y < 1024; y += plankHeight) {
      const offsetX = (Math.floor(y / plankHeight) % 2) * (plankWidth / 2);
      for (let x = -offsetX; x < 1024; x += plankWidth) {
        // Individual plank shade variation
        const shade = Math.floor(Math.random() * 25 - 12);
        const r = Math.min(255, Math.max(0, 193 + shade));
        const g = Math.min(255, Math.max(0, 154 + shade));
        const b = Math.min(255, Math.max(0, 107 + shade));
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x + 1, y + 1, plankWidth - 2, plankHeight - 2);

        // Wood grain streaks
        ctx.fillStyle = 'rgba(100, 65, 30, 0.12)';
        for (let i = 0; i < 6; i++) {
          const streakY = y + Math.random() * plankHeight;
          ctx.fillRect(x, streakY, plankWidth, 1.5);
        }

        // Plank border seam
        ctx.strokeStyle = 'rgba(60, 35, 15, 0.4)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, plankWidth, plankHeight);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    this.cache.set('wood_floor', texture);
    return texture;
  }

  // Street Pavement / Cobblestone & Sidewalk
  public getStreetTexture(): THREE.CanvasTexture {
    if (this.cache.has('street_pavement')) return this.cache.get('street_pavement')!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#2A2E35';
    ctx.fillRect(0, 0, 512, 512);

    // Noise specks for realistic asphalt
    for (let i = 0; i < 4000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const gray = Math.floor(Math.random() * 70 + 40);
      ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      ctx.fillRect(x, y, 2, 2);
    }

    // Sidewalk curb tiles
    ctx.strokeStyle = 'rgba(200, 205, 215, 0.15)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y < 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    this.cache.set('street_pavement', texture);
    return texture;
  }

  // Store Front Large Illuminated Sign
  public getNeonSignTexture(): THREE.CanvasTexture {
    if (this.cache.has('neon_sign')) return this.cache.get('neon_sign')!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(0, 0, 1024, 256);

    // Glowing Pink Border
    ctx.strokeStyle = '#E5007D';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 1004, 236);

    // Text: MOYEE COFFEE
    ctx.font = 'bold 84px Oswald, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Outer glow simulation
    ctx.shadowColor = '#E5007D';
    ctx.shadowBlur = 24;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('MOYEE COFFEE', 512, 110);

    // Subtitle: WELCOME TO THE FUTURE OF COFFEE
    ctx.font = 'bold 24px "Roboto Condensed", sans-serif';
    ctx.shadowColor = '#FFD900';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#FFD900';
    ctx.fillText('FAIRCHAIN 50/50 • ROASTED AT ORIGIN', 512, 185);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set('neon_sign', texture);
    return texture;
  }

  // Coffee Bag Product Texture for 3D Shelves
  public getCoffeeBagTexture(
    name: string,
    colorHex: string,
    subtext: string,
    badge?: string
  ): THREE.CanvasTexture {
    const key = `bag_${name}_${colorHex}`;
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d')!;

    // Bag background with smooth matte gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 768);
    grad.addColorStop(0, colorHex);
    grad.addColorStop(0.7, colorHex);
    grad.addColorStop(1, '#1A1A1A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 768);

    // Paper texture effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 800; i++) {
      ctx.fillRect(Math.random() * 512, Math.random() * 768, 2, 2);
    }

    // Top Seal / Zip line
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, 512, 60);

    // Degassing one-way valve circle
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(256, 120, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.arc(256, 120, 8, 0, Math.PI * 2);
    ctx.fill();

    // Brand Header
    ctx.font = 'bold 36px Oswald, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('MOYEE COFFEE', 256, 190);

    // Badge if provided
    if (badge) {
      ctx.fillStyle = '#FFD900';
      ctx.fillRect(106, 220, 300, 38);
      ctx.fillStyle = '#1A1A1A';
      ctx.font = 'bold 20px Oswald, sans-serif';
      ctx.fillText(badge, 256, 245);
    }

    // Product Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 44px Oswald, sans-serif';
    ctx.fillText(name.toUpperCase(), 256, 320);

    // Divider line
    ctx.strokeStyle = '#FFD900';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(80, 360);
    ctx.lineTo(432, 360);
    ctx.stroke();

    // Slogan / Subtext
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '22px "Roboto Condensed", sans-serif';
    ctx.fillText(subtext, 256, 410);

    // FairChain Seal
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Oswald, sans-serif';
    ctx.fillText('FAIRCHAIN • 50/50 VALUE SPLIT', 256, 520);
    ctx.font = '18px "Roboto Condensed", sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('ROASTED AT ORIGIN • NITRO FLUSH', 256, 560);
    ctx.fillText('100% ARABICA SPECIALTY GRADE', 256, 590);

    // Weight icon / Net weight
    ctx.fillStyle = '#FFD900';
    ctx.font = 'bold 28px Oswald, sans-serif';
    ctx.fillText('1000g / 1kg', 256, 680);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  // FairChain Poster Texture for Wall Art
  public getPosterTexture(title: string, subtitle: string, accentColor: string): THREE.CanvasTexture {
    const key = `poster_${title}`;
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 512, 768);

    // Bold accent frame
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, 480, 736);

    // Top logo
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 32px Oswald, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MOYEE COFFEE', 256, 90);

    // Large main title
    ctx.fillStyle = accentColor;
    ctx.font = 'bold 52px Oswald, sans-serif';
    const words = title.split(' ');
    let y = 240;
    for (const w of words) {
      ctx.fillText(w.toUpperCase(), 256, y);
      y += 60;
    }

    // Divider
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(64, y + 20);
    ctx.lineTo(448, y + 20);
    ctx.stroke();

    // Subtitle
    ctx.fillStyle = '#EEECE1';
    ctx.font = '24px "Roboto Condensed", sans-serif';
    ctx.fillText(subtitle, 256, y + 80);

    ctx.fillStyle = '#FFD900';
    ctx.font = 'bold 22px Oswald, sans-serif';
    ctx.fillText('WELCOME TO THE FUTURE OF COFFEE', 256, 690);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set(key, texture);
    return texture;
  }

  // Earth Globe Map Texture for FairChain Impact Room
  public getEarthGlobeTexture(): THREE.CanvasTexture {
    if (this.cache.has('earth_globe')) return this.cache.get('earth_globe')!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Oceans (Deep dark navy blue)
    ctx.fillStyle = '#0B192C';
    ctx.fillRect(0, 0, 1024, 512);

    // Continents silhouette (Forest green / Earth)
    ctx.fillStyle = '#1E5128';

    // Africa continent shape
    ctx.beginPath();
    ctx.ellipse(540, 280, 90, 130, 0, 0, Math.PI * 2);
    ctx.fill();

    // Europe
    ctx.beginPath();
    ctx.ellipse(520, 140, 80, 50, 0, 0, Math.PI * 2);
    ctx.fill();

    // Asia
    ctx.beginPath();
    ctx.ellipse(720, 160, 140, 80, 0, 0, Math.PI * 2);
    ctx.fill();

    // Americas
    ctx.beginPath();
    ctx.ellipse(260, 180, 80, 90, 0, 0, Math.PI * 2);
    ctx.ellipse(320, 350, 60, 100, 0, 0, Math.PI * 2);
    ctx.fill();

    // Highlight Coffee Origins: Ethiopia & Kenya with radiant pulsating pink pins!
    ctx.fillStyle = '#E5007D';
    // Addis Ababa, Ethiopia (~X: 580, Y: 270)
    ctx.beginPath();
    ctx.arc(585, 260, 10, 0, Math.PI * 2);
    ctx.fill();

    // Nairobi, Kenya (~X: 585, Y: 295)
    ctx.fillStyle = '#FFD900';
    ctx.beginPath();
    ctx.arc(585, 290, 9, 0, Math.PI * 2);
    ctx.fill();

    // Amsterdam, Netherlands destination pin (~X: 510, Y: 120)
    ctx.fillStyle = '#00E5FF';
    ctx.beginPath();
    ctx.arc(510, 120, 8, 0, Math.PI * 2);
    ctx.fill();

    // Connecting FairChain trade routes (curves)
    ctx.strokeStyle = '#E5007D';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(585, 260); // Addis Ababa
    ctx.quadraticCurveTo(560, 180, 510, 120); // Amsterdam
    ctx.stroke();

    ctx.strokeStyle = '#FFD900';
    ctx.beginPath();
    ctx.moveTo(585, 290); // Nairobi
    ctx.quadraticCurveTo(550, 200, 510, 120); // Amsterdam
    ctx.stroke();
    ctx.setLineDash([]);

    const texture = new THREE.CanvasTexture(canvas);
    this.cache.set('earth_globe', texture);
    return texture;
  }
}

export const textureFactory = new TextureFactory();
