import PropTypes from 'prop-types';

const Footer = ({ links = [] }) => {
  const year = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="footer-neu relative w-full">
      <div className="flex flex-row items-center justify-between max-w-screen-2xl mx-auto px-6 py-5 w-full max-md:flex-col max-md:gap-4 max-md:py-6">
        <ul className="flex flex-row gap-6 list-none p-0 m-0">
          {links.map((link, index) => (
            <li key={index} data-testid={`footerLink${index}`}>
              <a
                href={link.url}
                className="text-sm text-zinc-500 dark:text-zinc-400 no-underline hover:text-lime-500 dark:hover:text-lime-400 transition-colors"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
        <p
          data-testid="footerContent"
          className="text-xs text-zinc-500 dark:text-zinc-500 m-0 font-mono"
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
export default Footer;
