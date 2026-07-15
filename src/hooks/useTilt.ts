import { useCallback, useRef, type PointerEvent } from 'react';

/**
 * Mouse-tracking 3D tilt. Sets --rx/--ry (rotation) and --mx/--my
 * (glare position) CSS variables on the element; pair with the .tilt
 * and .tilt-glare classes in global.css.
 */
export function useTilt<T extends HTMLElement>(maxTilt = 7) {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback(
    (e: PointerEvent<T>) => {
      const el = ref.current;
      if (!el || e.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      el.style.setProperty('--rx', `${((0.5 - py) * maxTilt).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${((px - 0.5) * maxTilt).toFixed(2)}deg`);
      el.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    },
    [maxTilt],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
