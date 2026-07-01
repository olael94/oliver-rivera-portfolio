'use client';

import PropTypes from 'prop-types';

const ProjectCard = ({ logo, preview, name, content, link, github }) => {
  return (
    <div
      data-testid="projectCard"
      className="card-modern group flex flex-col rounded-3xl overflow-hidden w-full max-w-[400px] h-[520px] md:w-[380px] md:min-w-[380px] md:max-w-[380px]"
    >
      {/* Preview image — links to the live site if one is available */}
      {preview &&
        (link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${name} live site`}
            className="aspect-[16/10] block overflow-hidden"
          >
            <img
              data-testid="projectCardPreview"
              src={preview}
              alt={`${name} preview`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </a>
        ) : (
          <div className="aspect-[16/10] overflow-hidden">
            <img
              data-testid="projectCardPreview"
              src={preview}
              alt={`${name} preview`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

      {/* Body */}
      <div className="flex flex-col p-6 gap-4 flex-1">
        {/* Logo */}
        {!preview && (
          <div className="neu-icon w-12 h-12 rounded-2xl flex items-center justify-center">
            <img
              data-testid="projectCardLogo"
              src={logo}
              alt="Project Logo"
              className="w-7 h-7 object-contain"
            />
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col gap-2 flex-1">
          <h2
            data-testid="projectCardName"
            className="text-lg font-bold text-zinc-800 dark:text-zinc-100 tracking-tight group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-200"
            style={{ fontFamily: 'var(--font-quicksand)' }}
          >
            {name}
          </h2>
          <p
            data-testid="projectCardContent"
            className="text-[17px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-4"
          >
            {content}
          </p>
        </div>

        {/* Buttons */}
        {(link || github) && (
          <div className="flex items-center gap-3 mt-auto pt-1 flex-wrap">
            {link && (
              <a
                data-testid="projectCardLink"
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-lime-500 hover:text-lime-600 dark:hover:text-lime-300 transition-colors"
              >
                Live Site
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="translate-y-px"
                >
                  <path
                    d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
            {link && github && (
              <span className="w-px h-3.5 bg-zinc-300 dark:bg-zinc-700 self-center" />
            )}
            {github && (
              <a
                data-testid="projectCardGithubLink"
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-translate-y-px"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Source Code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  logo: PropTypes.string.isRequired,
  preview: PropTypes.string,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
  github: PropTypes.string,
};
export default ProjectCard;
