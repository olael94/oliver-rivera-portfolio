'use client';

const StickyNote = () => {
  return (
    <div
      data-testid="stickyNote"
      className="card-modern select-none rounded-2xl px-4 py-3 w-[180px] max-md:w-[160px]"
      style={{ transform: 'rotate(-4deg)' }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
        </span>
        <span
          className="text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-600 dark:text-lime-400"
          style={{ fontFamily: 'var(--font-quicksand)' }}
        >
          Available for work
        </span>
      </div>

      <p
        className="text-lg leading-snug text-zinc-700 dark:text-zinc-300"
        style={{ fontFamily: 'var(--font-caveat), cursive' }}
      >
        Open to internships. Part-time or full-time opportunities.
      </p>
    </div>
  );
};

export default StickyNote;
