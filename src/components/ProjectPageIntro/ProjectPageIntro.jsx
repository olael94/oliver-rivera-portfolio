import PropTypes from 'prop-types';

const ProjectPageIntro = ({ name, content }) => {
  return (
    <div
      data-testid="projectPageIntro"
      className="flex flex-col py-6 rounded-md w-full max-w-[850px] gap-3"
    >
      <h1
        data-testid="projectPageIntroName"
        className="mt-2 text-[50px] font-bold text-zinc-700 dark:text-white"
      >
        {name}
      </h1>
      <div>
        <p
          data-testid="projectPageIntroContent"
          className="text-base text-zinc-500 leading-7 mb-5 dark:text-custom-grey"
        >
          {content}
        </p>
      </div>
    </div>
  );
};

ProjectPageIntro.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
export default ProjectPageIntro;
