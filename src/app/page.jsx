import SkillsWidget from '@/components/SkillsWidget';
import SnapSection from '@/components/SnapSection';
import IntroCard from '@/components/IntroCard';
import HorizontalProjects from '@/components/HorizontalProjects';
import GlitchPhotoCard from '@/components/GlitchPhotoCard';
import ContactForm from '@/components/ContactForm';
import RevealText from '@/components/RevealText';
import ScrollDivider from '@/components/ScrollDivider';
import FadeInView from '@/components/FadeInView';
import { skills, skillCategories } from '@/data/skills';
import { introLinks, emailLink, socialLinks } from '@/data/links';

const AVAILABILITY_LINES = ['Available for work', 'Open to internships', 'Part-time or Full-time'];

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
        <div className="relative z-10 flex flex-row items-start gap-12 max-md:flex-col max-md:gap-4">
          {/* Left: IntroCard + CTAs — flex-1 so it takes remaining space */}
          <div className="flex-1 min-w-0 flex flex-col max-md:order-2">
            <IntroCard
              name="Oliver"
              roleOutline="SOFTWARE"
              roleAccent="ENGINEER."
              tag={AVAILABILITY_LINES}
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
                href="#contact"
                className="neu-button inline-flex items-center px-6 py-3 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-lime-600 dark:hover:text-lime-400 font-semibold text-sm tracking-wide transition-all duration-200"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Photo — fixed width on desktop, full width on mobile */}
          <div className="w-full md:w-auto md:flex-[0_1_260px] md:max-w-[260px] lg:flex-[0_1_340px] lg:max-w-[340px] xl:flex-[0_1_420px] xl:max-w-[420px] relative pt-4 pb-10 max-md:pt-2 max-md:pb-2 max-md:self-start max-md:order-1">
            <GlitchPhotoCard
              alt="Oliver Rivera"
              name="Oliver Rivera"
              title="Software Engineer"
            />
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
      <SnapSection>
      <section id="experience" className="py-24 max-md:py-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="section-badge text-md font-bold tracking-[0.15em] text-lime-600 dark:text-lime-400">
            <RevealText>01</RevealText>
          </span>
          <span
            className="min-w-0 max-lg:break-words text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-[0.15em] max-lg:tracking-normal uppercase max-lg:whitespace-normal whitespace-nowrap text-lime-600 dark:text-lime-400"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            <RevealText delay={0.1}>
              Skills{' '}
              <span className="lowercase" style={{ fontFamily: 'var(--font-caveat), cursive' }}>
                &
              </span>{' '}
              Tools
            </RevealText>
          </span>
          <ScrollDivider />
        </div>

        {/* Skills intro */}
        <div className="mb-10">
          <p className="mt-2 text-[18px] text-zinc-600 dark:text-zinc-300 max-w-[680px] leading-[1.8]">
            The languages, frameworks, and tools I reach for most, grouped by where they fit in the
            stack.
          </p>
        </div>

        {/* Skill categories — side by side on desktop, stacked on mobile */}
        <div className="flex flex-col gap-6 max-md:items-center md:flex-row">
          {skillCategories.map(({ id, title }) => (
            <SkillsWidget
              key={id}
              title={title}
              skills={skills.filter((skill) => skill.category === id)}
            />
          ))}
        </div>
      </section>
      </SnapSection>

      {/* ── PROJECTS ──────────────────────────────────────────────────────────
          Project showcase. Same fixed-size card grid as before.
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-24 max-md:py-16 pb-32 max-md:pb-20">
        {/* Project cards — horizontal scroll-jack on desktop, stacked on mobile.
            The section label and intro paragraph are rendered inside
            HorizontalProjects so they stay pinned alongside the cards
            while the horizontal scroll plays out. */}
        <HorizontalProjects
          header={
            <>
              {/* Section label */}
              <div className="flex items-center gap-4 mb-10">
                <span className="section-badge text-md font-bold tracking-[0.15em] text-lime-600 dark:text-lime-400">
                  <RevealText>02</RevealText>
                </span>
                <span
                  className="min-w-0 max-lg:break-words text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-[0.15em] max-lg:tracking-normal uppercase max-lg:whitespace-normal whitespace-nowrap text-lime-600 dark:text-lime-400"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  <RevealText delay={0.1}>
                    Projects{' '}
                    <span
                      className="lowercase"
                      style={{ fontFamily: 'var(--font-caveat), cursive' }}
                    >
                      &
                    </span>{' '}
                    Contributions
                  </RevealText>
                </span>
                <ScrollDivider />
              </div>

              {/* Section heading */}
              <div className="mb-10">
                <p className="mt-2 text-[18px] text-zinc-600 dark:text-zinc-300 max-w-[680px] leading-[1.8]">
                  A selection of things I've built, from side projects to production applications.
                  Full-stack, AI-powered, and everything in between. Clean code, real problems,
                  practical solutions.
                </p>
              </div>
            </>
          }
        />
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────────
          Contact form that emails the message directly to me, plus quick
          links to email and socials.
      ─────────────────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 max-md:py-16">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="section-badge text-md font-bold tracking-[0.15em] text-lime-600 dark:text-lime-400">
            <RevealText>03</RevealText>
          </span>
          <span
            className="min-w-0 max-lg:break-words text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-[0.15em] max-lg:tracking-normal uppercase max-lg:whitespace-normal whitespace-nowrap text-lime-600 dark:text-lime-400"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            <RevealText delay={0.1}>
              Contact{' '}
              <span className="lowercase" style={{ fontFamily: 'var(--font-caveat), cursive' }}>
                &
              </span>{' '}
              Me
            </RevealText>
          </span>
          <ScrollDivider />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: blurb + email + socials */}
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <FadeInView delay={0}>
              <h3
                className="text-2xl font-extrabold text-zinc-800 dark:text-white"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Let&rsquo;s chat
              </h3>
              <p className="mt-6 text-[18px] text-zinc-600 dark:text-zinc-300 max-w-[520px] leading-[1.8]">
                I'm currently open to full-time roles, freelance projects, and collaborations.
                Whether you have a question or just want to say hi — my inbox is always open!
              </p>
            </FadeInView>

            <FadeInView delay={0.1}>
              <a
                href={emailLink.link}
                className="flex items-center gap-3 group w-fit"
                aria-label="Email"
              >
                <span className="neu-icon flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200">
                  <img
                    src={emailLink.imageSrc}
                    alt=""
                    className="w-4 h-4 object-contain dark:invert dark:brightness-90"
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                    {emailLink.email}
                  </span>
                </span>
              </a>
            </FadeInView>

            <FadeInView delay={0.2}>
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500">
                  Find me on
                </span>
                <div className="flex flex-row gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.name}
                      className="neu-icon inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                    >
                      <img
                        src={link.imageSrc}
                        alt={link.name}
                        className="w-4 h-4 object-contain dark:invert dark:brightness-90"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </FadeInView>
          </div>

          {/* Right: contact form */}
          <FadeInView delay={0.15} className="w-full lg:flex-[0_1_540px]">
            <ContactForm />
          </FadeInView>
        </div>
      </section>
    </div>
  );
}
