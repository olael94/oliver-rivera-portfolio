import AboutMe from '@/components/AboutMe/AboutMe';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import MenuLink from '@/components/MenuLink/MenuLink';

const socialLinks = [
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/oliver-rivera-software-engineer/',
    imageSrc: 'linkedIn.png',
  },
  { name: 'GitHub', link: 'https://github.com/olael94', imageSrc: 'github.png' },
  { name: 'X', link: 'https://x.com/oliverrivera94', imageSrc: 'x.png' },
];

const menuLinkData = {
  email: 'orivera94@gmail.com',
  imageSrc: 'email.png',
  link: 'mailto:orivera94@gmail.com',
};

export default function About() {
  return (
    <div className="flex flex-row gap-6 items-start max-md:flex-col">
      <section className="max-md:order-2">
        <AboutMe
          name="My name is Oliver Rivera, I have a passion for coding, engineering, and creative expression."
          content1="My academic journey led me through Interior Design, Mechatronics Engineering, and now Software Engineering. When I'm not coding, I'm spending time with my family, playing video games, or listening to music."
          content2="Deciding on a lifelong career wasn't easy, but software engineering felt like coming home. It combines my favorite aspects: overcoming challenges, designing, delivering top-notch work, and lending a helping hand to others."
          content3="I firmly believe that every experience, from personal struggles to professional triumphs, shapes who we are. Family means the world to me; their support has been my rock. Huge thanks to my parents for backing my dreams and standing by me no matter what."
          content4="Thank you for the time you spent navigating my website. I invite you to stay tuned for updates on my ongoing work and growth in the field."
        />
      </section>
      <div className="flex flex-col gap-4 max-md:order-1 max-md:w-full">
        <img
          src="Me.jpg"
          alt="My picture"
          className="w-[464px] h-auto object-cover max-md:w-full"
        />
        <div className="max-md:hidden">
          <SocialLinks socialLinks={socialLinks} />
          <MenuLink {...menuLinkData} />
        </div>
      </div>
      <div className="hidden max-md:block max-md:order-3 max-md:w-full">
        <SocialLinks socialLinks={socialLinks} />
        <MenuLink {...menuLinkData} />
      </div>
    </div>
  );
}
