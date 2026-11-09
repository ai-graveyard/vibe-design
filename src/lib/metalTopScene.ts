import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export interface TopScene {
  setPaused: (paused: boolean) => void;
  turn: (amount: number) => void;
  dispose: () => void;
}

/** Locally modelled aluminium; no remote models or textures. */
export function createTopScene(host: HTMLDivElement, onContextLost: () => void): TopScene | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  } catch { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 40);
  camera.position.set(2.8, 2.2, 5.5);
  camera.lookAt(0, 1.12, 0);
  const room = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, 0.025);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffb65b, 1.8);
  rim.position.set(4, 2, -3);
  scene.add(rim);
  const silver = new THREE.MeshStandardMaterial({ color: 0xb8c0c8, metalness: 1, roughness: 0.2 });
  const edge = new THREE.MeshStandardMaterial({ color: 0x7f898e, metalness: 1, roughness: 0.2 });
  const orange = new THREE.MeshStandardMaterial({ color: 0xff9f1c, metalness: 0.65, roughness: 0.26 });
  const pivot = new THREE.Group();
  const top = new THREE.Group();
  pivot.add(top);
  scene.add(pivot);
  const profile = [
    [0.001, 0], [0.025, 0.025], [0.052, 0.12], [0.09, 0.25],
    [0.21, 0.35], [0.48, 0.49], [0.85, 0.69], [1.13, 0.85],
    [1.25, 0.95], [1.27, 1.0], [1.27, 1.055], [1.25, 1.1],
    [1.16, 1.15], [0.98, 1.2], [0.72, 1.25], [0.42, 1.29],
    [0.18, 1.31], [0.115, 1.35], [0.105, 1.4], [0.105, 1.98],
    [0.13, 2.005], [0.13, 2.09], [0.11, 2.12], [0.001, 2.12],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  top.add(new THREE.Mesh(new THREE.LatheGeometry(profile.slice(0, 10), 128), edge));
  top.add(new THREE.Mesh(new THREE.LatheGeometry(profile.slice(9), 128), silver));
  const ring = (radius: number, tube: number, y: number, material: THREE.Material) => {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 8, 128), material);
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = y;
    top.add(mesh);
  };
  ring(1.273, 0.015, 1.045, orange);
  ring(1.267, 0.008, 0.99, edge);
  // Concentric machining lines follow the shallow crown.
  for (let i = 0; i < 9; i++) {
    const radius = 0.28 + i * 0.1;
    const y = radius < 0.42 ? 1.31 - (radius - 0.18) / 0.24 * 0.02
      : radius < 0.72 ? 1.29 - (radius - 0.42) / 0.3 * 0.04
      : radius < 0.98 ? 1.25 - (radius - 0.72) / 0.26 * 0.05
      : 1.2 - (radius - 0.98) / 0.18 * 0.05;
    ring(radius, 0.0025, y + 0.004, edge);
  }
  for (let i = 0; i < 5; i++) ring(0.106, 0.003, 1.81 + i * 0.028, edge);
  const marker = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.006, 0.13), orange);
  marker.position.set(0, 1.225, 0.88);
  marker.rotation.x = -0.19;
  top.add(marker);
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(30,24,18,0.32)');
  gradient.addColorStop(0.3, 'rgba(30,24,18,0.16)');
  gradient.addColorStop(1, 'rgba(30,24,18,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(3.7, 3.7), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0.05, -0.025, 0);
  scene.add(shadow);
  let paused = true;
  let visible = true;
  let disposed = false;
  let lost = false;
  let frame = 0;
  let previousTime = 0;
  let elapsed = 0;
  let angle = 0;
  let drag: { id: number; x: number } | null = null;
  let lean = -0.25;
  const render = () => {
    pivot.rotation.set(0.1 + Math.sin(elapsed * 0.7) * 0.035, 0, lean + Math.cos(elapsed * 0.65) * 0.025);
    top.rotation.y = angle;
    renderer.render(scene, camera);
  };
  const animate = (time: number) => {
    frame = 0;
    if (disposed || lost || !visible || document.hidden) return;
    const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
    previousTime = time;
    if (!paused && !drag) { elapsed += dt; angle += dt * 1.35; }
    render();
    if (!paused) frame = requestAnimationFrame(animate);
  };
  const wake = () => {
    if (!frame && !disposed && !lost && visible && !document.hidden) {
      previousTime = 0;
      frame = requestAnimationFrame(animate);
    }
  };
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    wake();
  });
  resize.observe(host);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; wake(); });
  intersection.observe(host);
  document.addEventListener('visibilitychange', wake);
  const down = (event: PointerEvent) => {
    if (!event.isPrimary || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX };
    host.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (!drag || drag.id !== event.pointerId) return;
    const delta = event.clientX - drag.x;
    angle += delta * 0.018;
    lean = THREE.MathUtils.clamp(lean + delta * 0.0007, -0.45, 0.25);
    drag.x = event.clientX;
    wake();
  };
  const up = () => { drag = null; wake(); };
  const contextLost = () => { lost = true; cancelAnimationFrame(frame); canvas.style.display = 'none'; onContextLost(); };
  host.addEventListener('pointerdown', down);
  host.addEventListener('pointermove', move);
  host.addEventListener('pointerup', up);
  host.addEventListener('pointercancel', up);
  host.addEventListener('lostpointercapture', up);
  canvas.addEventListener('webglcontextlost', contextLost);
  wake();
  return {
    setPaused(value) { paused = value; wake(); },
    turn(amount) { angle += amount; wake(); },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', wake);
      host.removeEventListener('pointerdown', down);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerup', up);
      host.removeEventListener('pointercancel', up);
      host.removeEventListener('lostpointercapture', up);
      canvas.removeEventListener('webglcontextlost', contextLost);
      scene.traverse(object => { if (object instanceof THREE.Mesh) object.geometry.dispose(); });
      silver.dispose(); edge.dispose(); orange.dispose(); shadow.material.dispose();
      shadowTexture.dispose(); environment.dispose(); renderer.dispose();
      canvas.remove();
    },
  };
}
