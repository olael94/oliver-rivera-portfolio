'use client';

import PropTypes from 'prop-types';

const GlitchPhotoCard = ({ src, alt, name, title, className }) => {
  return (
    <div className={`group relative w-fit max-md:w-full ${className}`}>
      {/* Outer dark frame — tilted at rest, straightens on hover, pivoting from bottom-right */}
      <div
        className="neu-frame relative rounded-2xl p-3 sm:p-4 overflow-hidden aspect-[4/5] w-[420px] max-w-full -rotate-3 group-hover:rotate-0 transition-all duration-500 ease-out"
        style={{ transformOrigin: 'bottom right' }}
      >
        {/* Photo — fixed, centered frame, image zooms in on hover */}
        <div className="absolute inset-3 sm:inset-4 rounded-xl overflow-hidden">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Name + title overlay */}
        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10">
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
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

GlitchPhotoCard.defaultProps = {
  className: '',
};

export default GlitchPhotoCard;
