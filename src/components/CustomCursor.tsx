import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        setIsTouch(true);
      }
    };
    checkTouch();
    window.addEventListener('touchstart', () => setIsTouch(true), { once: true });

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button, a, [role="button"], input, select, textarea, [data-interactive]')) {
        setHovering(true);
      }
    };
    const out = () => setHovering(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mouseout', out);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mouseout', out);
    };
  }, []);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
      animate={{
        x: pos.x - (hovering ? 20 : 10),
        y: pos.y - (hovering ? 20 : 10),
        width: hovering ? 40 : 20,
        height: hovering ? 40 : 20,
        opacity: 0.5,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      style={{
        background: 'radial-gradient(circle, hsl(220 100% 55% / 0.4), transparent)',
        mixBlendMode: 'normal',
      }}
    />
  );
}
