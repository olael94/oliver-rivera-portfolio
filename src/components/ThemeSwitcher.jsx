'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeSwitcher = ({ darkClassName = 'dark', inline = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    document.body.classList.toggle(darkClassName, isDarkMode);
  }, [isDarkMode, darkClassName]);

  const positionClass = inline
    ? ''
    : 'fixed top-[14px] right-[64px] md:top-[16px] md:right-[52px]';

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <button
        data-testid="themeSwitcherButton"
        onClick={() => setIsDarkMode((prev) => !prev)}
        aria-label="Toggle theme"
        className={`${positionClass} theme-toggle p-0 border-none cursor-pointer`}
      >
        <span className="theme-toggle-indicator" />
        <span className="theme-toggle-thumb">
          <img
            src={isDarkMode ? '/icons/sunIcon.png' : '/icons/moonIcon.png'}
            alt=""
            className="w-3.5 h-3.5 object-contain"
            style={{
              filter: isDarkMode
                ? 'invert(70%) sepia(55%) saturate(900%) hue-rotate(50deg) brightness(100%)'
                : 'invert(45%) sepia(15%) saturate(300%) hue-rotate(190deg) brightness(95%)',
            }}
          />
        </span>
      </button>
    </div>
  );
};

ThemeSwitcher.propTypes = { darkClassName: PropTypes.string, inline: PropTypes.bool };
export default ThemeSwitcher;
