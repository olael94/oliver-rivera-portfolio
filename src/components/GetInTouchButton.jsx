'use client';

import { markProgrammaticScroll } from '@/components/SnapSection';

export default function GetInTouchButton({ className, style, children }) {
  return (
    <a
      href="#contact"
      onClick={() => markProgrammaticScroll(1500)}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}
