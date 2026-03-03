'use client';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ProjectCard = ({ logo, name, content, link }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);

  return (
    <div
      data-testid="projectCard"
      className="flex flex-col p-6 rounded-md w-full max-w-[380px] min-w-[380px] gap-3 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(20,184,166,0.4)] dark:text-custom-grey max-md:min-w-[330px] max-md:mx-0"
    >
      <div>
        <div className="flex items-center justify-center w-16 h-16  overflow-hidden">
          <img
            data-testid="projectCardLogo"
            src={logo}
            alt="Project Logo"
            className="mt-1.5 max-w-full"
          />
        </div>
        <h2
          data-testid="projectCardName"
          className="mt-2 text-2xl font-bold text-zinc-700 dark:text-white"
        >
          {name}
        </h2>
      </div>
      <div>
        <p
          data-testid="projectCardContent"
          className="text-base text-zinc-500 dark:text-custom-grey"
        >
          {content}
        </p>
        <a
          data-testid="projectCardLink"
          href={link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center text-base text-zinc-600 no-underline pb-1 border-b border-transparent hover:text-teal-500 hover:border-b-2 hover:border-teal-500 hover:rounded-sm"
        >
          <img src={isDarkMode ? 'LinkDark.png' : 'Link.png'} alt="link" className="w-6 h-6 mr-2" />
          View Project
        </a>
      </div>
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
