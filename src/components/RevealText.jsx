'use client';

import { motion } from 'motion/react';
import PropTypes from 'prop-types';

// On hover, the current text slides up and out while a duplicate copy
// slides up from below to take its place — like a stadium flip board.
const RevealText = ({ children, className = '' }) => {
  return (
    <span className={`inline-block h-[1em] overflow-hidden align-bottom leading-none ${className}`}>
      <motion.span
        className="flex flex-col leading-none"
        initial={{ y: '0%' }}
        whileHover={{ y: '-50%' }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="block">{children}</span>
        <span className="block" aria-hidden="true">
          {children}
        </span>
      </motion.span>
    </span>
  );
};

RevealText.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default RevealText;
