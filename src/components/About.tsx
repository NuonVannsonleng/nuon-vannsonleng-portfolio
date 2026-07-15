import type { Highlight } from '../types';
import { Icon } from './icons';
import { Section } from './Section';
import './About.css';

interface AboutProps {
  intro: string;
  highlights: Highlight[];
}

export function About({ intro, highlights }: AboutProps) {
  return (
    <Section id="about" title="About Me" eyebrow="Introduction">
      <div className="about-content">
        <p className="about-text">{intro}</p>
        <div className="about-highlights">
          {highlights.map((highlight) => (
            <article key={highlight.title} className="highlight-card glass-card">
              <span className="highlight-icon" aria-hidden="true">
                <Icon name={highlight.icon} size={22} />
              </span>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
