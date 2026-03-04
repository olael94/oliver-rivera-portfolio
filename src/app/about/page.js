import AboutMe from '@/components/AboutMe';
import SocialLinks from '@/components/SocialLinks';
import MenuLink from '@/components/MenuLink';
import { socialLinks, emailLink } from '@/data/links';

export default function About() {
  return (
    <div className="flex flex-row gap-20 items-start max-md:flex-col">
      <section className="max-md:order-2">
        <AboutMe
          name="Not just an engineer."
          content1="We left everything we had built, everyone we loved, and started from zero. A new country, a new life, chasing a better future, and a chance to finish what I started. I am one semester away from my Bachelor's in Software Engineering, and none of it came free."
          content2="My two kids are the clearest answer I have ever had to the question of what matters. My wife has walked eleven years of uncertainty alongside me without flinching. She quietly gave up things of her own so I could keep becoming. I am aware of that cost every single day."
          content3="My parents equipped me in every sense of the word. The resources, the emotional foundation, and the unconditional belief that what I wanted to become was worth pursuing. Most people do not get that. I know I was lucky."
          content4="I build things because I cannot help it. Design, code, and a good problem to solve, and time disappears. Music is always on. I care deeply about craft, in software and in everything else. I am a positive person, not because things have been easy, but because I have seen what happens when you refuse to stop. I am still refusing."
        />
      </section>
      <div className="flex flex-col gap-6 max-md:order-1 max-md:w-full">
        <div className="relative w-fit max-md:w-full">
          {/* Amber glow */}
          <div className="absolute inset-0 rounded-sm shadow-[0_0_28px_8px_rgba(245,158,11,0.18)] dark:shadow-[0_0_32px_10px_rgba(245,158,11,0.22)]" />
          {/* Photo */}
          <img
            src="/images/Me.jpg"
            alt="My picture"
            className="relative w-[464px] h-auto object-cover rounded-sm border border-amber-400/40 dark:border-amber-400/30 max-md:w-full"
          />
          {/* Corner registration marks — top-left */}
          <span className="absolute -top-[6px] -left-[6px] w-[14px] h-[14px] border-t-2 border-l-2 border-amber-400/70" />
          {/* top-right */}
          <span className="absolute -top-[6px] -right-[6px] w-[14px] h-[14px] border-t-2 border-r-2 border-amber-400/70" />
          {/* bottom-left */}
          <span className="absolute -bottom-[6px] -left-[6px] w-[14px] h-[14px] border-b-2 border-l-2 border-amber-400/70" />
          {/* bottom-right */}
          <span className="absolute -bottom-[6px] -right-[6px] w-[14px] h-[14px] border-b-2 border-r-2 border-amber-400/70" />
        </div>
        <div className="max-md:hidden">
          <SocialLinks socialLinks={socialLinks} />
          <MenuLink {...emailLink} />
        </div>
      </div>
      <div className="hidden max-md:block max-md:order-3 max-md:w-full">
        <SocialLinks socialLinks={socialLinks} />
        <MenuLink {...emailLink} />
      </div>
    </div>
  );
}
