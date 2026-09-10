import { useEffect, useRef, useState } from 'react';

/**
 * Observes the returned ref with an IntersectionObserver and flips
 * `isVisible` to true the first time it enters the viewport.
 *
 * Deliberately uses `threshold: 0` with a negative bottom margin rather than
 * a visibility ratio: a ratio is measured against the element's own height,
 * so a section taller than the viewport can never reach it. On a phone the
 * Work section stacks into one column several thousand pixels tall, which
 * capped its ratio near 0.08 — under any meaningful threshold, leaving the
 * whole section stuck at opacity 0. Margin-based triggering is independent
 * of how tall the element grows.
 */
export function useScrollReveal<T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isVisible };
}
