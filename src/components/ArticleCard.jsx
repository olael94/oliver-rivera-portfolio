'use client';

import PropTypes from 'prop-types';

const ArticleCard = ({ date, title, content, link }) => {
  return (
    <article
      data-testid="articleCard"
      className="group flex flex-col px-3.5 py-7 w-full max-w-[1400px] border-b border-zinc-100 dark:border-zinc-800/60 last:border-0 hover:bg-amber-50/40 dark:hover:bg-amber-950/20 rounded-xl transition-colors duration-200 cursor-pointer"
      onClick={() => link && window.open(link, '_blank')}
    >
      <time
        data-testid="articleCardDate"
        className="text-xs font-semibold uppercase tracking-widest text-amber-500 dark:text-amber-400 mb-3"
      >
        {date}
      </time>
      <h2
        data-testid="articleCardTitle"
        className="text-[18px] font-bold leading-snug mb-3 text-zinc-800 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
      >
        {title}
      </h2>
      <p
        data-testid="articleCardContent"
        className="text-[17px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3"
      >
        {content}
      </p>
      <a
        data-testid="articleCardLink"
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        Read article
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className="translate-y-px group-hover:translate-x-0.5 transition-transform"
        >
          <path
            d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </article>
  );
};

ArticleCard.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
};
ArticleCard.defaultProps = { link: '#' };
export default ArticleCard;
