import * as THREE from 'three';

// Rotating globe for the Agentic AI page. It is drawn in the coordinate space of the 1600×900
// background image (orthographic camera) so it sits exactly over the globe in that image; a
// cut-out of the image's skyline is layered on top in CSS so the buildings stay in front.
// Returns a cleanup function.
export const GLOBE = { imageW: 1600, imageH: 900, cx: 1110, cy: 495, r: 350 };

export function createScene(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  // 1 world unit = 1 image pixel; y is flipped so image coordinates map directly.
  const camera = new THREE.OrthographicCamera(0, GLOBE.imageW, 0, -GLOBE.imageH, -2000, 2000);
  camera.position.z = 1000;

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(o: T) => { disposables.push(o); return o; };

  const dotCanvas = document.createElement('canvas');
  dotCanvas.width = dotCanvas.height = 64;
  const g = dotCanvas.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.8)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const dot = track(new THREE.CanvasTexture(dotCanvas));
  const sprite = (color: number, size: number, opacity = 1) => {
    const s = new THREE.Sprite(track(new THREE.SpriteMaterial({ map: dot, color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending })));
    s.scale.set(size, size, 1);
    return s;
  };

  const R = GLOBE.r;
  const world = new THREE.Group();
  world.position.set(GLOBE.cx, -GLOBE.cy, 0);
  scene.add(world);
  const globe = new THREE.Group();
  globe.rotation.set(0.3, -1.25, 0.08); // Americas facing the viewer, like the image
  world.add(globe);

  // Ocean: navy body, lighter towards the rim for a lit, 3D look (view direction is +z in ortho).
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R, 96, 96)), track(new THREE.ShaderMaterial({
    vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `varying vec3 vN;
      void main(){
        float rim = pow(1.0 - clamp(vN.z, 0.0, 1.0), 2.2);
        float light = clamp(dot(vN, normalize(vec3(-0.35, 0.55, 0.75))), 0.0, 1.0);
        vec3 col = mix(vec3(0.02, 0.05, 0.15), vec3(0.08, 0.17, 0.40), light * 0.55);
        col = mix(col, vec3(0.10, 0.20, 0.42), rim * 0.35); // soft edge, no bright border
        gl_FragColor = vec4(col, 1.0);
      }`,
  }))));

  const loader = new THREE.TextureLoader();
  // Continents as soft blue-grey shapes
  const landTex = track(loader.load('/textures/earth-land.png'));
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 1.002, 96, 96)),
    track(new THREE.MeshBasicMaterial({ color: 0x5a7bbd, alphaMap: landTex, transparent: true, opacity: 0.42, depthWrite: false }))));
  // City lights (NASA "Earth at night")
  const lightsTex = track(loader.load('/textures/earth-lights.png'));
  lightsTex.colorSpace = THREE.SRGBColorSpace;
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 1.004, 96, 96)),
    track(new THREE.MeshBasicMaterial({ map: lightsTex, color: 0xffd9a0, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }))));

  // Network: glowing hubs linked by arcs, with light pulses travelling along them
  const toVec = (lat: number, lon: number, r = R) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  };
  const hubs: [number, number][] = [
    [40.7, -74], [30.3, -97.7], [37.8, -122.4], [51.5, -0.1], [48.9, 2.4], [52.5, 13.4], [25.2, 55.3],
    [17.4, 78.5], [17.7, 83.2], [19.1, 72.9], [1.35, 103.8], [35.7, 139.7], [-33.9, 151.2], [-23.5, -46.6], [43.7, -79.4], [19.4, -99.1], [4.7, -74.1],
  ];
  const links: [number, number][] = [[0, 3], [1, 7], [2, 11], [3, 6], [6, 7], [7, 10], [8, 12], [4, 9], [0, 13], [14, 5], [10, 11], [1, 0], [9, 6], [3, 8], [2, 1], [15, 16], [16, 13], [1, 15], [14, 0]];
  const arcMat = track(new THREE.LineBasicMaterial({ color: 0x9fd8ff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
  const pulses: { curve: THREE.QuadraticBezierCurve3; s: THREE.Sprite; speed: number; offset: number }[] = [];
  hubs.forEach(([la, lo]) => { const n = sprite(0xcdeeff, 20); n.position.copy(toVec(la, lo, R * 1.01)); globe.add(n); });
  links.forEach(([a, b], i) => {
    const p0 = toVec(...hubs[a], R * 1.01);
    const p2 = toVec(...hubs[b], R * 1.01);
    const lift = R * (1.12 + p0.distanceTo(p2) / (R * 5));
    const curve = new THREE.QuadraticBezierCurve3(p0, p0.clone().add(p2).normalize().multiplyScalar(lift), p2);
    globe.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64))), arcMat));
    const s = sprite(0xffffff, 16);
    globe.add(s);
    pulses.push({ curve, s, speed: 0.1 + (i % 5) * 0.025, offset: Math.random() });
  });

  const resize = () => {
    renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);
  };
  resize();
  window.addEventListener('resize', resize);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = new THREE.Clock();
  let raf = 0;

  const frame = () => {
    const t = clock.getElapsedTime();
    globe.rotation.y = -1.25 + t * 0.06; // keeps turning, west to east
    pulses.forEach(p => p.s.position.copy(p.curve.getPoint((t * p.speed + p.offset) % 1)));
    renderer.render(scene, camera);
  };

  const loop = () => { frame(); raf = requestAnimationFrame(loop); };
  const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVisibility);

  // Reduced motion: draw one still frame (again once the textures have loaded).
  if (reduced) { frame(); window.setTimeout(frame, 1200); } else start();

  return () => {
    stop();
    window.removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', onVisibility);
    disposables.forEach(d => d.dispose());
    renderer.dispose();
  };
}
