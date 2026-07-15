import type { Project } from '../types';
import { useTilt } from '../hooks/useTilt';
import { Icon } from './icons';
import './Projects.css';

interface ProjectGridProps {
  projects: Project[];
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <img
        src={project.imageUrl}
        alt={project.imageAlt ?? `Screenshot of ${project.title}`}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="project-placeholder"
      role="img"
      aria-label={`Preview of ${project.title} coming soon`}
    >
      <Icon name="code" size={30} />
      <span>Preview coming soon</span>
    </div>
  );
}

/** Glass card with mouse-tracking 3D tilt + glare */
function ProjectCard({ project }: { project: Project }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLElement>(6);

  return (
    <article
      ref={ref}
      className="project-card glass-card tilt"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="tilt-glare" aria-hidden="true" />
      <div className="project-media">
        <ProjectMedia project={project} />
      </div>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="project-stack" role="list" aria-label="Technologies used">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="project-links">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            className="btn btn-sm"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Live demo of ${project.title}`}
          >
            <Icon name="external" size={14} />
            Live Demo
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            className="btn btn-sm btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub repository for ${project.title}`}
          >
            <Icon name="github" size={14} />
            GitHub
          </a>
        )}
        {!project.repoUrl && project.repoNote && (
          <span className="project-repo-note" role="note">
            <Icon name="lock" size={13} />
            {project.repoNote}
          </span>
        )}
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
