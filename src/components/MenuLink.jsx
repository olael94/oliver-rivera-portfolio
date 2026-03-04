'use client';

import PropTypes from 'prop-types';

const MenuLink = ({ email, imageSrc, link }) => {
  return (
    <div data-testid="menu-link" className="flex flex-col pt-2 pb-8 gap-2">
      <a
        data-testid="menuLink"
        href={link}
        target="_blank"
        rel="noreferrer"
        className="flex py-2 justify-start items-center gap-1 text-[16px] text-zinc-600 no-underline hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors"
      >
        <img src={imageSrc} alt="link" className="w-5 h-5 mr-2" />
        {email}
      </a>
    </div>
  );
};

MenuLink.propTypes = {
  email: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  link: PropTypes.string,
};
MenuLink.defaultProps = { link: '#' };
export default MenuLink;
