'use client';

import PropTypes from 'prop-types';

const ProjectCard = ({ logo, name, content, link }) => {
  return (
    <div
      data-testid="projectCard"
      className="card-modern flex flex-col p-6 rounded-3xl w-full max-w-[380px] min-w-[380px] gap-4 max-md:min-w-[330px] max-md:mx-0"
    >
      {/* Logo */}
      <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center ring-1 ring-amber-200/60 dark:ring-amber-700/30">
        <img
          data-testid="projectCardLogo"
          src={logo}
          alt="Project Logo"
          className="w-7 h-7 object-contain"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h2
          data-testid="projectCardName"
          className="text-lg font-bold text-zinc-800 dark:text-zinc-100 tracking-tight"
        >
          {name}
        </h2>
        <p
          data-testid="projectCardContent"
          className="text-[17px] text-zinc-500 dark:text-zinc-400 leading-relaxed"
        >
          {content}
        </p>
      </div>

      {/* Link */}
      <a
        data-testid="projectCardLink"
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-500 hover:text-amber-600 dark:hover:text-amber-300 transition-colors mt-auto"
      >
        View Project
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="translate-y-px">
          <path
            d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
};

ProjectCard.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
};
ProjectCard.defaultProps = { link: '#' };
export default ProjectCard;
