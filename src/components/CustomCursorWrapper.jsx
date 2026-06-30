'use client';

import { useEffect, useState } from 'react';
import { CustomCursor } from 'cursor-style';

export default function CustomCursorWrapper() {
  const [isTouch, setIsTouch] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0);

    const update = () => setIsDark(document.body.classList.contains('dark'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (isTouch) return null;

  const color = isDark ? 'rgb(163,230,53)' : 'rgb(59,130,246)';

  return (
    <CustomCursor
      key={color}
      type="two"
      sizeDot={0.8}
      sizeOutline={3.5}
      delay={45}
      scaleOnHover={1}
      bgColorDot={color}
      bgColorOutline={color}
    />
  );
}
