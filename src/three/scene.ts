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
