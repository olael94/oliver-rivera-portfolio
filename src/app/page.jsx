import WorkWidget from '@/components/WorkWidget';
import SkillsWidget from '@/components/SkillsWidget';
import StickyNote from '@/components/StickyNote';
import IntroCard from '@/components/IntroCard';
import AboutMe from '@/components/AboutMe';
import AmbientOrb from '@/components/AmbientOrb';
import SystemDesign from '@/components/SystemDesign';
import SocialLinks from '@/components/SocialLinks';
import MenuLink from '@/components/MenuLink';
import ProjectCard from '@/components/ProjectCard';
import { experiences } from '@/data/experiences';
import { skills } from '@/data/skills';
import { projects } from '@/data/projects';
import { introLinks, socialLinks, emailLink } from '@/data/links';

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────────────────────
          Full viewport section. IntroCard handles the photo, name, bio and
          social icons. CTA buttons anchor-scroll to Projects and About.
          AmbientOrb and SystemDesign stay as decorative SVG backgrounds.
      ─────────────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-[calc(100vh-108px)] max-md:!min-h-0 flex flex-col justify-center max-md:justify-start pb-16 max-md:pb-6"
      >
        {/* Decorative background animations */}
        <AmbientOrb />
        <SystemDesign />

        {/* Foreground content — two columns on desktop: IntroCard left, StickyNote right */}
        <div className="relative z-10 flex flex-row items-start gap-12 max-md:flex-col">

          {/* Left: IntroCard + CTAs — flex-1 so it takes remaining space */}
          <div className="flex-1 min-w-0 flex flex-col">
            <IntroCard
              name="Software Engineer, Father, and Believer"
              logo="/images/Me.jpg"
              content={[
                "I grew up watching my oldest brother tear apart electronics. While I wasn't the one taking things apart at first, the curiosity about how technology works never left. From obsessing over my Game Boy Color to working an entire summer at 14 to buy my first laptop, I've always chosen tech over everything else.",
                "Today, I'm a Software Engineering student at Ensign College and the Product Owner for DocRelief AI, an AI-powered documentation platform, where I lead a team of four developers. I build full-stack and backend applications using Java, Python, Spring Boot, React, and AWS, and I enjoy turning complex problems into clean, practical solutions.",
              ]}
              links={introLinks}
            />

            {/* CTA buttons — plain anchors so smooth scroll is handled by CSS */}
            <div className="flex flex-row gap-3 mt-6 max-md:flex-col max-md:w-fit">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-[#0c0a07] font-semibold text-sm tracking-wide transition-all duration-200 group"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                View Projects
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-amber-400/60 dark:hover:border-amber-600/60 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 font-semibold text-sm tracking-wide transition-all duration-200"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                About Me
              </a>
            </div>
          </div>

          {/* StickyNote — fixed width on desktop, full width on mobile */}
          <div className="w-[320px] flex-shrink-0 flex items-center pt-16 max-md:w-full max-md:pt-2 max-md:pb-4 max-md:self-start">
            <StickyNote />
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

      {/* ── ABOUT ─────────────────────────────────────────────────────────────
          Personal story section. Same two-column layout as the old /about
          page: bio text on the left, photo + StickyNote + social on the right.
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 max-md:pt-4 max-md:pb-8">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[11px] font-medium text-amber-500 tracking-[0.2em] uppercase whitespace-nowrap">
            01 — About
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800/60" />
        </div>

        <div className="flex flex-row gap-20 items-start max-md:flex-col">

          {/* Left: personal bio */}
          <section className="max-md:order-2">
            <AboutMe
              name="Not just an engineer."
              content1="We left everything we had built, everyone we loved, and started from zero. A new country, a new life, chasing a better future, and a chance to finish what I started. I am one semester away from my Bachelor's in Software Engineering, and none of it came free."
              content2="My two kids are the clearest answer I have ever had to the question of what matters. My wife has walked eleven years of uncertainty alongside me without flinching. She quietly gave up things of her own so I could keep becoming. I am aware of that cost every single day."
              content3="My parents equipped me in every sense of the word. The resources, the emotional foundation, and the unconditional belief that what I wanted to become was worth pursuing. Most people do not get that. I know I was lucky."
              content4="I build things because I cannot help it. Design, code, and a good problem to solve, and time disappears. Music is always on. I care deeply about craft, in software and in everything else. I am a positive person, not because things have been easy, but because I have seen what happens when you refuse to stop. I am still refusing."
            />
          </section>

          {/* Right: photo, sticky note, social links */}
          <div className="flex flex-col gap-6 max-md:order-1 max-md:w-full">

            {/* Photo with amber glow and technical corner registration marks */}
            <div className="relative w-fit max-md:w-full">
              <div className="absolute inset-0 rounded-sm shadow-[0_0_28px_8px_rgba(245,158,11,0.18)] dark:shadow-[0_0_32px_10px_rgba(245,158,11,0.22)]" />
              <img
                src="/images/Me.jpg"
                alt="Oliver Rivera"
                className="relative w-[464px] h-auto object-cover rounded-sm border border-amber-400/40 dark:border-amber-400/30 max-md:w-full"
              />
              <span className="absolute -top-[6px] -left-[6px] w-[14px] h-[14px] border-t-2 border-l-2 border-amber-400/70" />
              <span className="absolute -top-[6px] -right-[6px] w-[14px] h-[14px] border-t-2 border-r-2 border-amber-400/70" />
              <span className="absolute -bottom-[6px] -left-[6px] w-[14px] h-[14px] border-b-2 border-l-2 border-amber-400/70" />
              <span className="absolute -bottom-[6px] -right-[6px] w-[14px] h-[14px] border-b-2 border-r-2 border-amber-400/70" />
            </div>

            {/* Social links and email */}
            <SocialLinks socialLinks={socialLinks} />
            <MenuLink {...emailLink} />
          </div>
        </div>
      </section>

      {/* ── WORK ──────────────────────────────────────────────────────────────
          Experience and skills side by side. WorkWidget on the left,
          SkillsWidget on the right.
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="experience" className="py-24 max-md:py-16">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[11px] font-medium text-amber-500 tracking-[0.2em] uppercase whitespace-nowrap">
            02 — Experience
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800/60" />
        </div>

        {/* Side-by-side on desktop, stacked on mobile */}
        <div className="flex flex-row gap-8 items-start max-md:flex-col">
          <SkillsWidget title="My Skills" content="Here are my skills:" skills={skills} />
          <WorkWidget title="Work" content="My work experience." experiences={experiences} />
        </div>
      </section>

      {/* ── PROJECTS ──────────────────────────────────────────────────────────
          Project showcase. Same fixed-size card grid as before.
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 max-md:py-16 pb-32 max-md:pb-20">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-[11px] font-medium text-amber-500 tracking-[0.2em] uppercase whitespace-nowrap">
            03 — Projects
          </span>
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800/60" />
        </div>

        {/* Section heading */}
        <div className="mb-10">
          <h2 className="text-[32px] font-bold tracking-tight text-[#0f0f18] dark:text-white max-md:text-[24px]">
            Projects & Contributions
          </h2>
          <p className="mt-2 text-[17px] text-zinc-500 dark:text-zinc-400 max-w-[680px] leading-[1.8]">
            A selection of things I've built, from side projects to production applications.
            Full-stack, AI-powered, and everything in between. Clean code, real problems, practical solutions.
          </p>
        </div>

        {/* Project cards — fixed width on desktop, full width on mobile */}
        <section className="flex flex-wrap gap-4 max-md:flex-col max-md:items-center max-md:justify-center">
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
      </section>

    </div>
  );
}
