'use client';

import PropTypes from 'prop-types';

const IntroCard = ({ name, roleOutline, roleAccent, tag, content, links, emailLink }) => {
  return (
    <div
      data-testid="introCard"
      className="flex flex-col py-8 rounded-md w-full max-w-[850px] gap-5"
    >
      {/* Heading */}
      <div data-testid="introCardName">
        <h1 className="text-[52px] leading-[1.05] font-extrabold tracking-tight text-[#0f0f18] dark:text-white max-md:text-[36px]">
          HI, I&rsquo;M {name.toUpperCase()}
        </h1>
        <h1
          className="text-[52px] leading-[1.05] font-extrabold tracking-tight max-md:text-[36px]"
          style={{ WebkitTextStroke: '1.5px #a1a1aa', color: 'transparent' }}
        >
          {roleOutline}
        </h1>
        <h1 className="text-[52px] leading-[1.05] font-extrabold tracking-tight gradient-text max-md:text-[36px]">
          {roleAccent}
        </h1>
      </div>

      {/* Tag */}
      <div className="inline-flex items-center gap-2 w-fit border-l-2 border-lime-500 bg-lime-500/5 pl-4 pr-5 py-2 rounded-r-md font-mono text-sm text-zinc-700 dark:text-zinc-300">
        <span className="text-lime-500 font-bold">{'>_'}</span>
        {tag}
      </div>

      {/* Body text */}
      <p
        data-testid="introCardContent"
        className="text-[17px] text-zinc-500 leading-[1.8] dark:text-zinc-400 max-w-[680px]"
      >
        {content}
      </p>

      {/* Social links + email */}
      <div className="flex flex-row gap-2 mt-1">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.title}
            className="neu-icon inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
          >
            <img
              src={link.icon}
              alt={link.title}
              className="w-4 h-4 object-contain dark:invert dark:brightness-90"
            />
          </a>
        ))}
        {emailLink && (
          <a
            href={emailLink.link}
            target="_blank"
            rel="noreferrer"
            aria-label="Email"
            className="neu-icon inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
          >
            <img
              src={emailLink.imageSrc}
              alt="Email"
              className="w-4 h-4 object-contain dark:invert dark:brightness-90"
            />
          </a>
        )}
      </div>
    </div>
  );
};

IntroCard.propTypes = {
  name: PropTypes.string.isRequired,
  roleOutline: PropTypes.string.isRequired,
  roleAccent: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  emailLink: PropTypes.shape({
    email: PropTypes.string,
    imageSrc: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
};

IntroCard.defaultProps = {
  emailLink: null,
};

export default IntroCard;
