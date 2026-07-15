import { useEffect, useState } from 'react';
import type { SkillCategory } from '../types';
import { TechIcon } from './TechIcon';
import './Skills.css';

interface TechGridProps {
  categories: SkillCategory[];
}

export function TechGrid({ categories }: TechGridProps) {
  // One flat grid of logo tiles, like a tech-stack showcase
  const allSkills = categories.flatMap((category) => category.skills.map((s) => s.name));

  // Trigger the flip-in cascade a frame after mount (this panel appears via
  // tab-switch, not scroll, so there's no IntersectionObserver to wait on).
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`tech-grid-wrap reveal ${visible ? 'is-visible' : ''}`}>
      {/* Infinite marquee — list duplicated for a seamless loop */}
      <div className="skills-marquee" aria-hidden="true">
        <div className="skills-marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="skills-marquee-list">
              {allSkills.map((name) => (
                <li key={`${copy}-${name}`}>{name}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <ul className="tech-grid" role="list">
        {allSkills.map((name, index) => (
          <li key={name} className="tech-card" style={{ transitionDelay: `${index * 60}ms` }}>
            <span className="tech-card-halo" aria-hidden="true" />
            <span className="tech-card-icon">
              <TechIcon name={name} size={46} />
            </span>
            <span className="tech-card-name">{name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
