import { useState, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import type { SocialLink } from '../types';
import { Icon } from './icons';
import { Section } from './Section';
import './Contact.css';

interface ContactProps {
  socialLinks: SocialLink[];
}

interface FormValues {
  name: string;
  email: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }
  return errors;
}

export function Contact({ socialLinks }: ContactProps) {
  const [values, setValues] = useState<FormValues>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  // Honeypot: hidden from people, but naive bots fill every field
  const [website, setWebsite] = useState('');

  const handleChange = (field: keyof FormValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear the field's error as soon as the user starts fixing it
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      return;
    }

    // Pretend success for bots so they don't retry
    if (website) {
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
      return;
    }

    if (!supabase) {
      console.error('Contact form: VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY are not set.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    });

    if (error) {
      console.error('Contact form:', error);
      setStatus('error');
      return;
    }
    setStatus('success');
    setValues({ name: '', email: '', message: '' });
  };

  return (
    <Section id="contact" title="Get In Touch" eyebrow="Contact" className="contact-section">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="contact-name" className="visually-hidden">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="Your Name"
            value={values.name}
            onChange={(e) => handleChange('name')(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <p id="contact-name-error" className="field-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contact-email" className="visually-hidden">
            Your Email
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="Your Email"
            value={values.email}
            onChange={(e) => handleChange('email')(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <p id="contact-email-error" className="field-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="contact-message" className="visually-hidden">
            Your Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            placeholder="Your Message"
            value={values.message}
            onChange={(e) => handleChange('message')(e.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
          {errors.message && (
            <p id="contact-message-error" className="field-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className="form-honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="form-status success" role="status">
            Thank you for your message! I&apos;ll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="form-status error" role="alert">
            Sorry, your message couldn&apos;t be sent. Please try again, or reach me through
            the links below.
          </p>
        )}
      </form>

      <ul className="social-links" role="list" aria-label="Social profiles">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
            >
              <Icon name={link.icon} size={17} />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
