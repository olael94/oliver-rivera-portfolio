'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import PropTypes from 'prop-types';
import FadeInView from './FadeInView';
import CoverflowCard from './CoverflowCard';
import ProjectCard from './ProjectCard';
import MechatronicsProjectCard from './MechatronicsProjectCard';

const DESKTOP_QUERY = '(min-width: 1024px) and (min-height: 600px)';
const NAVBAR_HEIGHT = 88; // matches the fixed header height in globals.css
const FRAME_PADDING_X = 32; // matches the frame's px-8 in Tailwind

// Pins the projects section while the user scrolls vertically, translating the
// card track horizontally through a 3D coverflow: each card's rotation, scale,
// and depth are driven by its live distance from the viewport center. Once the
// track is fully revealed, normal vertical scrolling continues. Falls back to
// a plain stacked layout on small screens. `cardType` picks the card component
// (rather than a `renderCard` function prop) because this is rendered from a
// Server Component page, which can't pass functions across the boundary.
const HorizontalProjects = ({ header, projects, cardType = 'software', compact = false }) => {
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
      // Compact sections size the sticky pin to their actual content height
      // (header + cards) instead of the full viewport, so there's no leftover
      // blank space once the horizontal scroll finishes and the next section
      // should begin right away.
      const baseHeight = compact
        ? (viewportRef.current?.offsetHeight ?? window.innerHeight - NAVBAR_HEIGHT)
        : window.innerHeight - NAVBAR_HEIGHT;
      setSectionHeight(`${baseHeight + travel}px`);
      setLayout({ step, centerOffset: frameWidth / 2 - FRAME_PADDING_X });
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isDesktop, projects.length, compact]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const rawX = useTransform(scrollYProgress, (latest) => {
    // Starts with card 0 centered in the frame, ends with the last card centered.
    const startX = layout.centerOffset - layout.step / 2;
    return startX - latest * distanceRef.current;
  });
  // Smooths the track so it eases toward the scroll-driven target instead of
  // snapping to it 1:1 — raw scroll jitter would otherwise be very visible in
  // the coverflow's rotation/scale.
  const x = useSpring(rawX, { stiffness: 200, damping: 30, mass: 0.5 });

  const renderCard = (project) =>
    cardType === 'mechatronics' ? (
      <MechatronicsProjectCard
        video={project.video}
        name={project.name}
        specs={project.specs}
        content={project.content}
        github={project.github}
        videoPosition={project.videoPosition}
      />
    ) : (
      <ProjectCard
        logo={project.logo}
        preview={project.preview}
        name={project.name}
        content={project.content}
        link={project.link}
        github={project.github}
      />
    );

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
            ? `sticky top-[88px] ${compact ? 'max-h-[calc(100vh-88px)]' : 'h-[calc(100vh-88px)]'} flex flex-col overflow-hidden bg-transparent pt-3 pl-3`
            : 'flex flex-col'
        }
      >
        {header}

        <div
          ref={frameRef}
          className={
            isDesktop
              ? 'flex-1 flex items-start pt-6 overflow-hidden px-8 [mask-image:linear-gradient(to_right,transparent,black_32px,black_calc(100%-22px),transparent)]'
              : 'flex flex-col items-center gap-4 sm:grid sm:grid-cols-2 sm:justify-items-center'
          }
        >
          <motion.div
            ref={trackRef}
            style={isDesktop ? { x } : undefined}
            className={isDesktop ? 'flex flex-row rounded-2xl gap-4 w-max pr-24' : 'contents'}
          >
            {projects.map((project, index) => {
              const card = renderCard(project, index);

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
  projects: PropTypes.array.isRequired,
  cardType: PropTypes.oneOf(['software', 'mechatronics']),
  compact: PropTypes.bool,
};

export default HorizontalProjects;
