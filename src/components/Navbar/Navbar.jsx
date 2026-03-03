'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Navbar.css';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isActuallyMobile = mounted && isMobile;

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setShowLinks(false);
  }, [isActuallyMobile]);

  return (
    <nav>
      <div className="relative flex flex-col justify-center w-full min-h-16 bg-[rgba(244,245,245,0.9)] backdrop-blur-sm px-5 mx-auto dark:bg-[rgba(51,51,51,0.975)]">
        {isActuallyMobile && (
          <div
            className={`menu-toggle-container dark:text-white ${showLinks ? 'open' : ''}`}
            onClick={() => setShowLinks(!showLinks)}
          >
            <span>{showLinks ? '✕' : '☰'}</span>
          </div>
        )}

        <ul
          className={`nav-menu ${isActuallyMobile ? (showLinks ? 'open' : '') : 'open'} list-none p-0 flex justify-center w-full`}
        >
          <div
            className={`flex w-full ${isActuallyMobile ? 'flex-col items-start text-[28px] pt-14' : 'flex-row justify-center'}`}
          >
            {['/', '/about', '/projects', '/uses'].map((path, i) => {
              const label = ['Home', 'About', 'Projects', 'Uses'][i];
              return (
                <li key={path} className={isActuallyMobile ? 'mb-2.5' : 'mx-3.5 text-center'}>
                  <Link
                    href={path}
                    className={`nav-link-container flex justify-center items-center no-underline dark:text-white ${activeLink === path ? 'active' : ''}`}
                    onClick={() => {
                      setShowLinks(false);
                      setActiveLink(path);
                    }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
