'use client';

import PropTypes from 'prop-types';

const SocialLinks = ({ socialLinks }) => {
  if (!socialLinks || socialLinks.length === 0) return <div>No social links available</div>;

  return (
    <div data-testid="socialLinks-testid">
      <ul className="list-none p-0">
        {socialLinks.map((socialLink, index) => (
          <li key={index} className="py-2.5">
            <a
              data-testid={`socialLinks${index}`}
              href={socialLink.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-[16px] text-zinc-600 no-underline hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors"
            >
              <img src={socialLink.imageSrc} alt="link" className="w-5 h-5 mr-2" />
              Follow me on {socialLink.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

SocialLinks.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
    })
  ),
};
export default SocialLinks;
