import { useState } from 'react';
import type { Certificate } from '../types';
import { useTilt } from '../hooks/useTilt';
import { Icon } from './icons';
import { Lightbox, type LightboxSlide } from './Lightbox';
import './Certificates.css';

interface CertificateGridProps {
  certificates: Certificate[];
}

function CertificateCard({
  certificate,
  onOpen,
}: {
  certificate: Certificate;
  onOpen?: () => void;
}) {
  const { ref, onPointerMove, onPointerLeave } = useTilt<HTMLElement>(6);

  return (
    <article
      ref={ref}
      className="certificate-card glass-card tilt"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <span className="tilt-glare" aria-hidden="true" />
      {certificate.imageUrl && (
        <button
          type="button"
          className="certificate-photo"
          onClick={onOpen}
          aria-label={`View the ${certificate.title} certificate full size`}
        >
          <img
            src={certificate.imageUrl}
            alt={certificate.imageAlt ?? `${certificate.title} certificate`}
            loading="lazy"
          />
          <span className="certificate-photo-cue" aria-hidden="true">
            <Icon name="expand" size={15} />
            View full size
          </span>
        </button>
      )}
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
  // Only the ones with a photo can be previewed, so the viewer walks that subset
  const slides: LightboxSlide[] = certificates
    .filter((certificate) => certificate.imageUrl)
    .map((certificate) => ({
      src: certificate.imageUrl as string,
      alt: certificate.imageAlt ?? `${certificate.title} certificate`,
      title: certificate.title,
      subtitle: `${certificate.issuer} · ${certificate.date}`,
    }));

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="certificate-grid">
      {certificates.map((certificate) => (
        <CertificateCard
          key={certificate.title}
          certificate={certificate}
          onOpen={
            certificate.imageUrl
              ? () => setOpenIndex(slides.findIndex((slide) => slide.title === certificate.title))
              : undefined
          }
        />
      ))}

      {openIndex !== null && (
        <Lightbox
          slides={slides}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
}
