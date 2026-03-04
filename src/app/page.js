import WorkWidget from '@/components/WorkWidget';
import SkillsWidget from '@/components/SkillsWidget';
import SignupWidget from '@/components/SignupWidget';
import ArticleCard from '@/components/ArticleCard';
import IntroCard from '@/components/IntroCard';
import AmbientOrb from '@/components/AmbientOrb';
import SystemDesign from '@/components/SystemDesign';
import { experiences } from '@/data/experiences';
import { skills } from '@/data/skills';
import { articles } from '@/data/articles';
import { introLinks } from '@/data/links';

export default function Home() {
  return (
    <div className="relative flex flex-col gap-6">
      <AmbientOrb />
      <SystemDesign />
      <IntroCard
        name="Software Engineer, Father, and Believer"
        logo="/images/Me.jpg"
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
        <section className="flex flex-col items-end gap-6 w-full max-md:order-3 max-md:items-start">
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
