import type { CSSProperties } from 'react';
import type { IconName, ThemeMode } from '../types';
import { Icon } from './icons';
import './ThemeToggle.css';

interface ThemeToggleProps {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}

const OPTIONS: { mode: ThemeMode; icon: IconName; label: string }[] = [
  { mode: 'light', icon: 'sun', label: 'Light' },
  { mode: 'dark', icon: 'moon', label: 'Dark' },
  { mode: 'system', icon: 'monitor', label: 'System' },
];

/** Segmented light / dark / system switch with a sliding thumb */
export function ThemeToggle({ mode, onChange }: ThemeToggleProps) {
  const activeIndex = OPTIONS.findIndex((option) => option.mode === mode);

  return (
    <div className="theme-toggle" role="group" aria-label="Colour theme">
      <span
        className="theme-toggle-thumb"
        style={{ '--thumb-index': activeIndex } as CSSProperties}
        aria-hidden="true"
      />
      {OPTIONS.map((option) => (
        <button
          key={option.mode}
          type="button"
          className={`theme-toggle-btn ${option.mode === mode ? 'is-active' : ''}`}
          onClick={() => onChange(option.mode)}
          aria-pressed={option.mode === mode}
          aria-label={`${option.label} theme`}
          title={`${option.label} theme`}
        >
          <Icon name={option.icon} size={15} />
        </button>
      ))}
    </div>
  );
}
