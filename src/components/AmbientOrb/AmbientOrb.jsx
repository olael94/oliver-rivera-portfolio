'use client';

import { useEffect, useRef } from 'react';

// All the wireframe paths in drawing order
const PATHS = [
  // Browser window outline
  'M 10 30 L 10 10 L 330 10 L 330 30',
  'M 10 30 L 330 30',
  'M 10 30 L 10 480 L 330 480 L 330 30',

  // Browser dots
  'M 28 20 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0',
  'M 46 20 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0',
  'M 64 20 m -4 0 a 4 4 0 1 0 8 0 a 4 4 0 1 0 -8 0',

  // URL bar
  'M 90 14 L 280 14 L 280 26 L 90 26 Z',

  // Navbar
  'M 10 30 L 330 30 L 330 58 L 10 58 Z',
  // Nav items
  'M 30 44 L 70 44',
  'M 100 44 L 130 44',
  'M 150 44 L 185 44',
  'M 205 44 L 235 44',
  // Nav logo
  'M 20 38 L 20 50 L 32 50 L 32 38 Z',

  // Hero section
  'M 20 70 L 200 70',
  'M 20 86 L 230 86',
  'M 20 100 L 180 100',
  'M 20 118 L 90 118 L 90 132 L 20 132 Z',
  'M 100 118 L 170 118 L 170 132 L 100 132 Z',

  // Hero image placeholder
  'M 220 65 L 320 65 L 320 145 L 220 145 Z',
  'M 220 65 L 320 145',
  'M 320 65 L 220 145',

  // Section divider
  'M 20 165 L 310 165',

  // Section title
  'M 20 178 L 120 178',

  // Card 1
  'M 20 192 L 100 192 L 100 270 L 20 270 Z',
  'M 20 192 L 100 228 L 20 228',
  'M 28 236 L 92 236',
  'M 28 246 L 80 246',
  'M 28 256 L 88 256',

  // Card 2
  'M 112 192 L 192 192 L 192 270 L 112 270 Z',
  'M 112 192 L 192 228 L 112 228',
  'M 120 236 L 184 236',
  'M 120 246 L 172 246',
  'M 120 256 L 180 256',

  // Card 3
  'M 204 192 L 320 192 L 320 270 L 204 270 Z',
  'M 204 192 L 320 228 L 204 228',
  'M 212 236 L 312 236',
  'M 212 246 L 290 246',
  'M 212 256 L 300 256',

  // Second section
  'M 20 290 L 310 290',
  'M 20 302 L 140 302',

  // Two column layout
  'M 20 316 L 155 316 L 155 400 L 20 400 Z',
  'M 28 326 L 147 326',
  'M 28 338 L 147 338',
  'M 28 350 L 120 350',
  'M 28 362 L 140 362',
  'M 28 374 L 130 374',
  'M 28 386 L 90 386 L 90 396 L 28 396 Z',

  'M 165 316 L 320 316 L 320 400 L 165 400 Z',
  'M 173 324 L 312 324 L 312 370 L 173 370 Z',
  'M 173 324 L 312 370',
  'M 312 324 L 173 370',

  // Footer
  'M 10 420 L 330 420 L 330 480 L 10 480 Z',
  'M 28 435 L 90 435',
  'M 28 447 L 110 447',
  'M 28 459 L 80 459',
  'M 150 435 L 200 435',
  'M 150 447 L 210 447',
  'M 150 459 L 190 459',
  'M 240 435 L 310 435',
  'M 240 447 L 300 447',
  'M 240 459 L 290 459',

  // Annotations
  'M 340 100 L 370 100',
  'M 340 145 L 370 145',
  'M 370 100 L 370 145',
  'M 370 122 L 390 122',

  'M 340 228 L 360 228',
  'M 360 220 L 360 236',
];

const AmbientOrb = () => {
  const svgRef = useRef(null);
  const pencilRef = useRef(null);
  const pathRefs = useRef([]);
  const pathLengths = useRef([]);
  const pencilPositions = useRef([]);

  useEffect(() => {
    if (!svgRef.current) return;

    const pathEls = svgRef.current.querySelectorAll('path, rect, circle, line');
    pathEls.forEach((el, i) => {
      try {
        const len = el.getTotalLength ? el.getTotalLength() : 50;
        pathLengths.current[i] = len;
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
      } catch {
        pathLengths.current[i] = 50;
      }
    });

    pathRefs.current = Array.from(pathEls);
    pencilPositions.current = pathRefs.current.map((el) => {
      try {
        if (el.getTotalLength) {
          const len = el.getTotalLength();
          const pt = el.getPointAtLength(len);
          return { x: pt.x, y: pt.y };
        }
      } catch {
        // fall through
      }
      return { x: 0, y: 0 };
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / Math.max(maxScroll, 1), 1);

      const total = pathRefs.current.length;
      const drawn = progress * total;

      let lastX = 10,
        lastY = 10;

      pathRefs.current.forEach((el, i) => {
        const len = pathLengths.current[i];
        const segProgress = Math.min(Math.max(drawn - i, 0), 1);
        el.style.strokeDashoffset = len * (1 - segProgress);

        if (segProgress > 0 && segProgress < 1) {
          try {
            const pt = el.getPointAtLength ? el.getPointAtLength(len * segProgress) : null;
            if (pt) { lastX = pt.x; lastY = pt.y; }
          } catch { /* skip */ }
        } else if (segProgress >= 1 && pencilPositions.current[i]) {
          lastX = pencilPositions.current[i].x;
          lastY = pencilPositions.current[i].y;
        }
      });

      if (pencilRef.current) {
        pencilRef.current.setAttribute('transform', `translate(${lastX}, ${lastY})`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-[72px] right-[140px] w-[420px] max-md:hidden z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 5%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 5%, black 88%, transparent 100%)',
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 420 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ height: 'auto' }}
      >
        {/* Wireframe paths */}
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="rgba(245,158,11,0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}

        {/* Annotation labels */}
        <text x="392" y="118" fontSize="7" fill="rgba(245,158,11,0.25)" fontFamily="monospace">
          hero
        </text>
        <text x="362" y="232" fontSize="7" fill="rgba(245,158,11,0.25)" fontFamily="monospace">
          fold
        </text>

        {/* Pencil — tilted right, tip anchored to drawing point */}
        <g ref={pencilRef}>
          <g transform="rotate(35) scale(0.6) translate(-12, -53)" opacity="0.75">
            <rect
              x="6"
              y="0"
              width="12"
              height="7"
              rx="2"
              fill="rgba(251,146,60,0.95)"
              stroke="rgba(200,100,20,0.5)"
              strokeWidth="0.5"
            />
            <rect x="6" y="6" width="12" height="3" fill="rgba(160,70,10,0.7)" />
            <rect
              x="6"
              y="9"
              width="12"
              height="26"
              fill="rgba(245,158,11,0.9)"
              stroke="rgba(180,110,0,0.4)"
              strokeWidth="0.5"
            />
            <rect x="6" y="9" width="3.5" height="26" fill="rgba(255,220,100,0.2)" />
            <rect x="14.5" y="9" width="3.5" height="26" fill="rgba(140,80,0,0.2)" />
            <path
              d="M 6 35 L 12 50 L 18 35 Z"
              fill="rgba(200,150,80,0.95)"
              stroke="rgba(160,110,50,0.4)"
              strokeWidth="0.5"
            />
            <path d="M 6 35 L 12 50 L 9 35 Z" fill="rgba(160,110,50,0.3)" />
            <path d="M 9.5 46 L 12 53 L 14.5 46 Z" fill="rgba(50,50,50,0.9)" />
            <circle
              cx="12"
              cy="53"
              r="4"
              fill="rgba(245,158,11,0.3)"
              style={{ filter: 'blur(4px)' }}
            />
            <circle
              cx="12"
              cy="53"
              r="1.5"
              fill="rgba(245,158,11,0.8)"
              style={{ filter: 'blur(1px)' }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default AmbientOrb;
