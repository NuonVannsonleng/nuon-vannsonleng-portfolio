import { useEffect, useState } from 'react';
import type { NavLink } from '../types';
import { useScrollSpy } from '../hooks/useScrollSpy';
import './Header.css';

interface HeaderProps {
  logoText: string;
  links: NavLink[];
}

export function Header({ logoText, links }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(links.map((link) => link.href.slice(1)));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav" aria-label="Main navigation">
        <a href="#hero" className="nav-logo gradient-text" onClick={() => setMenuOpen(false)}>
          {logoText}
        </a>

        <ul id="primary-nav" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {links.map((link, index) => (
            <li key={link.href} style={{ transitionDelay: menuOpen ? `${index * 60}ms` : '0ms' }}>
              <a
                href={link.href}
                className={link.href.slice(1) === activeId ? 'is-active' : ''}
                aria-current={link.href.slice(1) === activeId ? 'true' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`hamburger ${menuOpen ? 'is-active' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
