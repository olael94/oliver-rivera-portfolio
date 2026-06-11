'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import PropTypes from 'prop-types';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const DESKTOP_QUERY = '(min-width: 1024px) and (min-height: 600px)';
const NAVBAR_HEIGHT = 88; // matches the fixed header height in globals.css

// Pins the projects section while the user scrolls vertically, translating the
// card track horizontally to "scroll through" each project. Once the track is
// fully revealed, normal vertical scrolling continues. Falls back to a plain
// stacked layout on small screens.
const HorizontalProjects = ({ header }) => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [sectionHeight, setSectionHeight] = useState('100vh');
  const distanceRef = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const updateMatch = () => setIsDesktop(mql.matches);
    updateMatch();
    mql.addEventListener('change', updateMatch);
    return () => mql.removeEventListener('change', updateMatch);
  }, []);

  useEffect(() => {
    if (!isDesktop) return undefined;

    const measure = () => {
      const trackWidth = trackRef.current?.scrollWidth ?? 0;
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const remaining = Math.max(trackWidth - viewportWidth, 0);
      distanceRef.current = remaining;
      setSectionHeight(`${window.innerHeight - NAVBAR_HEIGHT + remaining}px`);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, (latest) => latest * -distanceRef.current);

  return (
    <div
      ref={sectionRef}
      style={isDesktop ? { height: sectionHeight } : undefined}
      className="relative shrink-0"
    >
      <div
        ref={viewportRef}
        className={
          isDesktop
            ? 'sticky top-[88px] h-[calc(100vh-88px)] flex flex-col overflow-hidden'
            : 'flex flex-col'
        }
      >
        {header}

        <div
          className={
            isDesktop
              ? 'flex-1 flex items-start overflow-hidden'
              : 'flex flex-col items-center gap-4'
          }
        >
          <motion.div
            ref={trackRef}
            style={isDesktop ? { x } : undefined}
            className={isDesktop ? 'flex flex-row gap-4 w-max' : 'contents'}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                logo={project.logo}
                preview={project.preview}
                name={project.name}
                content={project.content}
                link={project.link}
                github={project.github}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

HorizontalProjects.propTypes = {
  header: PropTypes.node,
};

export default HorizontalProjects;
