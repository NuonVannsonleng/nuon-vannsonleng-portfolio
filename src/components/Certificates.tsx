import type { Certificate } from '../types';
import { useTilt } from '../hooks/useTilt';
import { Icon } from './icons';
import './Certificates.css';

interface CertificateGridProps {
  certificates: Certificate[];
}

function CertificateCard({ certificate }: { certificate: Certificate }) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLElement>(6);

  return (
    <article
      ref={ref}
      className="certificate-card glass-card tilt"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="tilt-glare" aria-hidden="true" />
      <span className="certificate-badge" aria-hidden="true">
        <Icon name="award" size={26} />
      </span>
      <span className="certificate-date">{certificate.date}</span>
      <h3>{certificate.title}</h3>
      <p className="certificate-issuer">{certificate.issuer}</p>
      <p className="certificate-description">{certificate.description}</p>
      {certificate.credentialUrl && (
        <a
          href={certificate.credentialUrl}
          className="btn btn-sm btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View credential for ${certificate.title}`}
        >
          <Icon name="external" size={14} />
          View Credential
        </a>
      )}
    </article>
  );
}

export function CertificateGrid({ certificates }: CertificateGridProps) {
  return (
    <div className="certificate-grid">
      {certificates.map((certificate) => (
        <CertificateCard key={certificate.title} certificate={certificate} />
      ))}
    </div>
  );
}
