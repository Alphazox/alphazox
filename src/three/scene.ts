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
        float rim = pow(1.0 - clamp(vN.z, 0.0, 1.0), 1.6);
        float light = clamp(dot(vN, normalize(vec3(-0.35, 0.55, 0.75))), 0.0, 1.0);
        vec3 col = mix(vec3(0.03, 0.08, 0.20), vec3(0.08, 0.16, 0.36), light * 0.5);
        // towards the rim the ocean becomes the sky's own colour, so the edge disappears into it
        col = mix(col, vec3(0.01, 0.12, 0.24), rim);
        gl_FragColor = vec4(col, smoothstep(0.0, 0.12, vN.z));
      }`,
    transparent: true,
  }))));

  // Continents and city lights share the same soft fade at the rim as the ocean, so the globe has no outline.
  const feathered = (texture: THREE.Texture, fragment: string, additive: boolean) => track(new THREE.ShaderMaterial({
    uniforms: { tex: { value: texture } },
    vertexShader: `varying vec2 vUv; varying vec3 vN;
      void main(){ vUv = uv; vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform sampler2D tex; varying vec2 vUv; varying vec3 vN;
      void main(){ float edge = smoothstep(0.0, 0.45, vN.z); vec4 t = texture2D(tex, vUv); ${fragment} }`,
    transparent: true,
    depthWrite: false,
    // Additive layers only add light: they must not write alpha, or empty edge pixels turn into a black ring.
    ...(additive
      ? { blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor }
      : { blending: THREE.NormalBlending }),
  }));
  const loader = new THREE.TextureLoader();
  // Continents as soft blue-grey shapes
  const landTex = track(loader.load('/textures/earth-land.png'));
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 1.002, 96, 96)),
    feathered(landTex, 'gl_FragColor = vec4(0.36, 0.48, 0.74, t.g * 0.42 * edge);', false)));
  // City lights (NASA "Earth at night")
  const lightsTex = track(loader.load('/textures/earth-lights.png'));
  globe.add(new THREE.Mesh(track(new THREE.SphereGeometry(R * 1.004, 96, 96)),
    feathered(lightsTex, 'gl_FragColor = vec4(t.rgb * vec3(1.0, 0.86, 0.63) * edge, 1.0);', true)));

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
