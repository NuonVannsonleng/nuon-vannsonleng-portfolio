import './Footer.css';

interface FooterProps {
  name: string;
  tagline: string;
}

export function Footer({ name, tagline }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <p className="footer-tagline">{tagline}</p>
      </div>
    </footer>
  );
}
