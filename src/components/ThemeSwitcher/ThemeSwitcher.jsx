'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeSwitcher = ({ darkClassName = 'dark' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  useEffect(() => {
    document.body.classList.toggle(darkClassName, isDarkMode);
  }, [isDarkMode, darkClassName]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <button
        data-testid="themeSwitcherButton"
        onClick={() => setIsDarkMode((prev) => !prev)}
        className="fixed top-[14px] right-[20px] h-9 w-9 rounded-xl p-0 cursor-pointer flex items-center justify-center bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/60 hover:border-amber-400 dark:hover:border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.15)] dark:shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:shadow-[0_0_14px_rgba(245,158,11,0.3)] transition-all duration-200 md:top-[16px] md:right-[52px]"
      >
        <img
          src={isDarkMode ? 'sunIcon.png' : 'Moon.png'}
          alt="Toggle theme"
          className="w-4 h-4 object-contain"
          style={{
            filter: 'invert(65%) sepia(80%) saturate(600%) hue-rotate(5deg) brightness(105%)',
          }}
        />
      </button>
    </div>
  );
};

ThemeSwitcher.propTypes = { darkClassName: PropTypes.string };
export default ThemeSwitcher;
