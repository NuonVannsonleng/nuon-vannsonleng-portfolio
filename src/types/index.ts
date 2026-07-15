/** Names of the inline SVG icons available in components/icons.tsx */
export type IconName =
  | 'lightbulb'
  | 'book'
  | 'target'
  | 'code'
  | 'award'
  | 'stack'
  | 'file'
  | 'lock'
  | 'github'
  | 'linkedin'
  | 'facebook'
  | 'instagram'
  | 'telegram'
  | 'mail'
  | 'external'
  | 'user';

export interface NavLink {
  label: string;
  href: `#${string}`;
}

export interface Highlight {
  icon: IconName;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  organization: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  /** Omit to render the built-in placeholder preview */
  imageUrl?: string;
  imageAlt?: string;
  demoUrl?: string;
  repoUrl?: string;
  /** Shown instead of the GitHub button when the repo isn't public yet */
  repoNote?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: IconName;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description: string;
  /** Omit if there's no public credential page yet */
  credentialUrl?: string;
}
