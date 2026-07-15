import type { TimelineEntry } from '../types';
import { Section } from './Section';
import './Experience.css';

interface ExperienceProps {
  entries: TimelineEntry[];
}

export function Experience({ entries }: ExperienceProps) {
  return (
    <Section id="experience" title="Experience & Education" eyebrow="Journey">
      <ol className="timeline" role="list">
        {entries.map((entry, index) => (
          <li
            key={`${entry.period}-${entry.title}`}
            className={`timeline-item ${index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'}`}
          >
            <span className="timeline-dot" aria-hidden="true" />
            <article className="timeline-content glass-card">
              <span className="timeline-date">{entry.period}</span>
              <h3>{entry.title}</h3>
              <p className="timeline-org">{entry.organization}</p>
              <p>{entry.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
