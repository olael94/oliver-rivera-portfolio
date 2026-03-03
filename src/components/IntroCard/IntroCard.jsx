'use client';

import PropTypes from 'prop-types';

const IntroCard = ({ logo, name, content, links }) => {
  return (
    <div
      data-testid="introCard"
      className="flex flex-col py-6 rounded-md w-full max-w-[850px] gap-3"
    >
      <div>
        <img
          data-testid="introCardLogo"
          src={logo}
          alt="Profile"
          className="w-[100px] h-[100px] rounded-full p-1 border-2 border-zinc-200 shadow-[0_0_60px_rgba(20,184,166,1)] dark:shadow-[0_0_30px_rgba(20,184,166,0.4)]"
        />
        <h1
          data-testid="introCardName"
          className="mt-2 text-[50px] font-bold text-zinc-700 dark:text-white"
        >
          {name}
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        {Array.isArray(content) ? (
          content.map((para, i) => (
            <p
              key={i}
              data-testid="introCardContent"
              className="text-base text-zinc-500 leading-7 mb-5 dark:text-custom-grey"
            >
              {para}
            </p>
          ))
        ) : (
          <p
            data-testid="introCardContent"
            className="text-base text-zinc-500 leading-7 mb-5 dark:text-custom-grey"
          >
            {content}
          </p>
        )}
        <div className="flex flex-row gap-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-base text-zinc-600 no-underline pb-1 border-b border-transparent hover:text-black"
            >
              <img src={link.icon} alt={link.title} className="w-5 h-5 mr-5" />
            </a>
          ))}
        </div>
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
