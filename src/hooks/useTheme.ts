import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '../types';

const STORAGE_KEY = 'theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Page background per theme, mirrored into <meta name="theme-color"> */
const THEME_COLOR: Record<'light' | 'dark', string> = {
  light: '#f7f5ef',
  dark: '#0a1725',
};

function storedMode(): ThemeMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
  } catch {
    /* private mode / storage blocked — fall through to the default */
  }
  return 'system';
}

/**
 * Three-way theme control: light, dark, or follow the OS.
 *
 * `mode` is what the user picked and what gets persisted; `resolved` is the
 * palette actually on screen, which is what `<html data-theme>` carries.
 * The matching first-paint script lives in index.html so the page never
 * flashes the wrong theme before React boots.
 */
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(storedMode);
  const [systemIsDark, setSystemIsDark] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DARK_QUERY).matches,
  );

  // Follow the OS while it is the active source of truth
  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const onChange = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const resolved: 'light' | 'dark' = mode === 'system' ? (systemIsDark ? 'dark' : 'light') : mode;

  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLOR[resolved]);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* not fatal — the theme just won't survive a reload */
    }
  }, [mode, resolved]);

  const setTheme = useCallback((next: ThemeMode) => setMode(next), []);

  return { mode, resolved, setTheme };
}
