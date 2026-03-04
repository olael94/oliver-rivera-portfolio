'use client';

import PropTypes from 'prop-types';

const IntroCard = ({ logo, name, content, links }) => {
  return (
    <div
      data-testid="introCard"
      className="flex flex-col py-8 rounded-md w-full max-w-[850px] gap-5"
    >
      {/* Avatar with ring */}
      {/* Avatar — editorial offset block style */}
      <div className="relative w-[88px] h-[88px] mb-2">
        {/* Offset accent block behind */}
        <div className="absolute -bottom-2 -right-2 w-[88px] h-[88px] rounded-2xl bg-amber-400/20 dark:bg-amber-400/10" />
        {/* Photo */}
        <div className="relative w-[88px] h-[88px] rounded-2xl overflow-hidden shadow-md">
          <img
            data-testid="introCardLogo"
            src={logo}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Name */}
      <div>
        <h1
          data-testid="introCardName"
          className="text-[46px] leading-[1.1] font-bold tracking-tight text-[#0f0f18] dark:text-white max-md:text-[32px]"
        >
          {name.split(', ').map((part, i) => (
            <span key={i}>
              {i === 0 ? (
                <span className="gradient-text">{part}</span>
              ) : (
                <span className="text-zinc-400 dark:text-zinc-500">
                  {(i > 0 ? ', ' : '') + part}
                </span>
              )}
            </span>
          ))}
        </h1>
      </div>

      {/* Body text */}
      <div className="flex flex-col gap-4 max-w-[680px]">
        {Array.isArray(content) ? (
          content.map((para, i) => (
            <p
              key={i}
              data-testid="introCardContent"
              className="text-[17px] text-zinc-500 leading-[1.8] dark:text-zinc-400"
            >
              {para}
            </p>
          ))
        ) : (
          <p
            data-testid="introCardContent"
            className="text-[17px] text-zinc-500 leading-[1.8] dark:text-zinc-400"
          >
            {content}
          </p>
        )}
      </div>

      {/* Social links */}
      <div className="flex flex-row gap-2 mt-1">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.title}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-md transition-all duration-200"
          >
            <img
              src={link.icon}
              alt={link.title}
              className="w-4 h-4 object-contain dark:invert dark:brightness-90"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

IntroCard.propTypes = {
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default IntroCard;
