import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Certificate, IconName, Project, SkillCategory } from '../types';
import { Section } from './Section';
import { ProjectGrid } from './Projects';
import { CertificateGrid } from './Certificates';
import { TechGrid } from './Skills';
import { Icon } from './icons';
import './PortfolioShowcase.css';

interface PortfolioShowcaseProps {
  projects: Project[];
  certificates: Certificate[];
  skillCategories: SkillCategory[];
}

type TabId = 'projects' | 'certificates' | 'techstack';

const tabs: { id: TabId; label: string; icon: IconName }[] = [
  { id: 'projects', label: 'Projects', icon: 'code' },
  { id: 'certificates', label: 'Certificates', icon: 'award' },
  { id: 'techstack', label: 'Tech Stack', icon: 'stack' },
];

/** Segmented tab bar with a pill indicator that slides to the active tab. */
function TabBar({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const measure = () => {
    const container = containerRef.current;
    const btn = buttonRefs.current[active];
    if (!container || !btn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setIndicator({ left: btnRect.left - containerRect.left, width: btnRect.width });
  };

  useLayoutEffect(measure, [active]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="showcase-tabs" ref={containerRef} role="tablist" aria-label="Portfolio sections">
      <span
        className="showcase-tab-indicator"
        aria-hidden="true"
        style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(el) => {
            buttonRefs.current[tab.id] = el;
          }}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`showcase-tab ${active === tab.id ? 'is-active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <Icon name={tab.icon} size={18} />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export function PortfolioShowcase({ projects, certificates, skillCategories }: PortfolioShowcaseProps) {
  const [active, setActive] = useState<TabId>('projects');

  return (
    <Section id="projects" title="Portfolio Showcase" eyebrow="My Work">
      <p className="showcase-subtitle">
        Explore my journey through projects, certificates, and technical expertise. Each section
        represents a milestone in my continuous learning path.
      </p>

      <TabBar active={active} onChange={setActive} />

      <div key={active} className="showcase-panel" role="tabpanel">
        {active === 'projects' && <ProjectGrid projects={projects} />}
        {active === 'certificates' && <CertificateGrid certificates={certificates} />}
        {active === 'techstack' && <TechGrid categories={skillCategories} />}
      </div>
    </Section>
  );
}
