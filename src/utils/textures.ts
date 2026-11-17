import * as THREE from 'three';

// Procedural High-Definition PBR Texture Generator for Realistic GTA-Style 3D Graphics
class TextureFactory {
  private cache: Map<string, THREE.CanvasTexture> = new Map();

  // Realistic Architectural Hardwood Floor (Warm Walnut & Natural Oak Planks)
  public getWoodFloorTexture(): THREE.CanvasTexture {
    if (this.cache.has('wood_floor')) return this.cache.get('wood_floor')!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Base rich walnut-oak undertone
    ctx.fillStyle = '#8C6239';
    ctx.fillRect(0, 0, 1024, 1024);

    const plankHeight = 64;
    const plankWidth = 256;

    for (let y = 0; y < 1024; y += plankHeight) {
      const row = Math.floor(y / plankHeight);
      const offsetX = (row % 3) * 85;
      for (let x = -offsetX; x < 1024; x += plankWidth) {
        // Subtle natural timber tone variation per plank
        const shade = Math.floor(Math.random() * 22 - 11);
        const r = Math.min(255, Math.max(0, 148 + shade));
        const g = Math.min(255, Math.max(0, 104 + shade));
        const b = Math.min(255, Math.max(0, 66 + shade));

        const grad = ctx.createLinearGradient(x, y, x + plankWidth, y + plankHeight);
        grad.addColorStop(0, `rgb(${r}, ${g}, ${b})`);
        grad.addColorStop(0.5, `rgb(${r + 6}, ${g + 4}, ${b + 2})`);
        grad.addColorStop(1, `rgb(${r - 5}, ${g - 4}, ${b - 3})`);
        ctx.fillStyle = grad;
        ctx.fillRect(x + 1, y + 1, plankWidth - 2, plankHeight - 2);

        // Organic wood grain fibers
        ctx.fillStyle = 'rgba(55, 32, 14, 0.14)';
        for (let i = 0; i < 12; i++) {
          const streakY = y + 3 + Math.random() * (plankHeight - 6);
          const streakH = 0.8 + Math.random() * 1.4;
          ctx.fillRect(x + 2, streakY, plankWidth - 4, streakH);
        }

        // Occasional wood knot
        if (Math.random() < 0.25) {
          const kx = x + 30 + Math.random() * (plankWidth - 60);
          const ky = y + 14 + Math.random() * (plankHeight - 28);
          ctx.fillStyle = 'rgba(50, 28, 10, 0.28)';
          ctx.beginPath();
          ctx.ellipse(kx, ky, 8, 4, 0, 0, Math.PI * 2);
          ctx.fill();
        }

        // Beveled plank seam
        ctx.strokeStyle = 'rgba(30, 16, 6, 0.55)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, plankWidth, plankHeight);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set('wood_floor', texture);
    return texture;
  }

  // Wood Floor Bump / Roughness Map for Specular Depth
  public getWoodBumpTexture(): THREE.CanvasTexture {
    if (this.cache.has('wood_bump')) return this.cache.get('wood_bump')!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#888888';
    ctx.fillRect(0, 0, 512, 512);

    const plankHeight = 32;
    const plankWidth = 128;
    for (let y = 0; y < 512; y += plankHeight) {
      const offsetX = (Math.floor(y / plankHeight) % 3) * 42;
      for (let x = -offsetX; x < 512; x += plankWidth) {
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, plankWidth, plankHeight);

        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        for (let i = 0; i < 6; i++) {
          ctx.fillRect(x, y + Math.random() * plankHeight, plankWidth, 1);
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    this.cache.set('wood_bump', texture);
    return texture;
  }

  // GTA-Style Urban Asphalt Street & Concrete Sidewalk Texture
  public getStreetTexture(): THREE.CanvasTexture {
    if (this.cache.has('street_pavement')) return this.cache.get('street_pavement')!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Rich dark wet-look asphalt base
    ctx.fillStyle = '#1E2126';
    ctx.fillRect(0, 0, 1024, 1024);

    // Asphalt mineral aggregate micro-variation
    for (let i = 0; i < 12000; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const v = Math.floor(Math.random() * 48 + 20);
      ctx.fillStyle = `rgb(${v}, ${v + 2}, ${v + 5})`;
      ctx.fillRect(x, y, 2, 2);
    }

    // Subtle tire wear tracks along the roadway
    const trackGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    trackGrad.addColorStop(0, 'rgba(0,0,0,0)');
    trackGrad.addColorStop(0.35, 'rgba(10,12,15,0.35)');
    trackGrad.addColorStop(0.5, 'rgba(45,50,58,0.12)');
    trackGrad.addColorStop(0.65, 'rgba(10,12,15,0.35)');
    trackGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = trackGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle tar crack lines
    ctx.strokeStyle = 'rgba(10, 11, 14, 0.5)';
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 14; i++) {
      ctx.beginPath();
      let cx = Math.random() * 1024;
      let cy = Math.random() * 1024;
      ctx.moveTo(cx, cy);
      for (let s = 0; s < 5; s++) {
        cx += (Math.random() - 0.5) * 60;
        cy += (Math.random() - 0.5) * 60;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 3);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set('street_pavement', texture);
    return texture;
  }

  // Architectural Concrete Sidewalk Pavers Texture
  public getSidewalkTexture(): THREE.CanvasTexture {
    if (this.cache.has('sidewalk_pavers')) return this.cache.get('sidewalk_pavers')!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#525760';
    ctx.fillRect(0, 0, 512, 512);

    // Paver tile grid
    const tile = 128;
    for (let y = 0; y < 512; y += tile) {
      for (let x = 0; x < 512; x += tile) {
        const delta = Math.floor(Math.random() * 12 - 6);
        const c = 82 + delta;
        ctx.fillStyle = `rgb(${c}, ${c + 4}, ${c + 10})`;
        ctx.fillRect(x + 2, y + 2, tile - 4, tile - 4);

        ctx.strokeStyle = 'rgba(25, 28, 34, 0.6)';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, tile, tile);
      }
    }

    // Fine stone grain
    for (let i = 0; i < 3000; i++) {
      const g = Math.floor(Math.random() * 40 + 65);
      ctx.fillStyle = `rgba(${g}, ${g}, ${g}, 0.25)`;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 2);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set('sidewalk_pavers', texture);
    return texture;
  }

  // Architectural Exposed Brick & Plaster Wall Texture
  public getBrickWallTexture(): THREE.CanvasTexture {
    if (this.cache.has('brick_wall')) return this.cache.get('brick_wall')!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Mortar base
    ctx.fillStyle = '#2B2927';
    ctx.fillRect(0, 0, 512, 512);

    const bh = 32;
    const bw = 64;
    for (let y = 0; y < 512; y += bh) {
      const offset = (Math.floor(y / bh) % 2) * (bw / 2);
      for (let x = -offset; x < 512; x += bw) {
        const v = Math.floor(Math.random() * 20 - 10);
        const r = Math.min(255, Math.max(0, 62 + v));
        const g = Math.min(255, Math.max(0, 56 + v));
        const b = Math.min(255, Math.max(0, 52 + v));
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x + 2, y + 2, bw - 4, bh - 4);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 3);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set('brick_wall', texture);
    return texture;
  }

  // Polished Italian Carrara Marble Texture
  public getMarbleTexture(dark = false): THREE.CanvasTexture {
    const key = dark ? 'marble_dark' : 'marble_light';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = dark ? '#1C1E22' : '#F3F2EE';
    ctx.fillRect(0, 0, 512, 512);

    // Organic marble veins
    ctx.strokeStyle = dark ? 'rgba(212, 175, 55, 0.22)' : 'rgba(120, 125, 135, 0.22)';
    for (let i = 0; i < 18; i++) {
      ctx.lineWidth = 0.8 + Math.random() * 2.2;
      ctx.beginPath();
      let vx = Math.random() * 512;
      let vy = 0;
      ctx.moveTo(vx, vy);
      while (vy < 512) {
        vx += (Math.random() - 0.48) * 45;
        vy += 25 + Math.random() * 35;
        ctx.lineTo(vx, vy);
      }
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 1);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set(key, texture);
    return texture;
  }

  // Surrounding GTA-Style Urban Building Facade (Windows & Architectural Grid)
  public getCityBuildingTexture(isNight: boolean, tintHex = '#2A2F37'): THREE.CanvasTexture {
    const key = `city_facade_${isNight ? 'night' : 'day'}_${tintHex}`;
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Building concrete/stone cladding
    ctx.fillStyle = tintHex;
    ctx.fillRect(0, 0, 512, 512);

    // Horizontal floor spandrel bands
    const cols = 4;
    const rows = 6;
    const padX = 20;
    const padY = 18;
    const winW = (512 - padX * (cols + 1)) / cols;
    const winH = (512 - padY * (rows + 1)) / rows;

    for (let r = 0; r < rows; r++) {
      // Floor ledge
      ctx.fillStyle = 'rgba(15, 18, 24, 0.65)';
      ctx.fillRect(0, r * (winH + padY), 512, 6);

      for (let c = 0; c < cols; c++) {
        const wx = padX + c * (winW + padX);
        const wy = padY + r * (winH + padY);

        // Deterministic pseudo-random per window
        const seed = (r * 17 + c * 31) % 10;
        const isLit = isNight ? seed < 6 : seed < 2;

        if (isLit) {
          const grad = ctx.createLinearGradient(wx, wy, wx, wy + winH);
          grad.addColorStop(0, '#FFF3D1');
          grad.addColorStop(1, '#F5B041');
          ctx.fillStyle = grad;
        } else {
          const skyReflect = ctx.createLinearGradient(wx, wy, wx + winW, wy + winH);
          skyReflect.addColorStop(0, isNight ? '#0F172A' : '#384B60');
          skyReflect.addColorStop(0.5, isNight ? '#1E293B' : '#526D88');
          skyReflect.addColorStop(1, isNight ? '#090D16' : '#243242');
          ctx.fillStyle = skyReflect;
        }

        ctx.fillRect(wx, wy, winW, winH);

        // Window mullion frame
        ctx.strokeStyle = '#111318';
        ctx.lineWidth = 3;
        ctx.strokeRect(wx, wy, winW, winH);

        // Vertical center transom bar
        ctx.beginPath();
        ctx.moveTo(wx + winW / 2, wy);
        ctx.lineTo(wx + winW / 2, wy + winH);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set(key, texture);
    return texture;
  }

  // Flagship Storefront Architectural Backlit Signage (Brushed Brass & Warm Halo Glow)
  public getNeonSignTexture(): THREE.CanvasTexture {
    if (this.cache.has('neon_sign')) return this.cache.get('neon_sign')!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    // Deep architectural matte obsidian fascia
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 256);
    bgGrad.addColorStop(0, '#0F1115');
    bgGrad.addColorStop(0.5, '#181B22');
    bgGrad.addColorStop(1, '#0F1115');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 256);

    // Brushed Architectural Brass Double Frame
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(14, 14, 996, 228);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(22, 22, 980, 212);

    // Main Channel Letters: ORIGIN ROASTERY
    ctx.font = 'bold 78px Oswald, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Warm tungsten architectural backlight halo
    ctx.shadowColor = '#F59E0B';
    ctx.shadowBlur = 22;
    ctx.fillStyle = '#FFFBEB';
    ctx.fillText('ORIGIN ROASTERY', 512, 105);

    // Subtitle: SPECIALTY COFFEE HOUSE • DIRECT FARM TO CUP
    ctx.font = 'bold 22px "Roboto Condensed", sans-serif';
    ctx.shadowColor = '#D97706';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#FBBF24';
    ctx.fillText('SPECIALTY COFFEE HOUSE  •  DIRECT ORIGIN ROASTERS', 512, 182);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set('neon_sign', texture);
    return texture;
  }

  // Realistic Specialty Coffee Bag Texture for 3D Shelves
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

    // Matte craft pouch body with realistic side gusset shading
    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, '#121316');
    grad.addColorStop(0.12, '#1E2026');
    grad.addColorStop(0.5, '#252830');
    grad.addColorStop(0.88, '#1E2026');
    grad.addColorStop(1, '#121316');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 768);

    // Top heat-seal crimp ridges
    ctx.fillStyle = '#0D0E11';
    ctx.fillRect(0, 0, 512, 54);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    for (let y = 10; y < 48; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // One-way brass degassing valve
    ctx.fillStyle = 'rgba(212, 175, 55, 0.35)';
    ctx.beginPath();
    ctx.arc(256, 105, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#111111';
    ctx.beginPath();
    ctx.arc(256, 105, 7, 0, Math.PI * 2);
    ctx.fill();

    // Inset Artisan Label Card on Pouch
    ctx.fillStyle = '#FBF9F5';
    ctx.fillRect(46, 148, 420, 520);

    // Color Accent Band at top of label
    ctx.fillStyle = colorHex;
    ctx.fillRect(46, 148, 420, 86);

    // Brand Crest on Accent Band
    ctx.font = 'bold 28px Oswald, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('ORIGIN ROASTERY', 256, 198);

    // Badge Ribbon
    if (badge) {
      ctx.fillStyle = '#18181B';
      ctx.fillRect(116, 218, 280, 34);
      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 18px Oswald, sans-serif';
      ctx.fillText(badge, 256, 240);
    }

    // Product Title on Cream Label
    ctx.fillStyle = '#18181B';
    ctx.font = 'bold 38px Oswald, sans-serif';
    ctx.fillText(name.toUpperCase(), 256, 320);

    // Fine Copper Divider Line
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(96, 355);
    ctx.lineTo(416, 355);
    ctx.stroke();

    // Tasting Subtext
    ctx.fillStyle = '#4B5563';
    ctx.font = '20px "Roboto Condensed", sans-serif';
    ctx.fillText(subtext.slice(0, 42), 256, 400);

    // Origin & Roast Specs Box
    ctx.strokeStyle = '#D1D5DB';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(76, 440, 360, 140);

    ctx.fillStyle = '#111827';
    ctx.font = 'bold 20px Oswald, sans-serif';
    ctx.fillText('SINGLE ESTATE • 50/50 VALUE SHARE', 256, 478);
    ctx.font = '17px "Roboto Condensed", sans-serif';
    ctx.fillStyle = '#374151';
    ctx.fillText('ROASTED AT ORIGIN • NITROGEN SEALED', 256, 515);
    ctx.fillText('100% HIGH-ALTITUDE ARABICA', 256, 548);

    // Net Weight Footer
    ctx.fillStyle = '#18181B';
    ctx.font = 'bold 24px Oswald, sans-serif';
    ctx.fillText('NET WT. 1000g / 2.2 LBS', 256, 635);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set(key, texture);
    return texture;
  }

  // Architectural Framed Art Poster Texture
  public getPosterTexture(title: string, subtitle: string, accentColor: string): THREE.CanvasTexture {
    const key = `poster_${title}`;
    if (this.cache.has(key)) return this.cache.get(key)!;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 768;
    const ctx = canvas.getContext('2d')!;

    // Warm gallery matte background
    ctx.fillStyle = '#141619';
    ctx.fillRect(0, 0, 512, 768);

    // Brushed Brass Gallery Frame
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 472, 728);

    // Subtle inner mat border
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(34, 34, 444, 700);

    // Top Header
    ctx.fillStyle = '#A1A1AA';
    ctx.font = 'bold 22px Oswald, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ORIGIN COFFEE ROASTERS', 256, 95);

    // Main Typography
    ctx.fillStyle = '#FAFAFA';
    ctx.font = 'bold 48px Oswald, sans-serif';
    const words = title.split(' ');
    let y = 230;
    for (const w of words) {
      ctx.fillText(w.toUpperCase(), 256, y);
      y += 58;
    }

    // Accent bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(176, y + 10, 160, 4);

    // Subtitle
    ctx.fillStyle = '#D4D4D8';
    ctx.font = '22px "Roboto Condensed", sans-serif';
    ctx.fillText(subtitle, 256, y + 70);

    ctx.fillStyle = accentColor;
    ctx.font = 'bold 20px Oswald, sans-serif';
    ctx.fillText('CRAFTED AT HIGH ALTITUDE • EST. AMSTERDAM', 256, 680);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set(key, texture);
    return texture;
  }

  // Earth Globe Map Texture for Origin Impact Room
  public getEarthGlobeTexture(): THREE.CanvasTexture {
    if (this.cache.has('earth_globe')) return this.cache.get('earth_globe')!;

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Deep bathymetric ocean gradient
    const oceanGrad = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGrad.addColorStop(0, '#07111E');
    oceanGrad.addColorStop(0.5, '#0D2137');
    oceanGrad.addColorStop(1, '#07111E');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 0, 1024, 512);

    // Latitude / Longitude subtle graticule grid
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y < 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Continents silhouette (Natural satellite terrain green/ochre)
    ctx.fillStyle = '#244D32';

    // Africa
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

    // Highlight Coffee Origins: Ethiopia & Kenya with warm gold pins
    ctx.fillStyle = '#F59E0B';
    ctx.beginPath();
    ctx.arc(585, 260, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FBBF24';
    ctx.beginPath();
    ctx.arc(585, 290, 9, 0, Math.PI * 2);
    ctx.fill();

    // Amsterdam destination pin
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(510, 120, 8, 0, Math.PI * 2);
    ctx.fill();

    // Trade routes
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.setLineDash([6, 4]);
    ctx.beginPath();
    ctx.moveTo(585, 260);
    ctx.quadraticCurveTo(560, 180, 510, 120);
    ctx.stroke();

    ctx.strokeStyle = '#FBBF24';
    ctx.beginPath();
    ctx.moveTo(585, 290);
    ctx.quadraticCurveTo(550, 200, 510, 120);
    ctx.stroke();
    ctx.setLineDash([]);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.set('earth_globe', texture);
    return texture;
  }
}

export const textureFactory = new TextureFactory();
