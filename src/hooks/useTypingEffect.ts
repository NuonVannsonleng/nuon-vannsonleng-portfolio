import { useEffect, useState } from 'react';

interface TypingOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterTyped?: number;
}

/**
 * Cycles through `phrases`, typing then deleting each one.
 * Returns the current visible text.
 */
export function useTypingEffect(
  phrases: readonly string[],
  { typeSpeed = 150, deleteSpeed = 75, pauseAfterTyped = 2000 }: TypingOptions = {},
): string {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (phrases.length === 0) return;
    const phrase = phrases[phraseIndex % phrases.length];

    let delay: number;
    if (!isDeleting && text === phrase) {
      delay = pauseAfterTyped;
    } else {
      delay = isDeleting ? deleteSpeed : typeSpeed;
    }

    const timeout = window.setTimeout(() => {
      if (!isDeleting && text === phrase) {
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      } else {
        setText(phrase.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseAfterTyped]);

  return text;
}
