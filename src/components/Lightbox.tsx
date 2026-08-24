import { useCallback, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './icons';
import './Lightbox.css';

export interface LightboxSlide {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
}

interface LightboxProps {
  slides: LightboxSlide[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Kept in step with the closing animation in Lightbox.css */
const CLOSE_MS = 260;

/**
 * Fullscreen image viewer. Portalled to <body> because the certificate grid
 * sets `perspective`, which would otherwise become the containing block for
 * anything positioned fixed inside it.
 */
export function Lightbox({ slides, index, onIndexChange, onClose }: LightboxProps) {
  const [closing, setClosing] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const slide = slides[index];

  const dismiss = useCallback(() => {
    setClosing(true);
    window.setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  const step = useCallback(
    (delta: number) => {
      setZoom(null);
      onIndexChange((index + delta + slides.length) % slides.length);
    },
    [index, slides.length, onIndexChange],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
      if (slides.length < 2) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [dismiss, step, slides.length]);

  // Freeze the page behind the overlay, and hand focus over and back
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, []);

  /** Zoom towards the point that was clicked, then pan by following the mouse */
  const pointToOrigin = (e: MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    };
  };

  if (!slide) return null;

  return createPortal(
    <div
      className={`lightbox ${closing ? 'is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${slide.title} — full size`}
      onClick={dismiss}
    >
      <span className="lightbox-backdrop" aria-hidden="true" />

      <button
        ref={closeRef}
        type="button"
        className="lightbox-close"
        onClick={dismiss}
        aria-label="Close preview"
      >
        <Icon name="close" size={18} />
      </button>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-nav lightbox-nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous certificate"
          >
            <Icon name="chevron-left" size={20} />
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-nav-next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next certificate"
          >
            <Icon name="chevron-right" size={20} />
          </button>
        </>
      )}

      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-stage">
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`lightbox-image ${zoom ? 'is-zoomed' : ''}`}
            style={
              zoom ? ({ transformOrigin: `${zoom.x}% ${zoom.y}%` } as CSSProperties) : undefined
            }
            onClick={(e) => setZoom(zoom ? null : pointToOrigin(e))}
            onMouseMove={(e) => zoom && setZoom(pointToOrigin(e))}
          />
        </div>

        <figcaption className="lightbox-caption">
          <strong>{slide.title}</strong>
          {slide.subtitle && <span>{slide.subtitle}</span>}
          <span className="lightbox-hint">
            <Icon name="expand" size={13} />
            {zoom ? 'Click to zoom out' : 'Click the image to zoom in'}
            {slides.length > 1 && ' · ← → to browse'}
          </span>
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}
