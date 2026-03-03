import PropTypes from 'prop-types';

const ArticleCard = ({ date, title, content, link }) => {
  return (
    <article data-testid="articleCard" className="flex flex-col px-3.5 py-6 w-full max-w-[1400px]">
      <div>
        <time
          data-testid="articleCardDate"
          className="text-sm uppercase text-zinc-600 border-l-4 border-zinc-200 pl-2 dark:text-custom-grey"
        >
          {date}
        </time>
        <h2 data-testid="articleCardTitle" className="text-2xl capitalize font-bold my-4">
          {title}
        </h2>
      </div>
      <p
        data-testid="articleCardContent"
        className="text-base text-zinc-700 mb-4 leading-relaxed dark:text-custom-grey"
      >
        {content}
      </p>
      <a
        data-testid="articleCardLink"
        href={link}
        className="text-base font-bold text-teal-500 hover:underline"
      >
        Read article
      </a>
    </article>
  );
};

ArticleCard.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string,
};
ArticleCard.defaultProps = { link: '#' };
export default ArticleCard;
