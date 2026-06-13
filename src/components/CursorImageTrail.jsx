'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PropTypes from 'prop-types';

const SPAWN_INTERVAL = 300; // ms between spawned images
const IMAGE_LIFETIME = 900; // ms an image stays mounted before being removed

// Varying sizes/ratios so the trail reads like a photo collage.
const SIZES = [
  { width: 180, height: 130 },
  { width: 140, height: 190 },
  { width: 220, height: 150 },
  { width: 160, height: 220 },
  { width: 200, height: 200 },
];

// Spawns small images along the cursor path while hovering, like a marquee trail.
const CursorImageTrail = ({ images, children, className = '', ...rest }) => {
  const containerRef = useRef(null);
  const lastSpawnRef = useRef(0);
  const nextIndexRef = useRef(0);
  const [trail, setTrail] = useState([]);

  const handleMouseMove = useCallback(
    (e) => {
      const now = performance.now();
      if (now - lastSpawnRef.current < SPAWN_INTERVAL) return;
      lastSpawnRef.current = now;

      const rect = containerRef.current.getBoundingClientRect();
      const id = now;
      const src = images[nextIndexRef.current % images.length];
      const size = SIZES[Math.floor(Math.random() * SIZES.length)];
      nextIndexRef.current += 1;

      setTrail((prev) => [
        ...prev,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top, src, size },
      ]);

      setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== id));
      }, IMAGE_LIFETIME);
    },
    [images]
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative ${className}`}
      {...rest}
    >
      <AnimatePresence>
        {trail.map(({ id, x, y, src, size }) => (
          <motion.img
            key={id}
            src={src}
            alt=""
            initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-none absolute z-0 object-cover shadow-2xl"
            style={{
              left: x - size.width / 2,
              top: y - size.height / 2,
              width: size.width,
              height: size.height,
            }}
          />
        ))}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

CursorImageTrail.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default CursorImageTrail;
