'use client';

import { useEffect, useState } from 'react';
import { CustomCursor } from 'cursor-style';

export default function CustomCursorWrapper() {
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0);
  }, []);

  if (isTouch) return null;

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
