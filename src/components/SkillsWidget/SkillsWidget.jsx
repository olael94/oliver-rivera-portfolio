import PropTypes from 'prop-types';

const levelLabel = (p) => {
  if (p >= 80)
    return {
      label: 'Advanced',
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    };
  if (p >= 50)
    return {
      label: 'Proficient',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
    };
  return {
    label: 'Learning',
    color: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
  };
};

function SkillsWidget({ title, content, skills }) {
  return (
    <section
      data-testid="skillsWidget"
      className="card-modern flex flex-col p-6 w-full max-w-[380px] gap-5"
    >
      <div>
        <h2
          data-testid="skillsWidgetTitle"
          className="m-0 text-lg font-bold text-zinc-800 dark:text-white tracking-tight"
        >
          {title}
        </h2>
        <p
          data-testid="skillsWidgetContent"
          className="text-sm text-zinc-400 dark:text-zinc-500 mt-1"
        >
          {content}
        </p>
      </div>
      <ul className="flex flex-col gap-3 list-none p-0">
        {skills.map((skill, index) => {
          const { label, color } = levelLabel(skill.proficiency);
          return (
            <li key={index} data-testid={`skillsWidgetItem${index}`}>
              <div className="flex flex-row items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700">
                  <img
                    data-testid={`skillsWidgetItemLogo${index}`}
                    src={skill.icon}
                    alt={`${skill.name} Icon`}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div className="flex-1 flex flex-row items-center justify-between">
                  <h3
                    data-testid={`skillsWidgetItemName${index}`}
                    className="m-0 text-[15px] font-semibold text-zinc-800 dark:text-zinc-100"
                  >
                    {skill.name}
                  </h3>
                  <span
                    data-testid={`skillsWidgetItemProficiency${index}`}
                    className={`text-[12px] font-semibold px-2.5 py-0.5 rounded-full ${color}`}
                  >
                    {label}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
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
