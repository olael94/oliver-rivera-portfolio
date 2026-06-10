'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'motion/react';
import * as THREE from 'three';

// Three.js ambient visualizer: a glowing wireframe "planet" core with
// equalizer-style rays bursting outward in every direction, wrapped in a few
// slow-orbiting glowing rings and a faint starfield. Ray lengths pulse with a
// mix of continuous waving and discrete pops, the whole scene expands with
// scroll progress, and the camera drifts gently with the cursor.

const RAY_COUNT = 140;
const CORE_RADIUS = 1;
const RAY_INNER = 1.05;
const MAX_RAY_LENGTH = 1.7;
const STEP_DURATION = 1.4;
const ROTATE_SPEED = 0.1;
const STAR_COUNT = 220;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// Deterministic pseudo-random value in [0, 1] for a given (ray, step) pair.
function pseudoRandom(i, step) {
  const x = Math.sin(i * 12.9898 + step * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Wavy closed loop in the XY plane, later rotated into an orbital plane.
function buildOrbitCurve(radius, freqA, freqB, phase) {
  const points = [];
  const segments = 96;
  for (let k = 0; k <= segments; k += 1) {
    const angle = (k / segments) * Math.PI * 2;
    const r =
      radius * (1 + 0.12 * Math.sin(angle * freqA + phase) + 0.08 * Math.sin(angle * freqB));
    points.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0));
  }
  return new THREE.CatmullRomCurve3(points, true);
}

const EXTRA_COLORS = ['#38bdf8', '#fb923c'];

export default function MusicVisualizer() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const canvas = canvasRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const planet = new THREE.Group();
    scene.add(planet);

    // Glowing wireframe core.
    const coreGeometry = new THREE.IcosahedronGeometry(CORE_RADIUS, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    planet.add(core);

    // Rays bursting outward from the core in every direction.
    const rayDirections = [];
    for (let i = 0; i < RAY_COUNT; i += 1) {
      const y = 1 - (i / (RAY_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = GOLDEN_ANGLE * i;
      rayDirections.push([Math.cos(theta) * radiusAtY, y, Math.sin(theta) * radiusAtY]);
    }
    const rayGeometry = new THREE.BufferGeometry();
    const rayPositions = new Float32Array(RAY_COUNT * 2 * 3);
    const rayColors = new Float32Array(RAY_COUNT * 2 * 3);
    rayGeometry.setAttribute('position', new THREE.BufferAttribute(rayPositions, 3));
    rayGeometry.setAttribute('color', new THREE.BufferAttribute(rayColors, 3));
    const rayMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const rays = new THREE.LineSegments(rayGeometry, rayMaterial);
    planet.add(rays);

    // Slow-orbiting glowing rings around the planet.
    const orbitConfigs = [
      { radius: 1.8, freqA: 3, freqB: 5, phase: 0, tilt: [0.3, 0, 0], speed: 0.18 },
      { radius: 2.2, freqA: 4, freqB: 2, phase: 1.4, tilt: [1.1, 0.4, 0], speed: -0.12 },
      { radius: 2.6, freqA: 2, freqB: 6, phase: 2.7, tilt: [0.6, 1.2, 0.3], speed: 0.08 },
    ];
    const orbits = orbitConfigs.map((config) => {
      const curve = buildOrbitCurve(config.radius, config.freqA, config.freqB, config.phase);
      const geometry = new THREE.TubeGeometry(curve, 128, 0.012, 8, true);
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.set(...config.tilt);
      planet.add(mesh);
      return { mesh, geometry, material, speed: config.speed };
    });

    // Faint background starfield.
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starColors = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i += 1) {
      const radius = 5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.cos(phi);
      starPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    let palette = [];
    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      palette = [
        styles.getPropertyValue('--color-accent').trim() || '#84cc16',
        styles.getPropertyValue('--color-accent-muted').trim() || '#a3e635',
        ...EXTRA_COLORS,
      ].map((hex) => new THREE.Color(hex));

      coreMaterial.color = palette[1];

      orbits.forEach((orbit, i) => {
        orbit.material.color = palette[(i + 2) % palette.length];
      });

      const starColorAttr = starGeometry.getAttribute('color');
      for (let i = 0; i < STAR_COUNT; i += 1) {
        const c = palette[i % palette.length];
        starColorAttr.setXYZ(i, c.r, c.g, c.b);
      }
      starColorAttr.needsUpdate = true;
    };
    readColors();

    const observer = new MutationObserver(readColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);

    const mouseTarget = { x: 0, y: 0 };
    const mouseSmooth = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouseTarget.x = e.clientX / window.innerWidth - 0.5;
      mouseTarget.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const start = performance.now();
    let frame;

    const draw = (now) => {
      const t = (now - start) / 1000;
      const progress = scrollYProgress.get();

      mouseSmooth.x += (mouseTarget.x - mouseSmooth.x) * 0.05;
      mouseSmooth.y += (mouseTarget.y - mouseSmooth.y) * 0.05;

      const stepTime = t / STEP_DURATION;
      const stepIndex = Math.floor(stepTime);
      const stepFrac = stepTime - stepIndex;
      const popEase = 1 - Math.pow(1 - stepFrac, 4);

      const expand = 1 + progress * 0.4;
      const posAttr = rayGeometry.getAttribute('position');
      const colorAttr = rayGeometry.getAttribute('color');

      for (let i = 0; i < RAY_COUNT; i += 1) {
        const [dx, dy, dz] = rayDirections[i];

        const prevEnergy = pseudoRandom(i, stepIndex);
        const nextEnergy = pseudoRandom(i, stepIndex + 1);
        const energy = prevEnergy + (nextEnergy - prevEnergy) * popEase;
        const wave = Math.sin(dy * 5 + t * 0.5) * 0.5 + 0.5;
        const combined = energy * 0.55 + wave * 0.45;

        const innerR = RAY_INNER;
        const outerR = RAY_INNER + MAX_RAY_LENGTH * expand * (0.2 + combined * 0.9);

        posAttr.setXYZ(i * 2, dx * innerR, dy * innerR, dz * innerR);
        posAttr.setXYZ(i * 2 + 1, dx * outerR, dy * outerR, dz * outerR);

        const colorA = palette[i % palette.length];
        const colorB = palette[(i + 1) % palette.length];
        const color = colorA.clone().lerp(colorB, combined);

        colorAttr.setXYZ(i * 2, color.r, color.g, color.b);
        colorAttr.setXYZ(i * 2 + 1, color.r, color.g, color.b);
      }
      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

      core.scale.setScalar(expand * (1 + Math.sin(t * 1.5) * 0.04));
      core.rotation.y = t * 0.06;
      core.rotation.x = t * 0.04;

      orbits.forEach((orbit, i) => {
        orbit.mesh.rotation.z = t * orbit.speed;
        orbit.mesh.scale.setScalar(expand);
        orbit.material.opacity = 0.4 + Math.sin(t * 0.8 + i) * 0.15;
      });

      planet.rotation.y = t * ROTATE_SPEED + mouseSmooth.x * 0.6;
      planet.rotation.x = mouseSmooth.y * 0.4;

      camera.position.x = mouseSmooth.x * 1.2;
      camera.position.y = -mouseSmooth.y * 1.2;
      camera.position.z = 6.5 - progress * 1.5;
      camera.lookAt(0, 0, 0);

      stars.rotation.y = -t * 0.01;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      coreGeometry.dispose();
      coreMaterial.dispose();
      rayGeometry.dispose();
      rayMaterial.dispose();
      orbits.forEach((orbit) => {
        orbit.geometry.dispose();
        orbit.material.dispose();
      });
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, [scrollYProgress]);

  return <canvas ref={canvasRef} className="absolute inset-0" style={{ filter: 'blur(1px)' }} />;
}
