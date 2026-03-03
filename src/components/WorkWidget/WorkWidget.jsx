import PropTypes from 'prop-types';

const WorkWidget = ({ title, content, experiences }) => {
  return (
    <section
      data-testid="workWidget"
      className="flex flex-col p-6 border border-zinc-100 rounded-2xl w-full max-w-[380px] gap-3 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:border-zinc-700 dark:shadow-[0_0_10px_rgba(20,184,166,0.4)]"
    >
      <h2
        data-testid="workWidgetTitle"
        className="m-0 text-2xl font-bold text-zinc-700 dark:text-white"
      >
        {title}
      </h2>
      <p data-testid="workWidgetContent" className="text-base text-zinc-500 dark:text-custom-grey">
        {content}
      </p>
      <ul className="flex flex-col gap-6 list-none p-0">
        {experiences.map((experience, index) => (
          <li key={index} data-testid={`workWidgetItem${index}`}>
            <div className="flex flex-row gap-2 items-center">
              <img
                data-testid={`workWidgetItemLogo${index}`}
                src={experience.logo}
                alt={`${experience.organization} Logo`}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 flex flex-col gap-1">
                <h3
                  data-testid={`workWidgetItemTitle${index}`}
                  className="m-0 text-base font-bold text-zinc-700 dark:text-white"
                >
                  {experience.organization}
                </h3>
                <div className="flex flex-row justify-between">
                  <p
                    data-testid={`workWidgetItemContent${index}`}
                    className="m-0 text-xs text-zinc-400 uppercase"
                  >
                    {experience.jobTitle}
                  </p>
                  <span
                    data-testid={`workWidgetItemDates${index}`}
                    className="text-sm text-zinc-400"
                  >
                    {`${experience.startYear} - ${experience.endYear || 'Present'}`}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

WorkWidget.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.string.isRequired,
      organization: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      startYear: PropTypes.number.isRequired,
      endYear: PropTypes.number || null,
    })
  ),
};
WorkWidget.defaultProps = { experiences: [] };
export default WorkWidget;
