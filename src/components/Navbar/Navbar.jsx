'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navbar.css';
import { navLinks as NAV_LINKS } from '@/data/nav';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [pillStyle, setPillStyle] = useState({});
  const pathname = usePathname();
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowLinks(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    setMounted(true);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isActuallyMobile = mounted && isMobile;

  useEffect(() => {
    setShowLinks(false);
  }, [isActuallyMobile]);

  // Update sliding pill position whenever pathname changes
  useEffect(() => {
    const activeEl = linkRefs.current[pathname];
    if (!activeEl || !pillRef.current) return;
    const navRect = pillRef.current.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    setPillStyle({
      width: elRect.width,
      transform: `translateX(${elRect.left - navRect.left}px)`,
    });
  }, [pathname, mounted]);

  return (
    <nav
      ref={navRef}
      className={`flex items-center justify-between w-full h-full px-5 transition-colors duration-200 ${isActuallyMobile && showLinks ? 'bg-white dark:bg-[#0c0a07]' : ''}`}
    >
      {/* Desktop: floating pill (centered) */}
      {!isActuallyMobile && (
        <div className="flex-1 flex justify-center">
          <div className="nav-pill" ref={pillRef}>
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
        </div>
      )}

      {/* Mobile: slide-down menu */}
      {isActuallyMobile && (
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
      )}

      {/* Theme switcher always on the right */}
      <div className="flex-shrink-0 ml-auto flex items-center">
        <ThemeSwitcher inline />
      </div>

      {/* Mobile: hamburger button — rightmost */}
      {isActuallyMobile && (
        <button
          className="mobile-menu-btn flex items-center justify-center h-9 ml-3"
          onClick={() => setShowLinks(!showLinks)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-icon flex items-center justify-center ${showLinks ? 'open' : ''}`}>
            {showLinks ? '✕' : '☰'}
          </span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
