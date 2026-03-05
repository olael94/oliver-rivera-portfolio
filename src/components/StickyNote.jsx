'use client';

const StickyNote = () => {
  return (
    <div
      data-testid="stickyNote"
      className="relative w-full max-w-[480px] select-none"
      style={{ transform: 'rotate(-1.5deg)' }}
    >
      <div className="dark:drop-shadow-[0_8px_24px_rgba(245,158,11,0.3)]">
        <img
          src="/images/orangestickynote.png"
          alt="sticky note"
          className="w-full h-auto"
          style={{ filter: 'sepia(1) saturate(2.2) hue-rotate(-15deg) brightness(1.1)' }}
        />
      </div>

      <div
        className="absolute flex flex-col justify-center gap-2"
        style={{ top: '25%', left: '28%', right: '30%', bottom: '25%' }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: '#0891b2' }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ backgroundColor: '#0891b2' }}
            />
          </span>
          <span
            className="text-[clamp(0.65rem,2vw,0.85rem)] font-bold uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-syne), sans-serif', color: '#1e3a5f' }}
          >
            Available for work
          </span>
        </div>

        <p
          className="text-zinc-800 leading-snug"
          style={{
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.7rem)',
          }}
        >
          Open to full-time roles, internships, and interesting collaborations.
        </p>

        <p
          className="text-zinc-600 text-right"
          style={{
            fontFamily: 'var(--font-caveat), cursive',
            fontSize: 'clamp(1rem, 2.8vw, 1.4rem)',
          }}
        >
          {'\u2014'} Oliver
        </p>
      </div>
    </div>
  );
};

export default StickyNote;
