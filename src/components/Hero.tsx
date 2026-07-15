import { useTypingEffect } from '../hooks/useTypingEffect';
import { useTilt } from '../hooks/useTilt';
import type { IconName, SocialLink } from '../types';
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
  /** Path to the profile photo; empty string shows the placeholder */
  photoUrl?: string;
  socialLinks: SocialLink[];
  stats: HeroStat[];
  /** Path to the downloadable CV/résumé file */
  cvUrl: string;
}

function ProfilePhoto({ name, photoUrl }: { name: string; photoUrl?: string }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLDivElement>(10);

  return (
    <div className="hero-photo-float fade-in fade-in-delay-2">
      <div
        ref={ref}
        className="hero-photo tilt"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {/* Rotating conic gradient ring */}
        <span className="hero-photo-ring" aria-hidden="true" />
        <div className="hero-photo-frame">
          {photoUrl ? (
            <img src={photoUrl} alt={`Portrait of ${name}`} />
          ) : (
            <div className="hero-photo-placeholder" role="img" aria-label="Profile photo placeholder">
              <Icon name="user" size={64} />
              <span>Your photo here</span>
            </div>
          )}
          <span className="tilt-glare" aria-hidden="true" />
        </div>
        {/* Floating accent chips around the photo */}
        <span className="hero-photo-chip hero-photo-chip-1" aria-hidden="true">
          &lt;/&gt;
        </span>
        <span className="hero-photo-chip hero-photo-chip-2" aria-hidden="true">
          ✦
        </span>
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

export function Hero({ greeting, typingPhrases, name, photoUrl, socialLinks, stats, cvUrl }: HeroProps) {
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
            <a href={cvUrl} download="NuonVannsonleng CV.pdf" className="btn">
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

        <ProfilePhoto name={name} photoUrl={photoUrl} />
      </div>

      <HeroStats stats={stats} />
    </section>
  );
}
