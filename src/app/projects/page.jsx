import ProjectCard from '@/components/ProjectCard';
import ProjectPageIntro from '@/components/ProjectPageIntro';
import { projects } from '@/data/projects';

export default function Projects() {
  return (
    <>
      <ProjectPageIntro
        name="Projects & Contributions"
        content="A selection of things I've built, from side projects to production applications. Full-stack, AI-powered, and everything in between. Clean code, real problems, practical solutions."
      />
      <section className="flex flex-wrap gap-4 pl-6 max-md:flex-col max-md:pl-0 max-md:items-center max-md:justify-center">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            logo={project.logo}
            name={project.name}
            content={project.content}
            link={project.link}
          />
        ))}
      </section>
    </>
  );
}
