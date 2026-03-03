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
              className="inline-flex items-center text-base text-zinc-600 no-underline pb-1 border-b border-transparent hover:text-teal-500 hover:border-b-2 hover:border-teal-500 hover:rounded-sm dark:text-custom-grey dark:hover:text-teal-500"
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
