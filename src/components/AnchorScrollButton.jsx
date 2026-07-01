'use client';

import PropTypes from 'prop-types';
import { markProgrammaticScroll } from '@/components/SnapSection';

// In-page anchor link that suppresses SnapSection's scroll-snap for the
// duration of the jump, so intermediate sections don't hijack the scroll
// before it reaches the target.
export default function AnchorScrollButton({ href, className, style, children }) {
  return (
    <a href={href} onClick={() => markProgrammaticScroll(1500)} className={className} style={style}>
      {children}
    </a>
  );
}

AnchorScrollButton.propTypes = {
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
