import ProjectCard from '@/components/ProjectCard/ProjectCard';
import ProjectPageIntro from '@/components/ProjectPageIntro/ProjectPageIntro';

export default function Projects() {
  return (
    <>
      <ProjectPageIntro
        name="Projects & Contributions"
        content="A selection of things I've built, from side projects to production applications. Full-stack, AI-powered, and everything in between. Clean code, real problems, practical solutions."
      />
      <section className="flex flex-wrap pl-6 max-md:flex-col max-md:pl-0 max-md:items-center max-md:justify-center">
        <ProjectCard
          logo="DocReliefLogo.png"
          name="DocRelief Ai"
          content="AI tool that auto-generates professional README files from GitHub repos, file uploads, or OAuth, and commits them directly to your GitHub repo, turning hours of documentation into minutes."
          link="https://github.com/olael94/docrelief-ai"
        />
        <ProjectCard
          logo="stedilogo.png"
          name="STEDI Balance"
          content="Contributed to the Python-based sensor driver for the STEDI wall-mount balance device. The sensor feeds real-time data to the STEDI platform used by clinicians to monitor patient balance and mobility. Private repository — available upon request."
          link="https://dev.stedi.me/"
        />
        <ProjectCard
          logo="microsoft.png"
          name="MS"
          content="Creating technology to empower civilians to explore space on their own terms"
          link="https://ensign.edu"
        />
        <ProjectCard
          logo="slack.png"
          name="Slack"
          content="Creating technology to empower civilians to explore space on their own terms"
          link="https://www.ensign.edu/"
        />
        <ProjectCard
          logo="microsoft.png"
          name="LinkedIn"
          content="Creating technology to empower civilians to explore space on their own terms"
          link="https://ensign.edu"
        />
        <ProjectCard
          logo="spotify.png"
          name="Spotify"
          content="Creating technology to empower civilians to explore space on their own terms"
          link="https://www.ensign.edu/"
        />
      </section>
    </>
  );
}
