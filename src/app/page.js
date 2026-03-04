import WorkWidget from '@/components/WorkWidget/WorkWidget';
import SkillsWidget from '@/components/SkillsWidget/SkillsWidget';
import SignupWidget from '@/components/SignupWidget/SignupWidget';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import IntroCard from '@/components/IntroCard/IntroCard';
import AmbientOrb from '@/components/AmbientOrb/AmbientOrb';
import SystemDesign from '@/components/SystemDesign/SystemDesign';

const introLinks = [
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/oliver-rivera-software-engineer/',
    icon: 'linkedIn.png',
  },
  { title: 'GitHub', url: 'https://github.com/olael94', icon: 'github.png' },
  { title: 'X', url: 'https://x.com/oliverrivera94', icon: 'x.png' },
];

const experiences = [
  { logo: '/IKEA.png', organization: 'IKEA', jobTitle: 'Designer', startYear: 2021, endYear: 2021 },
  {
    logo: '/HB.jpeg',
    organization: 'HB Workplaces',
    jobTitle: 'Design Intern',
    startYear: 2019,
    endYear: 2020,
  },
  {
    logo: '/Teleperformance.svg',
    organization: 'Teleperformance',
    jobTitle: 'Billing Agent',
    startYear: 2015,
    endYear: 2015,
  },
];

const skills = [
  { name: 'Java', proficiency: 80, icon: 'java.png' },
  { name: 'Python', proficiency: 50, icon: 'python.png' },
  { name: 'JavaScript', proficiency: 75, icon: 'javascript.png' },
  { name: 'Spring Boot', proficiency: 80, icon: 'https://cdn.simpleicons.org/springboot/6DB33F' },
  { name: 'React', proficiency: 75, icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'FastAPI', proficiency: 45, icon: 'https://cdn.simpleicons.org/fastapi/009688' },
  { name: 'Docker', proficiency: 75, icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  {
    name: 'AWS',
    proficiency: 70,
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
  },
  { name: 'PostgreSQL', proficiency: 75, icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { name: 'Expo', proficiency: 80, icon: 'https://cdn.simpleicons.org/expo/000000/ffffff' },
  { name: 'LangChain', proficiency: 45, icon: 'https://cdn.simpleicons.org/langchain/1C3C3C' },
];

const articles = [
  {
    date: 'Feb 2026',
    title: 'The AI Revolution in 2026: Top Trends Every Developer Should Know',
    content:
      'AI is no longer just autocomplete. In 2026, developers are orchestrating teams of autonomous agents that write code, run tests, and deploy; while they focus on architecture and judgment. Find out what skills separate the engineers who thrive from those who get left behind.',
    link: 'https://dev.to/jpeggdev/the-ai-revolution-in-2026-top-trends-every-developer-should-know-18eb',
  },
  {
    date: 'Jan 6, 2026',
    title: 'When AI Writes Almost All Code, What Happens to Software Engineering?',
    content:
      'DHH, the creator of Ruby on Rails, reversed his entire stance on AI coding in a matter of months. So did thousands of other engineers. What changed? And when AI writes 90% of the code, what does that mean for your career as a developer?',
    link: 'https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what',
  },
];

export default function Home() {
  return (
    <div className="relative flex flex-col gap-6">
      <AmbientOrb />
      <SystemDesign />
      <IntroCard
        name="Software Engineer, Father, and Believer"
        logo="Me.jpg"
        content={[
          "I grew up watching my oldest brother tear apart electronics. While I wasn't the one taking things apart at first, the curiosity about how technology works never left. From obsessing over my Game Boy Color to working an entire summer at 14 to buy my first laptop, I've always chosen tech over everything else.",
          "Today, I'm a Software Engineering student at Ensign College and the Product Owner for DocRelief AI, an AI-powered documentation platform, where I lead a team of four developers. I build full-stack and backend applications using Java, Python, Spring Boot, React, and AWS, and I enjoy turning complex problems into clean, practical solutions.",
        ]}
        links={introLinks}
      />
      <section className="flex flex-row max-md:flex-col">
        <section className="flex flex-col max-md:order-2">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              date={article.date}
              title={article.title}
              content={article.content}
              link={article.link}
            />
          ))}
        </section>
        <section className="flex flex-col items-end gap-6 w-full max-md:order-3 max-md:items-start max-md:pl-3.5">
          <SignupWidget
            title="Stay up to date"
            content="Get notified when I publish something new, and unsubscribe at any time."
            simulateNetworkRequestTime={2000}
          />
          <WorkWidget title="Work" content="My work experience." experiences={experiences} />
          <SkillsWidget title="My Skills" content="Here are my skills:" skills={skills} />
        </section>
      </section>
    </div>
  );
}
