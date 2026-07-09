'use client';

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const MechatronicsProjectCard = ({
  video,
  name,
  specs,
  content,
  github,
  videoPosition = 'center',
  autoPlayOnView = false,
}) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  // Touch devices don't have a reliable :hover state — mobile browsers
  // simulate mouseenter/mouseleave on tap, which is why hover-driven
  // activation felt inconsistent there. In autoPlayOnView mode, visibility
  // in the viewport drives activation instead of hover/tap.
  const isActive = autoPlayOnView ? inView : hovered;

  useEffect(() => {
    if (!autoPlayOnView) return undefined;
    const el = cardRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.5,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoPlayOnView]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;

    if (!isActive) {
      el.pause();
      return undefined;
    }

    // On a real network, `.play()` can silently no-op on mobile Safari if
    // called before the video has buffered enough data — the promise still
    // resolves, but nothing actually starts. Wait for `canplay` first if the
    // video isn't there yet, rather than firing play() blind.
    const tryPlay = () => el.play().catch(() => {});
    if (el.readyState >= 3) {
      tryPlay();
      return undefined;
    }
    el.addEventListener('canplay', tryPlay, { once: true });
    return () => el.removeEventListener('canplay', tryPlay);
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      data-testid="mechatronicsProjectCard"
      className="card-modern flex flex-col rounded-3xl overflow-hidden w-full max-w-[400px] h-[520px] md:w-[380px] md:min-w-[380px] md:max-w-[380px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hero video — the build itself is the pitch, so it gets most of the card */}
      <div className="relative aspect-[16/11] overflow-hidden bg-zinc-900">
        <video
          ref={videoRef}
          data-testid="mechatronicsProjectCardVideo"
          src={video}
          muted
          loop
          playsInline
          // "metadata" tells mobile Safari not to buffer real frame data
          // until something forces it to — but our play() is gated on the
          // canplay event, which never fires under "metadata" without a
          // play() already having happened. That's a deadlock on iOS.
          // "auto" buffers real data up front so canplay can actually fire.
          preload="auto"
          // A freshly loaded, paused <video> often doesn't paint its first
          // frame until nudged. Seeking (rather than play-then-pause) forces
          // the frame to render without touching playback state — a
          // play()/pause() nudge here could otherwise race with the real
          // play() from the isActive effect below and leave the video
          // stuck paused until something re-triggers activation.
          onLoadedData={(e) => {
            const el = e.currentTarget;
            if (el.currentTime === 0) el.currentTime = 0.01;
          }}
          style={{ objectPosition: videoPosition }}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isActive
              ? 'grayscale-0 brightness-100 scale-100'
              : 'grayscale-[45%] brightness-90 scale-105'
          }`}
        />
        {/* Blur applied via a backdrop-blur overlay rather than filter:blur()
            directly on the <video> — iOS Safari has a known bug where a CSS
            blur filter on a <video> element can render it as solid black,
            since it forces a software compositing path that's broken for
            hardware-decoded video on WebKit. Blurring the layer behind this
            overlay instead avoids touching the video's own filter entirely. */}
        <div
          className={`absolute inset-0 backdrop-blur-[3px] transition-opacity duration-300 pointer-events-none ${
            isActive ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Body */}
      <div className="flex flex-col p-6 gap-2 flex-1">
        <h2
          data-testid="mechatronicsProjectCardName"
          className={`text-lg font-bold tracking-tight transition-colors duration-200 ${
            isActive ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-800 dark:text-zinc-100'
          }`}
          style={{ fontFamily: 'var(--font-quicksand)' }}
        >
          {name}
        </h2>

        {specs && (
          <p
            data-testid="mechatronicsProjectCardSpecs"
            className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400"
          >
            {specs}
          </p>
        )}

        <p
          data-testid="mechatronicsProjectCardContent"
          className="text-[17px] text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3"
        >
          {content}
        </p>

        {github && (
          <div className="flex items-center gap-3 mt-auto pt-1 flex-wrap">
            <a
              data-testid="mechatronicsProjectCardGithubLink"
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-translate-y-px"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Source Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

MechatronicsProjectCard.propTypes = {
  video: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  specs: PropTypes.string,
  content: PropTypes.string.isRequired,
  github: PropTypes.string,
  videoPosition: PropTypes.string,
  autoPlayOnView: PropTypes.bool,
};

export default MechatronicsProjectCard;
