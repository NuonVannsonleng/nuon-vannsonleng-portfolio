import type { IconType } from 'react-icons';
import {
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

interface TechIconDef {
  Icon: IconType;
  /** Official brand color */
  color: string;
}

/** Skill name → brand logo. Add entries here when you add new skills. */
const techIcons: Record<string, TechIconDef> = {
  HTML5: { Icon: SiHtml5, color: '#E34F26' },
  CSS3: { Icon: SiCss, color: '#663399' },
  JavaScript: { Icon: SiJavascript, color: '#F7DF1E' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6' },
  React: { Icon: SiReact, color: '#61DAFB' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  Python: { Icon: SiPython, color: '#3776AB' },
  SQL: { Icon: SiMysql, color: '#4479A1' },
  Git: { Icon: SiGit, color: '#F05032' },
  GitHub: { Icon: SiGithub, color: '#161b22' },
  Figma: { Icon: SiFigma, color: '#F24E1E' },
  Vite: { Icon: SiVite, color: '#646CFF' },
};

interface TechIconProps {
  name: string;
  size?: number;
}

/** Brand logo for a skill; falls back to a gradient dot for unknown names. */
export function TechIcon({ name, size = 18 }: TechIconProps) {
  const def = techIcons[name];
  if (!def) {
    return <span className="skill-dot" aria-hidden="true" />;
  }
  return <def.Icon size={size} color={def.color} aria-hidden="true" />;
}
