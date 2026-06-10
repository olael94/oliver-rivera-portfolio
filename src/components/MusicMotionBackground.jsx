'use client';

import { useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import MusicVisualizer from './MusicVisualizer';

// Ambient background pairing two soft neumorphic glow orbs (drifting with
// scroll + cursor parallax) with a canvas-based "media player" wave
// visualizer underneath, so the motion reads as music without breaking the
// neumorphic surface language.

const ORBS = [
  {
    className: 'w-[520px] h-[520px] -top-40 -right-40',
    scrollX: [0, -100],
    scrollY: [0, 160],
    mouseStrength: 30,
    floatDuration: 9,
  },
  {
    className: 'w-[420px] h-[420px] -bottom-32 -left-32',
    scrollX: [0, 120],
    scrollY: [0, -140],
    mouseStrength: 45,
    floatDuration: 11,
  },
];

function GlowOrb({ scrollYProgress, mouseX, mouseY, config }) {
  const scrollX = useTransform(scrollYProgress, [0, 1], config.scrollX);
  const scrollY = useTransform(scrollYProgress, [0, 1], config.scrollY);

  const mouseOffsetX = useTransform(
    mouseX,
    [-0.5, 0.5],
    [-config.mouseStrength, config.mouseStrength]
  );
  const mouseOffsetY = useTransform(
    mouseY,
    [-0.5, 0.5],
    [-config.mouseStrength, config.mouseStrength]
  );

  const x = useTransform([scrollX, mouseOffsetX], ([sx, mx]) => sx + mx);
  const y = useTransform([scrollY, mouseOffsetY], ([sy, my]) => sy + my);

  return (
    <motion.div className={`absolute rounded-full ${config.className}`} style={{ x, y }}>
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          background: 'var(--motion-shape-bg)',
          boxShadow: 'var(--motion-shape-shadow)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: config.floatDuration, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}

export default function MusicMotionBackground() {
  const { scrollYProgress } = useScroll();

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const mouseX = useSpring(rawMouseX, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(rawMouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      rawMouseX.set(e.clientX / window.innerWidth - 0.5);
      rawMouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rawMouseX, rawMouseY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {ORBS.map((config, i) => (
        <GlowOrb
          key={i}
          config={config}
          scrollYProgress={scrollYProgress}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
      <MusicVisualizer />
    </div>
  );
}
