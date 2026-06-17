'use client';

import { useEffect, useRef } from 'react';

// Snaps the wrapped section into view when it crosses the threshold
// while scrolling — gives a deliberate "pull into place" feel without
// locking the rest of the page to CSS scroll snap points.
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
