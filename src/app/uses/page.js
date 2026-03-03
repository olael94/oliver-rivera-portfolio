import AboutMe from '@/components/AboutMe/AboutMe';
import Usescard from '@/components/Usescard/Usescard';

export default function Uses() {
  return (
    <>
      <AboutMe
        name="What I Use"
        content1="The hardware, software, and tools that help me build, think, and stay productive. Updated as my setup evolves."
        content2=""
        content3=""
        content4=""
      />
      <div className="flex flex-col gap-16">
        {[
          {
            category: 'Workstation',
            items: [
              {
                name: 'Apple Mac Pro M1 Max',
                content1:
                  'This beast has taken me thru all my coding projects at school. I saved for a while to buy it. It runs all my projects smothly and can handle my 500 tabs open without a problem',
              },
              {
                name: 'Acer Nitro XZ342CK 34 inches Curved Ultrawide Gaming Monitor',
                content1:
                  'This monitor allows me to look at multiple navigators, tabs and windows at the same time. It actually saves me a lot of time by not having to navigate to find a window I need to look at.',
              },
              {
                name: 'Urmust Laptop Notebook Stand Holder',
                content1:
                  'This amazgin stand allows me to put my Mac Pro at eye level, and my Ultrawide monitor level as well. This prevents me to develop my hunchback further.',
              },
              {
                name: 'Apple Homepod Mini',
                content1:
                  'Since I am pretty picky when it comes to sound, I need to have a sound-quality device for my different needs. The integration of this device with my Mac pro makes my media watching more enjoyable',
              },
              {
                name: 'HP Z Workstation',
                content1:
                  'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.',
              },
            ],
          },
          {
            category: 'Development tools',
            items: [
              {
                name: 'Visual Studio Code',
                content1:
                  'A lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS, and Linux.',
              },
              {
                name: 'Sublime Text',
                content1:
                  "A sophisticated text editor for code, markup, and prose. You'll love the slick user interface, extraordinary features, and amazing performance.",
              },
              {
                name: 'Atom',
                content1:
                  'A hackable text editor for the 21st century, built on Electron, and based on everything we love about our favorite editors.',
              },
            ],
          },
          {
            category: 'Design',
            items: [
              {
                name: 'Adobe Photoshop',
                content1:
                  'The industry standard in raster graphics editing. It allows you to create, edit, and compose raster images in multiple layers and supports masks, alpha compositing, and several color models.',
              },
              {
                name: 'Sketch',
                content1:
                  'A digital design toolkit built to help you create your best work — from your earliest ideas, through to final artwork.',
              },
            ],
          },
          {
            category: 'Productivity',
            items: [
              {
                name: 'Trello',
                content1:
                  "A collaboration tool that organizes your projects into boards. In one glance, Trello tells you what's being worked on, who's working on what, and where something is in a process.",
              },
              {
                name: 'Slack',
                content1:
                  'A collaboration hub that connects your work to the people you work with. It integrates with the tools and services you need and centralizes your notifications, files, and data from 2,000+ other apps.',
              },
              {
                name: 'Google Workspace',
                content1:
                  'A suite of cloud computing, productivity, and collaboration tools, software, and products developed and marketed by Google.',
              },
              {
                name: 'Zoom',
                content1:
                  'A cloud-based video conferencing service you can use to virtually meet with others, either by video or audio-only or both, all while conducting live chats.',
              },
            ],
          },
        ].map(({ category, items }) => (
          <div
            key={category}
            className="flex flex-row border-l-4 border-zinc-600 rounded-sm pl-6 max-md:flex-col max-md:border-l-0"
          >
            <div className="basis-[200px] mr-8 max-md:basis-auto max-md:pb-6 font-medium text-zinc-700 dark:text-white">
              {category}
            </div>
            <div className="flex flex-col gap-6">
              {items.map((item, index) => (
                <Usescard key={index} name={item.name} content1={item.content1} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
