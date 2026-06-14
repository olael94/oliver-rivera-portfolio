let direction = 'down';
let lastY = 0;
let initialized = false;

// Tracks the most recent vertical scroll direction so reveal animations can
// replay when scrolling down into a section but snap instantly into place
// when scrolling back up.
function init() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  lastY = window.scrollY;
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (y > lastY) direction = 'down';
      else if (y < lastY) direction = 'up';
      lastY = y;
    },
    { passive: true }
  );
}

export function getScrollDirection() {
  init();
  return direction;
}
