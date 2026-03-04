import PropTypes from 'prop-types';

const WorkWidget = ({ title, content, experiences }) => {
  return (
    <section
      data-testid="workWidget"
      className="card-modern flex flex-col p-6 w-full max-w-[380px] gap-5"
    >
      <div>
        <h2
          data-testid="workWidgetTitle"
          className="m-0 text-lg font-bold text-zinc-800 dark:text-white tracking-tight"
        >
          {title}
        </h2>
        <p
          data-testid="workWidgetContent"
          className="text-[14px] text-zinc-400 dark:text-zinc-500 mt-1"
        >
          {content}
        </p>
      </div>
      <ul className="flex flex-col gap-4 list-none p-0">
        {experiences.map((experience, index) => (
          <li key={index} data-testid={`workWidgetItem${index}`}>
            <div className="flex flex-row gap-3 items-center">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700">
                <img
                  data-testid={`workWidgetItemLogo${index}`}
                  src={experience.logo}
                  alt={`${experience.organization} Logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-0.5">
                <h3
                  data-testid={`workWidgetItemTitle${index}`}
                  className="m-0 text-[15px] font-semibold text-zinc-800 dark:text-zinc-100"
                >
                  {experience.organization}
                </h3>
                <div className="flex flex-row justify-between items-center">
                  <p
                    data-testid={`workWidgetItemContent${index}`}
                    className="m-0 text-[13px] text-zinc-400 dark:text-zinc-500"
                  >
                    {experience.jobTitle}
                  </p>
                  <span
                    data-testid={`workWidgetItemDates${index}`}
                    className="text-[13px] text-zinc-400 dark:text-zinc-600 font-mono tabular-nums"
                  >
                    {`${experience.startYear}–${experience.endYear || 'Now'}`}
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
