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
        className="fixed top-[16px] right-[70px] h-8 w-8 rounded-full p-0 cursor-pointer bg-white border border-zinc-300 shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:bg-zinc-200 dark:shadow-[0_0_10px_rgba(20,184,166,1)] md:top-[16px] md:right-[52px]"
      >
        <img
          src={isDarkMode ? 'Moon.png' : 'sunIcon.png'}
          alt="Toggle theme"
          className={isDarkMode ? 'w-5 h-5 ml-1.5' : 'w-[25px] h-[25px] ml-[3px]'}
        />
      </button>
    </div>
  );
};

ThemeSwitcher.propTypes = { darkClassName: PropTypes.string };
export default ThemeSwitcher;
