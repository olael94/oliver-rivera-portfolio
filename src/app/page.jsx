import SkillsWidget from '@/components/SkillsWidget';
import StickyNote from '@/components/StickyNote';
import IntroCard from '@/components/IntroCard';
import ProjectCard from '@/components/ProjectCard';
import GlitchPhotoCard from '@/components/GlitchPhotoCard';
import { skills, skillCategories } from '@/data/skills';
import { projects } from '@/data/projects';
import { introLinks, emailLink } from '@/data/links';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── HERO ──────────────────────────────────────────────────────────────
          Full viewport section. IntroCard handles the photo, name, bio and
          social icons. CTA buttons anchor-scroll to Projects and About.
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-108px)] max-md:!min-h-0 flex flex-col justify-center max-md:justify-start pb-16 max-md:pb-6"
      >
        {/* Foreground content — two columns on desktop: IntroCard left, StickyNote right */}
        <div className="relative z-10 flex flex-row items-start gap-12 max-md:flex-col">
          {/* Left: IntroCard + CTAs — flex-1 so it takes remaining space */}
          <div className="flex-1 min-w-0 flex flex-col">
            <IntroCard
              name="Oliver"
              roleOutline="SOFTWARE"
              roleAccent="ENGINEER."
              tag="Product Owner @ DocRelief AI"
              content="I build full-stack and backend applications with Java, Spring Boot, React, and AWS. Currently finishing my B.S. in Software Engineering while leading a team of four on DocRelief AI, an AI-powered documentation platform."
              links={introLinks}
              emailLink={emailLink}
            />

            {/* CTA buttons — plain anchors so smooth scroll is handled by CSS */}
            <div className="flex flex-row gap-3 mt-6 max-md:flex-col max-md:w-fit">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-500 hover:bg-lime-400 active:bg-lime-600 text-[#0c0a07] font-semibold text-sm tracking-wide transition-all duration-200 group"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                View Projects
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href={emailLink.link}
                className="neu-button inline-flex items-center px-6 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-lime-600 dark:hover:text-lime-400 font-semibold text-sm tracking-wide transition-all duration-200"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Photo + StickyNote — fixed width on desktop, full width on mobile */}
          <div className="w-[420px] flex-shrink-0 relative pt-4 pb-10 max-md:w-full max-md:pt-2 max-md:pb-16 max-md:self-start">
            <GlitchPhotoCard
              src="/images/Me.jpg"
              alt="Oliver Rivera"
              name="Oliver Rivera"
              title="Software Engineer"
            />
            <div className="absolute -bottom-6 -right-6 max-md:right-4 max-md:-bottom-10 z-20">
              <StickyNote />
            </div>
          </div>
        </div>

        {/* Subtle scroll indicator — hidden on mobile */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center max-md:hidden pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 animate-bounce">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase">scroll</span>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── SKILLS ────────────────────────────────────────────────────────────
          Skills grouped by category: Frontend, Backend, Tools & DevOps.
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 max-md:py-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge text-md font-bold tracking-[0.15em] text-lime-600 dark:text-lime-400">
            01
          </span>
          <span
            className="text-2xl md:text-3xl font-extrabold tracking-[0.15em] uppercase whitespace-nowrap text-lime-600 dark:text-lime-400"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Skills{' '}
            <span className="lowercase" style={{ fontFamily: 'var(--font-caveat), cursive' }}>
              &
            </span>{' '}
            Tools
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800/60" />
        </div>

        {/* Skills intro */}
        <div className="mb-10">
          <p className="mt-2 text-[17px] text-zinc-500 dark:text-zinc-400 max-w-[680px] leading-[1.8]">
            The languages, frameworks, and tools I reach for most, grouped by where they fit in the
            stack.
          </p>
        </div>

        {/* Skill categories — side by side on desktop, stacked on mobile */}
        <div className="flex flex-col gap-6 md:flex-row">
          {skillCategories.map(({ id, title }) => (
            <SkillsWidget
              key={id}
              title={title}
              content={`My ${title.toLowerCase()} skills:`}
              skills={skills.filter((skill) => skill.category === id)}
            />
          ))}
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────────
          Project showcase. Same fixed-size card grid as before.
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 max-md:py-16 pb-32 max-md:pb-20">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="section-badge text-md font-bold tracking-[0.15em] text-lime-600 dark:text-lime-400">
            02
          </span>
          <span
            className="text-2xl md:text-3xl font-extrabold tracking-[0.15em] uppercase whitespace-nowrap text-lime-600 dark:text-lime-400"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Projects{' '}
            <span className="lowercase" style={{ fontFamily: 'var(--font-caveat), cursive' }}>
              &
            </span>{' '}
            Contributions
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800/60" />
        </div>

        {/* Section heading */}
        <div className="mb-10">
          <p className="mt-2 text-[17px] text-zinc-500 dark:text-zinc-400 max-w-[680px] leading-[1.8]">
            A selection of things I've built, from side projects to production applications.
            Full-stack, AI-powered, and everything in between. Clean code, real problems, practical
            solutions.
          </p>
        </div>

        {/* Project cards — fixed width on desktop, full width on mobile */}
        <section className="flex flex-col gap-4 md:flex-row md:flex-wrap">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              logo={project.logo}
              preview={project.preview}
              name={project.name}
              content={project.content}
              link={project.link}
              github={project.github}
            />
          ))}
        </section>
      </section>
    </div>
  );
}
