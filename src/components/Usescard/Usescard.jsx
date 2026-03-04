import PropTypes from 'prop-types';

const Usescard = ({ name, content1, content2, content3, content4 }) => {
  return (
    <div data-testid="Usescard" className="rounded-md w-full max-w-[850px]">
      <h1
        data-testid="UsescardName"
        className="text-[17px] font-bold text-zinc-800 dark:text-zinc-100 mb-1"
      >
        {name}
      </h1>
      <div>
        {[content1, content2, content3, content4].filter(Boolean).map((para, i) => (
          <p
            key={i}
            data-testid="UsescardContent"
            className="text-[17px] text-zinc-500 leading-[1.8] mb-0.5 dark:text-zinc-400"
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
};

Usescard.propTypes = {
  name: PropTypes.string.isRequired,
  content1: PropTypes.string,
  content2: PropTypes.string,
  content3: PropTypes.string,
  content4: PropTypes.string,
};
export default Usescard;
