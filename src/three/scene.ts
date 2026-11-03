import * as THREE from 'three';

// Animated 3D backdrop for the Agentic AI page: a slowly turning Earth (NASA city-lights texture)
// wrapped in a glowing atmosphere, with network arcs, travelling light pulses, orbit rings and a
// starfield. It sits in the night sky above a real skyline photo (layered in CSS).
// Returns a cleanup function.
export function createScene(canvas: HTMLCanvasElement): () => void {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
  camera.position.set(0, 0, 30);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(o: T) => { disposables.push(o); return o; };

  // Soft round sprite for stars, nodes and pulses (renders as a glowing dot on every GPU).
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

  // ── Starfield ──
  const starCount = 1400;
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) starPos.set([(Math.random() - 0.5) * 220, (Math.random() - 0.3) * 120, -60 - Math.random() * 60], i * 3);
  const starGeo = track(new THREE.BufferGeometry());
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = track(new THREE.PointsMaterial({ color: 0xcfe0ff, size: 0.45, map: dot, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(new THREE.Points(starGeo, starMat));

  // ── Globe ──
  const R = 7;
  const world = new THREE.Group(); // positioned/scaled for the viewport
  const globe = new THREE.Group(); // turns
  world.add(globe);
  scene.add(world);

  // Deep-blue ocean body
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R, 64, 64)),
    track(new THREE.MeshBasicMaterial({ color: 0x0a1f52 }))));

  // City lights (NASA "Earth at night" imagery), added on top so dark areas stay blue
  const lightsTex = track(new THREE.TextureLoader().load('/textures/earth-lights.png'));
  lightsTex.colorSpace = THREE.SRGBColorSpace;
  const lightsMat = track(new THREE.MeshBasicMaterial({ map: lightsTex, color: 0xffe2a8, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 1.002, 64, 64)), lightsMat));

  // Latitude / longitude grid
  const gridMat = track(new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.16 }));
  const grid = new THREE.LineSegments(track(new THREE.WireframeGeometry(track(new THREE.SphereGeometry(R * 1.006, 24, 16)))), gridMat);
  globe.add(grid);

  // Atmosphere: fresnel glow around the rim
  const atmoMat = track(new THREE.ShaderMaterial({
    uniforms: { color: { value: new THREE.Color(0x4f9cff) } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 color; varying vec3 vN; varying vec3 vV;
      void main(){ float f = pow(1.0 - abs(dot(vN, vV)), 2.6); gl_FragColor = vec4(color, f * 0.95); }`,
    transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false,
  }));
  world.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 1.18, 64, 64)), atmoMat));
  const halo = sprite(0x3b82f6, R * 4.2, 0.35);
  world.add(halo);

  // Network: arcs between points on the surface, with glowing nodes and travelling pulses
  const toVec = (lat: number, lon: number, r = R) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  };
  // Major business hubs (lat, lon)
  const hubs: [number, number][] = [
    [40.7, -74], [30.3, -97.7], [37.8, -122.4], [51.5, -0.1], [48.9, 2.4], [52.5, 13.4], [25.2, 55.3],
    [17.4, 78.5], [17.7, 83.2], [19.1, 72.9], [1.35, 103.8], [35.7, 139.7], [-33.9, 151.2], [-23.5, -46.6], [43.7, -79.4],
  ];
  const links: [number, number][] = [[0, 3], [1, 7], [2, 11], [3, 6], [6, 7], [7, 10], [8, 12], [4, 9], [0, 13], [14, 5], [10, 11], [1, 0], [9, 6], [3, 8], [2, 1]];
  const arcMat = track(new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  const pulses: { curve: THREE.QuadraticBezierCurve3; s: THREE.Sprite; speed: number; offset: number }[] = [];
  hubs.forEach(([la, lo]) => { const n = sprite(0xa5f3fc, 0.9); n.position.copy(toVec(la, lo, R * 1.01)); globe.add(n); });
  links.forEach(([a, b], i) => {
    const p0 = toVec(...hubs[a], R * 1.01);
    const p2 = toVec(...hubs[b], R * 1.01);
    const mid = p0.clone().add(p2).multiplyScalar(0.5);
    const lift = R * (1.25 + p0.distanceTo(p2) / (R * 3.2));
    const curve = new THREE.QuadraticBezierCurve3(p0, mid.normalize().multiplyScalar(lift), p2);
    globe.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(64))), arcMat));
    const s = sprite(0xffffff, 0.75);
    globe.add(s);
    pulses.push({ curve, s, speed: 0.12 + (i % 5) * 0.03, offset: Math.random() });
  });

  // Large orbit rings sweeping around the globe (like satellite paths), each with a pulse
  const orbits = ([[R * 1.55, 1.2, 0.3, 0.18], [R * 1.85, 1.45, -0.55, -0.12], [R * 2.15, 1.05, 0.9, 0.09]] as const).map(([r, rx, rz, speed]) => {
    const group = new THREE.Group();
    group.rotation.set(rx, 0, rz);
    const ringMat = track(new THREE.LineBasicMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.32, blending: THREE.AdditiveBlending, depthWrite: false }));
    const pts = new THREE.EllipseCurve(0, 0, r, r).getPoints(200).map(p => new THREE.Vector3(p.x, p.y, 0));
    group.add(new THREE.LineLoop(track(new THREE.BufferGeometry().setFromPoints(pts)), ringMat));
    const s = sprite(0xbfdbfe, 1.1);
    group.add(s);
    world.add(group);
    return { s, r, speed };
  });

  globe.rotation.set(0.35, -1.2, 0.12); // start with the Americas facing the viewer

  // ── Layout: globe in the upper right sky on desktop, upper centre on phones ──
  const layout = { x: 8, y: 1.6, scale: 0.8 };
  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const mobile = w < 768;
    Object.assign(layout, mobile ? { x: 0, y: 4.6, scale: 0.55 } : { x: 8, y: 1.6, scale: 0.8 });
    world.scale.setScalar(layout.scale);
  };
  resize();
  window.addEventListener('resize', resize);

  let mx = 0;
  let my = 0;
  const onPointer = (e: PointerEvent) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
  window.addEventListener('pointermove', onPointer, { passive: true });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clock = new THREE.Clock();
  let raf = 0;

  const frame = () => {
    const t = clock.getElapsedTime();
    const scrollT = window.scrollY / Math.max(1, window.innerHeight);

    globe.rotation.y += 0.0018; // the globe keeps turning
    pulses.forEach(p => p.s.position.copy(p.curve.getPoint((t * p.speed + p.offset) % 1)));
    orbits.forEach(o => { const a = t * o.speed; o.s.position.set(Math.cos(a) * o.r, Math.sin(a) * o.r, 0); });
    halo.material.opacity = 0.3 + Math.sin(t * 1.2) * 0.05;

    // Gentle pointer parallax; the globe rises and fades as you scroll past the hero.
    camera.position.x += (mx * 2 - camera.position.x) * 0.04;
    camera.position.y += (-my * 1.2 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    world.position.set(layout.x, layout.y + Math.min(scrollT, 1.5) * 4, 0);
    const fade = 1 - Math.min(scrollT, 1) * 0.6;
    lightsMat.opacity = fade;
    arcMat.opacity = 0.55 * fade;
    gridMat.opacity = 0.16 * fade;

    renderer.render(scene, camera);
  };

  const loop = () => { frame(); raf = requestAnimationFrame(loop); };
  const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(loop); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVisibility);

  // Reduced motion: draw one still frame (again once the Earth texture has loaded).
  if (reduced) { frame(); window.setTimeout(frame, 1200); } else start();

  return () => {
    stop();
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVisibility);
    disposables.forEach(d => d.dispose());
    renderer.dispose();
  };
}
