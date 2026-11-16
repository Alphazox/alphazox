import * as THREE from 'three';

// Marks our Visakhapatnam delivery center on the globe with a small blinking star and a label.
// Both are parented to the globe so they turn with it.

export const VIZAG = { lat: 17.6868, lon: 83.2185 };

type Track = <T extends { dispose: () => void }>(o: T) => T;

// Same mapping as THREE.SphereGeometry's UVs on an equirectangular texture (u = 0 at 180°W).
export const latLonToVec = (lat: number, lon: number, r: number) => {
  const phi = ((lon + 180) * Math.PI) / 180;
  const theta = ((90 - lat) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta));
};

const makeCanvasTexture = (size: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void, track: Track) => {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  draw(canvas.getContext('2d')!, size);
  const tex = track(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

// Soft round glow plus four long and four short light spikes.
const drawStar = (ctx: CanvasRenderingContext2D, s: number) => {
  const c = s / 2;
  const glow = ctx.createRadialGradient(c, c, 0, c, c, c);
  glow.addColorStop(0, 'rgba(255,255,255,1)');
  glow.addColorStop(0.08, 'rgba(255,244,214,0.95)');
  glow.addColorStop(0.22, 'rgba(255,196,92,0.45)');
  glow.addColorStop(0.5, 'rgba(255,170,60,0.12)');
  glow.addColorStop(1, 'rgba(255,170,60,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, s, s);
  ctx.globalCompositeOperation = 'lighter';
  const spike = (angle: number, len: number, width: number) => {
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(angle);
    const g = ctx.createLinearGradient(-len, 0, len, 0);
    g.addColorStop(0, 'rgba(255,230,180,0)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.95)');
    g.addColorStop(1, 'rgba(255,230,180,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-len, 0);
    ctx.lineTo(0, -width);
    ctx.lineTo(len, 0);
    ctx.lineTo(0, width);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };
  spike(0, c * 0.98, s * 0.022);
  spike(Math.PI / 2, c * 0.98, s * 0.022);
  spike(Math.PI / 4, c * 0.5, s * 0.014);
  spike(-Math.PI / 4, c * 0.5, s * 0.014);
};

// Two-line label, redrawn once the site's web fonts have loaded.
const makeLabel = (track: Track) => {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 160;
  const tex = track(new THREE.CanvasTexture(canvas));
  tex.colorSpace = THREE.SRGBColorSpace;
  const draw = () => {
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = 'rgba(4,6,13,0.9)';
    ctx.shadowBlur = 14;
    ctx.fillStyle = '#ffffff';
    ctx.font = "600 54px 'Space Grotesk', 'Inter', sans-serif";
    ctx.fillText('Visakhapatnam', 12, 66);
    ctx.fillStyle = '#ffd68c';
    ctx.font = "500 34px 'Inter', system-ui, sans-serif";
    ctx.fillText('Andhra Pradesh, India', 14, 122);
    tex.needsUpdate = true;
  };
  draw();
  document.fonts?.ready.then(draw).catch(() => {});
  return tex;
};

const STAR_SIZE = 46;

export function addIndiaHighlight(globe: THREE.Object3D, R: number, track: Track) {
  const at = latLonToVec(VIZAG.lat, VIZAG.lon, R * 1.012);

  // Additive glow that adds light without writing alpha (avoids dark fringes on the transparent canvas).
  const starMat = track(new THREE.SpriteMaterial({
    map: makeCanvasTexture(256, drawStar, track),
    transparent: true, depthTest: false, depthWrite: false,
    blending: THREE.CustomBlending, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneFactor,
    blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
  }));
  const star = new THREE.Sprite(starMat);
  star.position.copy(at);
  star.scale.set(STAR_SIZE, STAR_SIZE, 1);
  star.renderOrder = 20;

  const label = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: makeLabel(track), transparent: true, depthTest: false, depthWrite: false })));
  label.center.set(-0.06, 0.35); // to the right of the star and slightly above it, over the Bay of Bengal
  label.position.copy(at);
  label.scale.set(200, 50, 1);
  label.renderOrder = 21;
  globe.add(star, label);

  return {
    // Phones have no room for the label beside the star without covering the hero text.
    setCompact(compact: boolean) {
      label.visible = !compact;
    },
    // Twinkle: mostly bright, with a quick dim-and-flare every couple of seconds.
    update(t: number) {
      const wave = 0.5 + 0.5 * Math.sin(t * 2.8);
      const blink = 0.2 + 0.8 * Math.pow(wave, 0.35);
      starMat.opacity = blink;
      const size = STAR_SIZE * (0.8 + 0.3 * blink);
      star.scale.set(size, size, 1);
    },
  };
}
