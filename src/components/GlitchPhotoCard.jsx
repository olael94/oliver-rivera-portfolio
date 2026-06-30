'use client';

import PropTypes from 'prop-types';

const maskGradients = [
  'linear-gradient(to bottom, transparent 0%, black 14%, black 72%, transparent 100%)',
  'linear-gradient(to right,  transparent 0%, black 28%, black 88%, transparent 100%)',
].join(', ');

const GlitchPhotoCard = ({ alt, name, title, className }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <style>{`
        .photo-card-img {
          filter: grayscale(100%);
          transform: scale(1);
          transition: filter 0.5s ease, transform 0.5s ease;
        }
        .photo-card-wrapper:hover .photo-card-img {
          filter: grayscale(0%);
          transform: scale(1.05);
        }
        .photo-card-glow {
          position: absolute;
          inset: -10% -15%;
          background: radial-gradient(ellipse at 50% 65%, rgba(59,130,246,0.7) 0%, rgba(29,78,216,0.4) 35%, transparent 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 0;
          filter: blur(32px);
        }
        .photo-card-wrapper:hover .photo-card-glow {
          opacity: 1;
        }
      `}</style>

      <div className="photo-card-wrapper relative aspect-[4/5] w-[420px] max-w-full">
        <div className="photo-card-glow" />
        <img
          src="/images/Me-cutout.png"
          alt={alt}
          className="photo-card-img absolute left-1/2 bottom-0 w-[105%] max-w-none -translate-x-1/2 translate-y-[0%] origin-bottom"
          style={{
            maskImage: maskGradients,
            maskComposite: 'intersect',
            WebkitMaskImage: maskGradients,
            WebkitMaskComposite: 'source-in',
          }}
        />

        <div className="absolute bottom-6 left-2 sm:bottom-8 sm:left-4 z-10">
          <h3
            className="text-white font-bold text-2xl sm:text-3xl tracking-tight"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {name}
          </h3>
          <p className="text-lime-400 font-semibold text-xs sm:text-sm uppercase tracking-[0.15em] mt-1">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

GlitchPhotoCard.propTypes = {
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

GlitchPhotoCard.defaultProps = {
  className: '',
};

export default GlitchPhotoCard;
