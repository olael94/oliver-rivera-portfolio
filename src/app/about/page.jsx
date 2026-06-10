import AboutMe from '@/components/AboutMe';
import SocialLinks from '@/components/SocialLinks';
import MenuLink from '@/components/MenuLink';
import GlitchPhotoCard from '@/components/GlitchPhotoCard';
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
        <GlitchPhotoCard
          src="/images/Me.jpg"
          alt="Oliver Rivera"
          name="Oliver Rivera"
          title="Software Engineer"
        />
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
