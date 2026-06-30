'use client';

import { useEffect, useRef } from 'react';

// Snaps the wrapped section into view when it crosses the threshold
// while scrolling — gives a deliberate "pull into place" feel without
// locking the rest of the page to CSS scroll snap points.
//
// Skips snapping during anchor-driven scrolls so links like "Get In Touch"
// (#contact) are not hijacked mid-journey by an intermediate section snap.
let programmaticScrollUntil = 0;

export function markProgrammaticScroll(ms = 1200) {
  programmaticScrollUntil = Date.now() + ms;
}

export default function SnapSection({ children, threshold = 0.38, className = '' }) {
  const ref = useRef(null);
  const snapped = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrollingDown = window.scrollY > lastScrollY.current;
        lastScrollY.current = window.scrollY;

        if (Date.now() < programmaticScrollUntil) return;

        if (entry.isIntersecting && scrollingDown && !snapped.current) {
          snapped.current = true;
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Reset so it can snap again if user scrolls back up then down
        if (!entry.isIntersecting) {
          snapped.current = false;
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
