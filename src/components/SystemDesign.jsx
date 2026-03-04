'use client';

import { useEffect, useRef, useState } from 'react';

const PATHS = [
  // ── FRONTEND BOX ──
  'M 20 60 L 140 60 L 140 110 L 20 110 Z',
  'M 50 75 L 110 75',
  'M 50 85 L 100 85',
  'M 50 95 L 90 95',

  // Label: Frontend
  'M 30 68 L 75 68',

  // ── Arrow: Frontend → API ──
  'M 140 85 L 190 85',
  'M 182 78 L 190 85 L 182 92',

  // ── API GATEWAY BOX ──
  'M 190 60 L 310 60 L 310 110 L 190 110 Z',
  'M 200 75 L 300 75',
  'M 200 85 L 280 85',

  // Label: API Gateway
  'M 200 68 L 255 68',

  // ── Arrow: API → Server ──
  'M 250 110 L 250 150',
  'M 243 142 L 250 150 L 257 142',

  // ── SERVER BOX ──
  'M 160 150 L 340 150 L 340 210 L 160 210 Z',
  'M 175 168 L 325 168',
  'M 175 180 L 300 180',
  'M 175 195 L 280 195',

  // Label: Server / Node.js
  'M 175 160 L 240 160',

  // ── Arrow: Server → DB ──
  'M 340 180 L 390 180',
  'M 382 173 L 390 180 L 382 187',

  // ── DATABASE ──
  // Cylinder top ellipse
  'M 390 165 Q 420 155 450 165 Q 480 175 450 185 Q 420 195 390 185 Q 360 175 390 165',
  // Cylinder body
  'M 390 185 L 390 215',
  'M 450 185 L 450 215',
  'M 390 215 Q 420 225 450 215',

  // Label: PostgreSQL
  'M 395 205 L 445 205',

  // ── Arrow: Server → Cache ──
  'M 250 210 L 250 260',
  'M 243 252 L 250 260 L 257 252',

  // ── CACHE BOX ──
  'M 170 260 L 330 260 L 330 305 L 170 305 Z',
  'M 185 275 L 315 275',
  'M 185 288 L 290 288',

  // Label: Redis Cache
  'M 185 270 L 240 270',

  // ── Arrow: Cache → Client response ──
  'M 170 282 L 80 282 L 80 180 L 20 180',
  'M 28 173 L 20 180 L 28 187',

  // ── WEBSOCKET annotation ──
  'M 165 85 L 165 150',
  'M 158 90 L 165 82 L 172 90',
  'M 155 118 L 175 118',

  // ── Sticky note 1: // auth middleware ──
  'M 20 220 L 120 220 L 120 260 L 20 260 Z',
  'M 120 220 L 110 230 L 120 230',
  'M 30 232 L 110 232',
  'M 30 242 L 100 242',
  'M 30 252 L 90 252',

  // ── Sticky note 2: // TODO: rate limit ──
  'M 350 60 L 470 60 L 470 105 L 350 105 Z',
  'M 470 60 L 460 70 L 470 70',
  'M 360 75 L 460 75',
  'M 360 87 L 440 87',
  'M 360 97 L 450 97',

  // ── Load balancer annotation ──
  'M 140 85 L 165 85',
  'M 30 30 L 90 30 L 90 55',
  'M 83 47 L 90 55 L 97 47',

  // ── Bracket grouping frontend+api ──
  'M 10 50 L 5 50 L 5 120 L 10 120',

  // ── Bracket grouping server+db ──
  'M 155 145 L 150 145 L 150 220 L 155 220',

  // ── Arrow: DB → Backup ──
  'M 450 200 L 500 200 L 500 260',
  'M 493 252 L 500 260 L 507 252',

  // ── BACKUP BOX ──
  'M 470 260 L 540 260 L 540 300 L 470 300 Z',
  'M 480 272 L 530 272',
  'M 480 283 L 520 283',
  'M 480 292 L 510 292',

  // ── CI/CD annotation ──
  'M 20 320 L 150 320 L 150 370 L 20 370 Z',
  'M 30 333 L 140 333',
  'M 30 345 L 130 345',
  'M 30 357 L 120 357',
  'M 30 367 L 100 367',

  // Arrow from CI/CD up to server
  'M 85 320 L 85 210',
  'M 78 218 L 85 210 L 92 218',
];

const LABELS = [
  { x: 32, y: 57, text: 'Frontend', size: 8 },
  { x: 202, y: 57, text: 'API Gateway', size: 8 },
  { x: 177, y: 148, text: 'Server · Node.js', size: 8 },
  { x: 397, y: 162, text: 'PostgreSQL', size: 7 },
  { x: 187, y: 258, text: 'Redis · Cache', size: 8 },
  { x: 167, y: 115, text: 'WS', size: 7 },
  { x: 27, y: 218, text: '// auth middleware', size: 6.5 },
  { x: 358, y: 58, text: '// TODO: rate limit', size: 6.5 },
  { x: 477, y: 258, text: 'S3 Backup', size: 7 },
  { x: 27, y: 318, text: 'CI/CD Pipeline', size: 7 },
  { x: 7, y: 48, text: 'client', size: 6 },
  { x: 152, y: 143, text: 'core', size: 6 },
];

const SystemDesign = () => {
  const svgRef = useRef(null);
  const pencilRef = useRef(null);
  const pathRefs = useRef([]);
  const pathLengths = useRef([]);
  const pencilPositions = useRef([]);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia('(max-width: 768px)').matches;
    setIsMobile(isTouch);
  }, []);

  useEffect(() => {
    if (isMobile || !svgRef.current) return;
    const els = svgRef.current.querySelectorAll('path, rect, ellipse, line');
    els.forEach((el, i) => {
      try {
        const len = el.getTotalLength ? el.getTotalLength() : 40;
        pathLengths.current[i] = len;
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
      } catch {
        pathLengths.current[i] = 40;
      }
    });
    pathRefs.current = Array.from(els);
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
  }, [isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollY / Math.max(maxScroll, 1), 1);
      const total = pathRefs.current.length;
      const drawn = progress * total;

      let lastX = 20,
        lastY = 60;

      pathRefs.current.forEach((el, i) => {
        const len = pathLengths.current[i];
        const seg = Math.min(Math.max(drawn - i, 0), 1);
        el.style.strokeDashoffset = len * (1 - seg);

        if (seg > 0 && seg < 1) {
          try {
            const pt = el.getPointAtLength ? el.getPointAtLength(len * seg) : null;
            if (pt) {
              lastX = pt.x;
              lastY = pt.y;
            }
          } catch {
            /* skip */
          }
        } else if (seg >= 1 && pencilPositions.current[i]) {
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
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-[240px] w-[580px] max-md:hidden z-0"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 5%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 5%, black 88%, transparent 100%)',
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 560 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        style={{ height: 'auto', opacity: 0.18 }}
      >
        {PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="rgba(245,158,11,1)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}

        {LABELS.map((l, i) => (
          <text
            key={`label-${i}`}
            x={l.x}
            y={l.y}
            fontSize={l.size}
            fill="rgba(245,158,11,1)"
            fontFamily="monospace"
            opacity="0"
          >
            {l.text}
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="0.4s"
              begin={`${i * 0.3}s`}
              fill="freeze"
            />
          </text>
        ))}

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

export default SystemDesign;
