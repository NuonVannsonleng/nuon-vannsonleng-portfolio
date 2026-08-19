import { useTypingEffect } from '../hooks/useTypingEffect';
import { useTilt } from '../hooks/useTilt';
import type { HeroTag, IconName, SocialLink } from '../types';
import { Icon } from './icons';
import './Hero.css';

export interface HeroStat {
  icon: IconName;
  value: number;
  label: string;
  sublabel: string;
}

interface HeroProps {
  greeting: string;
  typingPhrases: string[];
  /** Real name, used for the photo's alt text */
  name: string;
  /** Short line above the name on the profile card */
  role: string;
  /** Path to the profile photo; empty string shows the placeholder */
  photoUrl?: string;
  /** Fact chips in the strip under the photo */
  tags: HeroTag[];
  socialLinks: SocialLink[];
  stats: HeroStat[];
  /** Path to the downloadable CV/résumé file */
  cvUrl: string;
}

const CV_FILENAME = 'NuonVannsonleng CV.pdf';

/**
 * Fetches the CV and saves it via a blob URL so the browser always uses
 * our filename — a plain anchor `download` attribute can get overridden
 * by the host's response headers on some browsers.
 */
async function downloadCv(cvUrl: string) {
  try {
    const response = await fetch(cvUrl);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = CV_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch {
    window.open(cvUrl, '_blank');
  }
}

function ProfileCard({
  name,
  role,
  photoUrl,
  tags,
}: {
  name: string;
  role: string;
  photoUrl?: string;
  tags: HeroTag[];
}) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>(9);

  return (
    <div className="hero-card-float fade-in fade-in-delay-2">
      {/* Soft bloom behind the card */}
      <span className="hero-card-aura" aria-hidden="true" />

      <div
        ref={ref}
        className="hero-card tilt"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {/* Corner brackets that push outwards on hover */}
        <span className="hero-card-corner hero-card-corner-tl" aria-hidden="true" />
        <span className="hero-card-corner hero-card-corner-tr" aria-hidden="true" />
        <span className="hero-card-corner hero-card-corner-bl" aria-hidden="true" />
        <span className="hero-card-corner hero-card-corner-br" aria-hidden="true" />

        <div className="hero-card-photo">
          {photoUrl ? (
            <img src={photoUrl} alt={`Portrait of ${name}`} />
          ) : (
            <div
              className="hero-card-placeholder"
              role="img"
              aria-label="Profile photo placeholder"
            >
              <Icon name="user" size={56} />
              <span>Your photo here</span>
            </div>
          )}

          <span className="hero-card-veil" aria-hidden="true" />
          <span className="hero-card-sheen" aria-hidden="true" />
          <span className="tilt-glare" aria-hidden="true" />

          <div className="hero-card-caption">
            <p className="hero-card-eyebrow">{role}</p>
            <p className="hero-card-name">{name}</p>
            <span className="hero-card-underline" aria-hidden="true" />
          </div>
        </div>

        <ul className="hero-card-tags">
          {tags.map((tag) => (
            <li key={tag.label} className="hero-card-tag">
              <strong className="hero-card-tag-value">{tag.value}</strong>
              <span className="hero-card-tag-label">{tag.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HeroStats({ stats }: { stats: HeroStat[] }) {
  return (
    <div className="hero-stats fade-in fade-in-delay-3">
      {stats.map((stat) => (
        <a key={stat.label} href="#projects" className="hero-stat-card">
          <div className="hero-stat-top">
            <span className="hero-stat-icon" aria-hidden="true">
              <Icon name={stat.icon} size={20} />
            </span>
            <span className="hero-stat-value">{stat.value}</span>
          </div>
          <span className="hero-stat-label">{stat.label}</span>
          <span className="hero-stat-sub">{stat.sublabel}</span>
          <Icon name="external" size={14} className="hero-stat-arrow" />
        </a>
      ))}
    </div>
  );
}

export function Hero({
  greeting,
  typingPhrases,
  name,
  role,
  photoUrl,
  tags,
  socialLinks,
  stats,
  cvUrl,
}: HeroProps) {
  const typedText = useTypingEffect(typingPhrases);

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-badge fade-in">
            <span className="hero-badge-dot" aria-hidden="true" />
            Open to opportunities
          </p>

          <h1 className="hero-title fade-in fade-in-delay-1">
            <span className="gradient-text">{greeting}</span>
          </h1>

          <p className="hero-tagline fade-in fade-in-delay-2">
            A{' '}
            <span className="typing-text" aria-live="polite">
              {typedText}
            </span>
          </p>

          <div className="hero-buttons fade-in fade-in-delay-3">
            <a
              href={cvUrl}
              className="btn"
              onClick={(e) => {
                e.preventDefault();
                void downloadCv(cvUrl);
              }}
            >
              <Icon name="file" size={16} />
              Download CV
            </a>
            <a href="#projects" className="btn btn-secondary">
              View Projects
            </a>
          </div>

          <ul className="hero-socials fade-in fade-in-delay-3" aria-label="Social links">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  className="hero-social-link"
                  aria-label={link.label}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  <Icon name={link.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ProfileCard name={name} role={role} photoUrl={photoUrl} tags={tags} />
      </div>

      <HeroStats stats={stats} />
    </section>
  );
}
