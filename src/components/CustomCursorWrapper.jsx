'use client';

import { CustomCursor } from 'cursor-style';

export default function CustomCursorWrapper() {
  return (
    <CustomCursor
      type="two"
      sizeDot={0.8}
      sizeOutline={3.5}
      delay={50}
      scaleOnHover={1.5}
      bgColorDot="rgb(163,230,53)"
      bgColorOutline="rgb(163,230,53)"
    />
  );
}
