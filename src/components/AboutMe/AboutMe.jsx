import PropTypes from 'prop-types';

const AboutMe = ({ name, content1, content2, content3, content4 }) => {
  return (
    <div data-testid="aboutme" className="flex flex-col pb-6 rounded-md w-full max-w-[850px] gap-3">
      <h1 data-testid="aboutMeName" className="text-[50px] font-bold text-zinc-700 dark:text-white">
        {name}
      </h1>
      <div className="flex flex-col">
        {[content1, content2, content3, content4].map((para, i) => (
          <p
            key={i}
            data-testid="aboutMeContent"
            className="text-base text-zinc-500 leading-7 mb-5 dark:text-custom-grey"
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
