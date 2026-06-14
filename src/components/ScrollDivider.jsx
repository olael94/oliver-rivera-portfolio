'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'motion/react';
import PropTypes from 'prop-types';
import { getScrollDirection } from '@/lib/scrollDirection';

// Thin horizontal rule next to section labels that "draws in" from left to
// right when scrolling down into view. Replays on each downward pass, but
// snaps instantly into place when scrolling back up to it.
function ScrollDivider({ className = '' }) {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const isInView = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    if (isInView) {
      if (getScrollDirection() === 'down') {
        controls.start({ scaleX: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } });
      } else {
        controls.set({ scaleX: 1 });
      }
    } else {
      controls.set({ scaleX: 0 });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className={`h-px flex-1 origin-left bg-zinc-200 dark:bg-zinc-800/60 ${className}`}
      initial={{ scaleX: 0 }}
      animate={controls}
    />
  );
}

ScrollDivider.propTypes = {
  className: PropTypes.string,
};

export default ScrollDivider;
