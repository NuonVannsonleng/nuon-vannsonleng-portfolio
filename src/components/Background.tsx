import { useEffect, useRef } from 'react';
import './Background.css';

interface Star {
  x: number;
  y: number;
  z: number; // depth 0..1 — controls size, speed, parallax
  twinkle: number;
}

/**
 * Site-wide ambient background: aurora gradient blobs (CSS) plus an
 * interactive canvas starfield that drifts and parallaxes with the mouse.
 * Renders a single static frame when reduced motion is preferred.
 */
export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    const mouse = { x: 0.5, y: 0.5 };
    const eased = { x: 0.5, y: 0.5 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(160, Math.floor((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        // Drift upward; deeper stars move slower and parallax less
        s.y -= 0.06 + s.z * 0.18;
        if (s.y < -4) {
          s.y = height + 4;
          s.x = Math.random() * width;
        }
        const px = (eased.x - 0.5) * 40 * s.z;
        const py = (eased.y - 0.5) * 24 * s.z;
        const alpha = 0.08 + s.z * 0.22 + Math.sin(t / 900 + s.twinkle) * 0.06;
        const size = 0.4 + s.z * 1.4;
        ctx.beginPath();
        ctx.arc(s.x + px, s.y + py, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(22, 58, 92, ${Math.max(0.04, alpha)})`;
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      eased.x += (mouse.x - eased.x) * 0.05;
      eased.y += (mouse.y - eased.y) * 0.05;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX / width;
      mouse.y = e.clientY / height;
    };

    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion) {
      draw(0); // single static frame
    } else {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return (
    <div className="site-background" aria-hidden="true">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <canvas ref={canvasRef} className="starfield" />
    </div>
  );
}
