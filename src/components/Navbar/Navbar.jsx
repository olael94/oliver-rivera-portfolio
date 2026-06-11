'use client';

import { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { navLinks as NAV_LINKS } from '@/data/nav';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const NAVBAR_HEIGHT = 88; // matches the fixed header height in globals.css

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [pillStyle, setPillStyle] = useState({});
  const [activeSection, setActiveSection] = useState(NAV_LINKS[0]?.id || 'hero'); // tracks which section is in view
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const linkRefs = useRef({}); // keyed by section id, used to position the sliding pill
  const scrollDestRef = useRef(null); // { id, top } — destination of a click-initiated scroll, locks spy until arrival

  // Close mobile menu when clicking outside the navbar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowLinks(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Detect mobile breakpoint using matchMedia (avoids hydration mismatch)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    setMounted(true);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll-spy: on each scroll event, find the last section whose top edge
  // is above the current scroll position and mark it as active
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      // If we're mid click-scroll, hold the pill on the target.
      // Once scrollY is within 10px of the destination, release the lock.
      if (scrollDestRef.current) {
        if (Math.abs(window.scrollY - scrollDestRef.current.top) < 10) {
          scrollDestRef.current = null; // arrived — resume normal spy
        } else {
          return; // still en route — pill already set on click, do nothing
        }
      }

      const scrollY = window.scrollY + NAVBAR_HEIGHT + 60; // offset so section activates slightly before it hits the top
      let current = NAV_LINKS[0].id;
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount to set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const isActuallyMobile = mounted && isMobile;

  // Close mobile menu when switching between mobile and desktop
  useEffect(() => {
    setShowLinks(false);
  }, [isActuallyMobile]);

  // Reposition the sliding lime pill whenever the active section changes
  useEffect(() => {
    const activeEl = linkRefs.current[activeSection];
    if (!activeEl || !pillRef.current) return;
    const navRect = pillRef.current.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();
    setPillStyle({
      width: elRect.width,
      transform: `translateX(${elRect.left - navRect.left}px)`,
    });
  }, [activeSection, mounted]);

  // Smooth scroll to a section, accounting for the fixed navbar height.
  // If the section doesn't exist (e.g. on /uses), navigate to the homepage with the hash.
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) {
      window.location.href = `/#${id}`;
      return;
    }
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT + 4;
    // Jump pill immediately and lock spy to this target until scrollY arrives within 10px
    setActiveSection(id);
    scrollDestRef.current = { id, top };
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className={`flex items-center justify-between w-full h-full px-5 transition-colors duration-200 ${
        isActuallyMobile && showLinks ? 'bg-white dark:bg-[#212121]' : ''
      }`}
    >
      {/* Desktop: floating pill nav centered in the header */}
      {!isActuallyMobile && (
        <div className="flex-1 flex justify-center">
          <div className="nav-pill" ref={pillRef}>
            {/* Amber sliding background that moves to the active link */}
            <div className="nav-pill-slider" style={pillStyle} />
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                ref={(el) => {
                  linkRefs.current[id] = el;
                }}
                className={`nav-pill-link ${activeSection === id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile: slide-down menu */}
      {isActuallyMobile && (
        <div className={`mobile-menu ${showLinks ? 'open' : ''}`}>
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`mobile-menu-link ${activeSection === id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setShowLinks(false);
                scrollToSection(id);
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {/* Theme switcher — always on the right */}
      <div className="flex-shrink-0 ml-auto flex items-center">
        <ThemeSwitcher inline />
      </div>

      {/* Mobile: hamburger toggle button */}
      {isActuallyMobile && (
        <button
          className="mobile-menu-btn flex items-center justify-center h-9 ml-3"
          onClick={() => setShowLinks(!showLinks)}
          aria-label="Toggle menu"
        >
          <span
            className={`hamburger-icon flex items-center justify-center ${showLinks ? 'open' : ''}`}
          >
            {showLinks ? '✕' : '☰'}
          </span>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
