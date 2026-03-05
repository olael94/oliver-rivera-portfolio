'use client';

import Image from 'next/image';

const StickyNote = () => {
  return (
    <div
      data-testid="stickyNote"
      className="relative w-full max-w-[280px] select-none"
      style={{ transform: 'rotate(-1.5deg)' }}
    >
      <Image
        src="/images/stickynote.png"
        alt="sticky note"
        width={380}
        height={320}
        className="w-full h-auto"
        style={{ filter: 'sepia(1) saturate(2.2) hue-rotate(-15deg) brightness(1.1)' }}
      />

      {/* content overlaid on the image */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 px-8 pt-4 pb-10">
        <div className="flex items-center gap-2 mt-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-widest text-emerald-900"
            style={{ fontFamily: 'var(--font-syne), sans-serif' }}
          >
            Available for work
          </span>
        </div>

        <p
          className="text-zinc-800 leading-snug"
          style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '1.7rem' }}
        >
          Open to full-time roles, internships, and interesting collaborations.
        </p>

        <p
          className="text-zinc-600 text-right pr-12"
          style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '1.4rem' }}
        >
          {'\u2014'} Oliver
        </p>
      </div>
    </div>
  );
};

export default StickyNote;
