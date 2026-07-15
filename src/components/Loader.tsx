import { useEffect, useState } from 'react';
import './Loader.css';

interface LoaderProps {
  name: string;
  onDone: () => void;
}

/** Welcome screen: name reveal + progress bar, then slides away. */
export function Loader({ name, onDone }: LoaderProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onDone();
      return;
    }
    const exitTimer = window.setTimeout(() => setLeaving(true), 1700);
    const doneTimer = window.setTimeout(onDone, 2350);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`loader ${leaving ? 'loader-leaving' : ''}`} role="status" aria-label="Loading portfolio">
      <p className="loader-kicker">Welcome to</p>
      <p className="loader-name gradient-text">{name}</p>
      <div className="loader-bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
