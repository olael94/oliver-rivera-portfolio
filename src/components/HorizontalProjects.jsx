'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import PropTypes from 'prop-types';
import FadeInView from './FadeInView';
import ProjectCard from './ProjectCard';
import CoverflowCard from './CoverflowCard';
import { projects } from '@/data/projects';

const DESKTOP_QUERY = '(min-width: 1024px) and (min-height: 600px)';
const NAVBAR_HEIGHT = 88; // matches the fixed header height in globals.css
const FRAME_PADDING_X = 32; // matches the frame's px-8 in Tailwind

// Pins the projects section while the user scrolls vertically, translating the
// card track horizontally through a 3D coverflow: each card's rotation, scale,
// and depth are driven by its live distance from the viewport center. Once the
// track is fully revealed, normal vertical scrolling continues. Falls back to
// a plain stacked layout on small screens.
const HorizontalProjects = ({ header }) => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const frameRef = useRef(null);
  const trackRef = useRef(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [sectionHeight, setSectionHeight] = useState('100vh');
  const [layout, setLayout] = useState({ step: 0, centerOffset: 0 });
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
      const trackEl = trackRef.current;
      const frameWidth = frameRef.current?.clientWidth ?? 0;

      const first = trackEl?.children?.[0];
      const second = trackEl?.children?.[1];
      const step =
        first && second ? second.offsetLeft - first.offsetLeft : (first?.offsetWidth ?? 0);

      // Total horizontal travel needed to carry the track from the first card
      // centered to the last card centered.
      const travel = step * Math.max(projects.length - 1, 0);
      distanceRef.current = travel;
      setSectionHeight(`${window.innerHeight - NAVBAR_HEIGHT + travel}px`);
      setLayout({ step, centerOffset: frameWidth / 2 - FRAME_PADDING_X });
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, (latest) => {
    // Starts with card 0 centered in the frame, ends with the last card centered.
    const startX = layout.centerOffset - layout.step / 2;
    return startX - latest * distanceRef.current;
  });

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
            ? 'sticky top-[88px] h-[calc(100vh-88px)] flex flex-col overflow-hidden bg-transparent pt-3 pl-3'
            : 'flex flex-col'
        }
      >
        {header}

        <div
          ref={frameRef}
          className={
            isDesktop
              ? 'flex-1 flex items-center overflow-hidden px-8 [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-22px),transparent)]'
              : 'flex flex-col items-center gap-4'
          }
        >
          <motion.div
            ref={trackRef}
            style={isDesktop ? { x } : undefined}
            className={isDesktop ? 'flex flex-row rounded-2xl gap-4 w-max pr-24' : 'contents'}
          >
            {projects.map((project, index) => {
              const card = (
                <ProjectCard
                  logo={project.logo}
                  preview={project.preview}
                  name={project.name}
                  content={project.content}
                  link={project.link}
                  github={project.github}
                />
              );

              if (isDesktop)
                return (
                  <CoverflowCard
                    key={index}
                    x={x}
                    index={index}
                    step={layout.step}
                    centerOffset={layout.centerOffset}
                  >
                    {card}
                  </CoverflowCard>
                );

              return (
                <FadeInView key={index} delay={Math.min(index * 0.08, 0.32)}>
                  {card}
                </FadeInView>
              );
            })}
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
