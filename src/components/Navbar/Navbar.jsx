'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';
import { useMediaQuery } from 'react-responsive';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/uses', label: 'Uses' },
];

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [pillStyle, setPillStyle] = useState({});
  const pathname = usePathname();
  const navRef = useRef(null);
  const linkRefs = useRef({});

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isActuallyMobile = mounted && isMobile;

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    setShowLinks(false);
  }, [isActuallyMobile]);

  // Update sliding pill position whenever pathname changes
  useEffect(() => {
    const activeEl = linkRefs.current[pathname];
    if (!activeEl || !navRef.current) return;
    const navRect = navRef.current.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    setPillStyle({
      width: elRect.width,
      transform: `translateX(${elRect.left - navRect.left}px)`,
    });
  }, [pathname, mounted]);

  return (
    <nav
      className={`flex items-center justify-center w-full h-full px-5 transition-colors duration-200 ${isActuallyMobile && showLinks ? 'bg-[#0c0a07]' : ''}`}
    >
      {/* Desktop: floating pill */}
      {!isActuallyMobile && (
        <div className="nav-pill" ref={navRef}>
          {/* Sliding background pill */}
          <div className="nav-pill-slider" style={pillStyle} />
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              ref={(el) => {
                linkRefs.current[path] = el;
              }}
              className={`nav-pill-link ${pathname === path ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile: hamburger + slide-down menu */}
      {isActuallyMobile && (
        <>
          <button
            className="mobile-menu-btn"
            onClick={() => setShowLinks(!showLinks)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-icon ${showLinks ? 'open' : ''}`}>
              {showLinks ? '✕' : '☰'}
            </span>
          </button>
          <div className={`mobile-menu ${showLinks ? 'open' : ''}`}>
            {NAV_LINKS.map(({ path, label }) => (
              <Link
                key={path}
                href={path}
                className={`mobile-menu-link ${pathname === path ? 'active' : ''}`}
                onClick={() => setShowLinks(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
