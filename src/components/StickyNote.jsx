'use client';

const StickyNote = () => {
  return (
    <div
      data-testid="stickyNote"
      className="relative w-full max-w-[480px] select-none"
      style={{ transform: 'rotate(-1.5deg)', containerType: 'inline-size' }}
    >
      <div className="dark:drop-shadow-[0_8px_24px_rgba(245,158,11,0.3)]">
        <img
          src="/images/orangestickynote.png"
          alt="sticky note"
          className="w-full h-auto"
          style={{ filter: 'sepia(1) saturate(2.2) hue-rotate(-15deg) brightness(1.1)' }}
        />
      </div>

      <div className="stickynote-content absolute inset-0 flex flex-col justify-center gap-2">
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
            className="stickynote-label font-bold uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-syne), sans-serif', color: '#1e3a5f' }}
          >
            Available for work
          </span>
        </div>

        <p
          className="stickynote-body text-zinc-800 leading-snug"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          Open to full-time roles, internships, and interesting collaborations.
        </p>

        <p
          className="stickynote-sig text-zinc-600 text-right"
          style={{ fontFamily: 'var(--font-caveat), cursive' }}
        >
          {'\u2014'} Oliver
        </p>
      </div>
    </div>
  );
};

export default StickyNote;
