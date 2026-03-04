import AboutMe from '@/components/AboutMe';
import UsesCard from '@/components/UsesCard';
import { usesCategories } from '@/data/uses';

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
        {usesCategories.map(({ category, items }) => (
          <div
            key={category}
            className="flex flex-row border-l-4 border-amber-400/40 rounded-sm pl-6 max-md:flex-col max-md:border-l-0"
          >
            <div className="basis-[200px] mr-8 max-md:basis-auto max-md:pb-6 text-[16px] font-semibold text-zinc-700 dark:text-zinc-200">
              {category}
            </div>
            <div className="flex flex-col gap-6">
              {items.map((item, index) => (
                <UsesCard
                  key={index}
                  name={item.name}
                  content1={item.content1}
                  content2={item.content2}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
