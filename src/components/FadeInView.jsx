'use client';

import { useEffect, useRef } from 'react';
import { motion, useAnimationControls, useInView } from 'motion/react';
import PropTypes from 'prop-types';
import { getScrollDirection } from '@/lib/scrollDirection';

// Fades and slides content in when scrolling down into view. Replays each
// time the section is scrolled past going down, but snaps instantly into
// place (no animation) when scrolling back up to it.
function FadeInView({ children, delay = 0, y = 36, className = '' }) {
  const ref = useRef(null);
  const controls = useAnimationControls();
  const isInView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      if (getScrollDirection() === 'down') {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        });
      } else {
        controls.set({ opacity: 1, y: 0 });
      }
    } else {
      controls.set({ opacity: 0, y });
    }
  }, [isInView, controls, delay, y]);

  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y }} animate={controls}>
      {children}
    </motion.div>
  );
}

FadeInView.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  y: PropTypes.number,
  className: PropTypes.string,
};

export default FadeInView;
