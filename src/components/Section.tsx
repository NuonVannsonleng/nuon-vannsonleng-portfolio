import type { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SectionProps {
  id: string;
  title: string;
  /** Small tracked-out kicker above the title */
  eyebrow?: string;
  /** Use the wider container (near-full-bleed sections like Work) */
  wide?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Shared section shell: semantic <section> with a left-aligned editorial
 * heading, wired to the scroll-reveal hook.
 */
export function Section({ id, title, eyebrow, wide, children, className }: SectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id={id}
      ref={ref}
      className={`section reveal ${isVisible ? 'is-visible' : ''} ${className ?? ''}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className={wide ? 'container-wide' : 'container'}>
        <header className="section-head">
          {eyebrow && <span className="label">{eyebrow}</span>}
          <h2 id={`${id}-heading`} className="section-title">
            {title}
          </h2>
        </header>
        {children}
      </div>
    </section>
  );
}
