import PropTypes from 'prop-types';

const Footer = ({ links }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="w-full flex flex-row justify-between bg-[rgba(244,245,245)] px-10 py-6 border-t border-zinc-600 dark:bg-[rgba(51,51,51,0.975)] max-md:flex-col max-md:min-w-[420px]"
    >
      <ul className="flex flex-row gap-6 pl-36 max-md:pl-0 max-md:justify-center max-md:order-1 list-none">
        {links.map((link, index) => (
          <li key={index} data-testid={`footerLink${index}`}>
            <a
              href={link.url}
              className="text-zinc-500 no-underline hover:text-teal-500 hover:underline dark:text-white"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
      <p
        data-testid="footerContent"
        className="text-zinc-500 text-sm m-0 px-36 max-md:order-2 max-md:pt-6 max-md:px-0 max-md:text-center max-md:w-full dark:text-white"
      >
        © {year} Oliver Rivera. All rights reserved
      </p>
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
