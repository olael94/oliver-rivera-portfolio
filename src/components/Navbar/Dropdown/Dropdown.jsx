import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div data-testid="dropdown" ref={dropdownRef} className="relative">
      <button
        data-testid="menuButton"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center text-black text-sm font-medium cursor-pointer h-8 dark:text-white"
      >
        Menu
        <img
          src="/icons/dropdownIcon.png"
          alt=" "
          width="10"
          height="5"
          className="ml-2.5 align-middle"
        />
      </button>

      {isOpen && (
        <div className="absolute bg-[#f9f9f9] z-10 overflow-hidden dark:bg-zinc-800">
          {options.map((option, index) => (
            <a
              key={index}
              href={option.path}
              className="text-black w-20 flex flex-col text-center border-b border-black px-0 py-1 hover:bg-[#f1f1f1] dark:text-white dark:border-zinc-600 dark:hover:bg-zinc-700"
            >
              {option.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dropdown;
