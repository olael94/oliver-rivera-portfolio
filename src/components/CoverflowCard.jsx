'use client';

import { motion, useTransform } from 'motion/react';
import PropTypes from 'prop-types';

const MAX_ROTATE = 55; // degrees, clamped at the extremes
const ROTATE_PER_UNIT = 32; // degrees of rotation per card-width of distance
const MAX_DISTANCE = 3; // distance (in card widths) beyond which falloff stops increasing
const DEPTH_PER_UNIT = 140; // px pushed back into the z-axis per card-width of distance
const SCALE_PER_UNIT = 0.14;
const OPACITY_PER_UNIT = 0.26;
const MIN_OPACITY = 0.2;
const INTERACTIVE_DISTANCE = 0.6; // only the ~centered card accepts clicks
const TRANSFORM_PERSPECTIVE = 1400; // px, applied locally per card (see comment below)

// Wraps a card with a scroll-reactive 3D coverflow transform: rotation, scale,
// and z-depth are all derived from how far the card's center sits from the
// viewport's center as the track's shared `x` motion value changes.
const CoverflowCard = ({ x, index, step, centerOffset, children }) => {
  const distance = useTransform(x, (xValue) => {
    if (!step) return 0;
    const cardCenter = index * step + step / 2 + xValue;
    return (cardCenter - centerOffset) / step;
  });

  const rotateY = useTransform(distance, (d) =>
    Math.max(-MAX_ROTATE, Math.min(MAX_ROTATE, d * ROTATE_PER_UNIT))
  );
  const scale = useTransform(
    distance,
    (d) => 1 - Math.min(Math.abs(d), MAX_DISTANCE) * SCALE_PER_UNIT
  );
  const z = useTransform(distance, (d) => -Math.min(Math.abs(d), MAX_DISTANCE) * DEPTH_PER_UNIT);
  const opacity = useTransform(distance, (d) =>
    Math.max(MIN_OPACITY, 1 - Math.min(Math.abs(d), MAX_DISTANCE) * OPACITY_PER_UNIT)
  );
  const zIndex = useTransform(distance, (d) =>
    Math.round(100 - Math.min(Math.abs(d), MAX_DISTANCE) * 10)
  );
  // Rotated side cards visually overlap the centered card's hit area, so only
  // the (near-)centered card should ever intercept clicks.
  const pointerEvents = useTransform(distance, (d) =>
    Math.abs(d) < INTERACTIVE_DISTANCE ? 'auto' : 'none'
  );

  return (
    // transformPerspective is applied per-card (not as an ancestor `perspective`)
    // so each card's own translateZ foreshortens around its own center instead
    // of a shared vanishing point — otherwise receding cards would visually
    // drift toward the frame's center, decoupling their rendered position from
    // the flex-layout position their click targets actually sit at.
    <motion.div
      style={{
        transformPerspective: TRANSFORM_PERSPECTIVE,
        rotateY,
        scale,
        z,
        opacity,
        zIndex,
        pointerEvents,
      }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};

CoverflowCard.propTypes = {
  x: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  centerOffset: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default CoverflowCard;
