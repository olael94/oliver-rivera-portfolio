import PropTypes from 'prop-types';

const Footer = ({ links }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="w-full border-t border-zinc-100 dark:border-zinc-800/60 bg-surface/80 dark:bg-dark-bg/80 backdrop-blur-sm"
    >
      <div className="flex flex-row items-center justify-between px-[180px] py-5 max-md:flex-col max-md:gap-4 max-md:px-6 max-md:py-6">
        <ul className="flex flex-row gap-6 list-none p-0 m-0">
          {links.map((link, index) => (
            <li key={index} data-testid={`footerLink${index}`}>
              <a
                href={link.url}
                className="text-sm text-zinc-400 dark:text-zinc-500 no-underline hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <p
          data-testid="footerContent"
          className="text-xs text-zinc-400 dark:text-zinc-600 m-0 font-mono"
        >
          © {year} Oliver Rivera
        </p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
};
Footer.defaultProps = { links: [] };
export default Footer;
