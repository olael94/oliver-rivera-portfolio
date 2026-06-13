'use client';

import { useEffect, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';

// Full-page ambient background: each section has its own flat accent
// color — neutral gray for the intro, then blue, indigo and lime. Each
// color holds flat through most of its section, then slowly fades in
// as the user crosses into the next section.
const SECTION_IDS = ['hero', 'experience', 'projects', 'contact'];

// Light mode sits on a pale gray surface, so the same low-opacity tints
// used in dark mode become nearly invisible — bump the opacity to keep
// each section's accent legible against the lighter background.
const SECTION_COLORS_DARK = [
  'rgba(33,33,33,0)',
  'rgba(59,130,246,0.28)',
  'rgba(6,182,212,0.28)',
  'rgba(29,78,216,0.28)',
];
const SECTION_COLORS_LIGHT = [
  'rgba(232,232,232,0)',
  'rgba(59,130,246,0.45)',
  'rgba(6,182,212,0.45)',
  'rgba(29,78,216,0.45)',
];

const DEFAULT_STARTS = [0.22, 0.5, 0.78];
const TRANSITION_WIDTH = 0.05;

export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const [starts, setStarts] = useState(DEFAULT_STARTS);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const update = () => setIsDark(document.body.classList.contains('dark'));
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function update() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const next = SECTION_IDS.slice(1).map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return (window.scrollY + rect.top) / scrollable;
      });

      if (next.every((v) => v !== null)) setStarts(next);
    }

    update();
    const timeout = setTimeout(update, 500);
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    document.fonts?.ready?.then(update);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', update);
      window.removeEventListener('load', update);
    };
  }, []);

  // Each transition completes right as its section starts, by ramping
  // over the tail end of the previous section — so the new color is
  // fully in by the time the section comes into view. Clamp so the
  // window always fits within [0, 1], leaving a flat hold at the end
  // even for a section that starts very close to the bottom of the page.
  const clampedStarts = starts.map((s) =>
    Math.min(Math.max(s, 2 * TRANSITION_WIDTH), 1 - TRANSITION_WIDTH)
  );

  const raw = [
    0,
    clampedStarts[0] - 2 * TRANSITION_WIDTH,
    clampedStarts[0],
    clampedStarts[1] - 2 * TRANSITION_WIDTH,
    clampedStarts[1],
    clampedStarts[2] - 2 * TRANSITION_WIDTH,
    clampedStarts[2],
    1,
  ];

  // Ensure breakpoints are strictly increasing — sections close together
  // can otherwise produce overlapping transition windows.
  const breakpoints = [];
  let prev = -Infinity;
  for (const value of raw) {
    const next = Math.max(value, prev + 0.0001);
    breakpoints.push(next);
    prev = next;
  }
  const sectionColors = isDark ? SECTION_COLORS_DARK : SECTION_COLORS_LIGHT;
  const colors = [
    sectionColors[0],
    sectionColors[0],
    sectionColors[1],
    sectionColors[1],
    sectionColors[2],
    sectionColors[2],
    sectionColors[3],
    sectionColors[3],
  ];

  const baseColor = useTransform(scrollYProgress, breakpoints, colors);

  // Expose the current section color as a CSS variable so neumorphic
  // surfaces (cards, icons, buttons) can tint themselves to match.
  useEffect(() => {
    document.documentElement.style.setProperty('--section-glow', baseColor.get());
  }, [baseColor]);

  useMotionValueEvent(baseColor, 'change', (latest) => {
    document.documentElement.style.setProperty('--section-glow', latest);
  });

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div className="absolute inset-0" style={{ backgroundColor: baseColor }} />
    </div>
  );
}
