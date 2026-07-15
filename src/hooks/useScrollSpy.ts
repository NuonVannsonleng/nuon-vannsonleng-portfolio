import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently under a fixed offset near the top
 * of the viewport, so nav links can highlight as the user scrolls past
 * each section (not just on hover).
 */
export function useScrollSpy(ids: string[], offset = 160): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    if (ids.length === 0) return;
    let raf = 0;

    const update = () => {
      let current = activeId;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(','), offset]);

  return activeId;
}
