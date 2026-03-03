import PropTypes from 'prop-types';

function SkillsWidget({ title, content, skills }) {
  return (
    <section
      data-testid="skillsWidget"
      className="flex flex-col p-6 border border-zinc-100 rounded-2xl w-full max-w-[380px] gap-3 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:border-zinc-700 dark:shadow-[0_0_10px_rgba(20,184,166,0.4)]"
    >
      <h2
        data-testid="skillsWidgetTitle"
        className="m-0 text-2xl font-bold text-zinc-700 dark:text-white"
      >
        {title}
      </h2>
      <p
        data-testid="skillsWidgetContent"
        className="text-base text-zinc-500 dark:text-custom-grey"
      >
        {content}
      </p>
      <ul className="flex flex-col gap-6 list-none p-0">
        {skills.map((skill, index) => (
          <li key={index} data-testid={`skillsWidgetItem${index}`}>
            <div className="flex flex-row flex-1 gap-2 items-center">
              <img
                data-testid={`skillsWidgetItemLogo${index}`}
                src={skill.icon}
                alt={`${skill.name} Icon`}
                className="w-13 h-13"
              />
              <div className="flex-1 flex flex-col gap-1">
                <h3
                  data-testid={`skillsWidgetItemName${index}`}
                  className="p-0 m-0 text-base font-bold text-zinc-700 dark:text-white"
                >
                  {skill.name}
                </h3>
                <div className="flex items-center h-8 bg-zinc-100 rounded-md">
                  <div
                    data-testid={`skillsWidgetItemProficiency${index}`}
                    className="h-full bg-teal-500 rounded-md"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

SkillsWidget.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      proficiency: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ),
};
SkillsWidget.defaultProps = { skills: [] };
export default SkillsWidget;
