import PropTypes from 'prop-types';

const AboutMe = ({ name, content1, content2, content3, content4 }) => {
  return (
    <div data-testid="aboutme" className="flex flex-col pb-6 rounded-md w-full max-w-[850px] gap-3">
      <h1 data-testid="aboutMeName" className="text-[50px] font-bold text-zinc-800 dark:text-white">
        {name}
      </h1>
      <div className="card-modern flex flex-col p-6">
        {[content1, content2, content3, content4].filter(Boolean).map((para, i) => (
          <p
            key={i}
            data-testid="aboutMeContent"
            className="text-[17px] text-zinc-500 leading-[1.8] last:mb-0 mb-5 dark:text-zinc-400"
          >
            {para}
          </p>
        ))}
      </div>
    </div>
  );
};

AboutMe.propTypes = {
  name: PropTypes.string.isRequired,
  content1: PropTypes.string.isRequired,
  content2: PropTypes.string.isRequired,
  content3: PropTypes.string.isRequired,
  content4: PropTypes.string.isRequired,
};
export default AboutMe;
