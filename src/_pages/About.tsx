import Button from "../_components/ui/Button";
import KnowMeCard from "../_components/ui/cards/KnowMeCard";
import PieChart from "../_components/ui/others/PieChart";
import { knowmeData } from "../data/knowme";

export default function AboutPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div className="flex items-center justify-between gap-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-7xl font-medium text-foreground">
                About.
              </h1>
              <div>
                <p className="text-foreground-alt-a text-xl font-light leading-relaxed mx-auto max-w-xl">
                  I am a web developer, UX/UI designer and freelancer based at
                  Lome/Togo.
                </p>
                <p className="text-foreground text-xl leading-relaxed mx-auto max-w-xl mt-6">
                  At first I just wanted to understand how things worked. Then I
                  started coding. Then I realized that writing code was only
                  part of the problem. We also had to understand what people
                  were actually going to use. This is where design, UX and
                  development started to come together for me. Today I love
                  being able to move from idea to interface and then from
                  interface to actual product.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/images/others/rahim-cartoon.png"
                alt="Rahim image"
                className="w-full h-full"
              />
            </div>
          </div>
          {/* Second section */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-24 py-24">
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-2xl font-medium">
                  Part Designer
                </h3>
                <ul className="space-y-4">
                  <li className="text-foreground-alt-a text-xl">UX Design</li>
                  <li className="text-foreground-alt-a text-xl">UI Design</li>
                  <li className="text-foreground-alt-a text-xl">
                    Design systems
                  </li>
                  <li className="text-foreground-alt-a text-xl">Make it pop</li>
                </ul>
              </div>
              <div>
                <PieChart />
              </div>
              <div className="flex flex-col gap-8">
                <h3 className="text-foreground text-2xl font-medium">
                  Part Coder
                </h3>
                <ul className="space-y-4">
                  <li className="text-foreground-alt-a text-xl">
                    Front-end Development
                  </li>
                  <li className="text-foreground-alt-a text-xl">
                    React/Next js
                  </li>
                  <li className="text-foreground-alt-a text-xl">
                    Tailwind css
                  </li>
                  <li className="text-foreground-alt-a text-xl">GSAP</li>
                  <li className="text-foreground-alt-a text-xl">Typescript</li>
                </ul>
              </div>
            </div>
          </div>
          {/* third section */}
          <div className="flex items-center justify-between py-24">
            <div className="mx-auto max-w-xl flex flex-col gap-12">
              <p className="text-foreground text-xl font-normal leading-relaxed">
                I can start in Figma and end up in my code editor without
                needing to pass the baton to anyone else. This dual role allows
                me to think about the experience while keeping technical
                constraints in mind. The result: fewer back and forths, more
                coherent decisions and better continuity between what has been
                imagined and what is actually constructed.
              </p>
              <h2 className="text-foreground text-4xl font-medium">
                I don't want to just build things that work. I want to build
                things that make sense.
              </h2>
              <p className="text-foreground text-xl font-normal leading-relaxed">
                For me, design and development are not two completely separate
                stages. A good interface should be beautiful, but above all it
                should be understandable. A good product should work, but it
                should also make you want to use it. It is this intersection
                between thinking, design and technology that interests me.
              </p>
            </div>
          </div>
          {/* fourth section */}
          <div className="py-24">
            <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xl">
              Some things you can expect from me.
            </h2>

            {/* knowme Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-14">
              {knowmeData.map((step) => (
                <KnowMeCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
          {/* fith section */}
          <div className="py-24">
            <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-12 lg:mb-20 max-w-xl">
              The tools I use to get the job done.
            </h2>
            <div className="flex items-center justify-between gap-16">
              <div className="flex flex-col gap-6">
                <h3 className="text-foreground text-3xl font-medium">Design</h3>
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/tools/figma.svg"
                    alt="Figma logo image"
                    className="w-24 h-24"
                  />
                  <img
                    src="/icons/tools/excalidraw.png"
                    alt="Excalidraw logo image"
                    className="w-16 h-16"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-16">
                <h3 className="text-foreground text-3xl font-medium">
                  Front-end
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/tools/react.svg"
                    alt="React logo image"
                    className="w-16 h-16"
                  />
                  <img
                    src="/icons/tools/typescript.svg"
                    alt="Typescript logo image"
                    className="w-16 h-16"
                  />
                  <img
                    src="/icons/tools/next-js.svg"
                    alt="Next JS logo image"
                    className="w-16 h-16"
                  />
                  <img
                    src="/icons/tools/tailwind-css.png"
                    alt="Tailwind logo image"
                    className="w-16 h-16"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-16">
                <h3 className="text-foreground text-3xl font-medium">
                  For brainstorming and code
                </h3>
                <div className="flex items-center gap-4">
                  <img
                    src="/icons/tools/claude.png"
                    alt="Claude logo image"
                    className="w-16 h-16"
                  />
                  <img
                    src="/icons/tools/open-ai.png"
                    alt="Open ai logo image"
                    className="w-16 h-16"
                  />
                </div>
              </div>
            </div>
            <p className="text-foreground text-2xl font-normal leading-relaxed mt-24 max-w-2xl">
              I don't choose a technology because it's fashionable. I choose the
              tool that corresponds to the problem.
            </p>
          </div>
          {/* sixth section */}
          <div className="pt-24 pb-12">
            <div>
              <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-12 lg:mb-20 max-w-xl">
                And when I'm not in front of my screen?
              </h2>
              <div className="flex items-center justify-between gap-12">
                <div className=" max-w-md">
                  <ul className="space-y-4">
                    <li className="text-foreground-alt-a text-xl">I run,</li>
                    <li className="text-foreground-alt-a text-xl">
                      I play basketball,
                    </li>
                    <li className="text-foreground-alt-a text-xl">
                      I experiment with new ideas,
                    </li>
                    <li className="text-foreground-alt-a text-xl">
                      I like to read books,
                    </li>
                    <li className="text-foreground-alt-a text-xl">
                      I like to listen to music
                    </li>
                    <li className="text-foreground-alt-a text-xl">
                      I'm probably taking apart something I should leave alone
                      😅.
                    </li>
                  </ul>
                </div>
                <div className="max-w-xl">
                  <img
                    src="/images/others/reads.png"
                    alt="Hoobies image"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-4xl py-24 flex justify-center">
            <div className="flex flex-col items-center">
              <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium text-center leading-tight mb-12 lg:mb-20 max-w-2xl">
                Code is what I use to build. Experience is what I'm really
                trying to create.
              </h2>
              <p className="text-foreground text-xl leading-relaxed text-center flex items-center max-w-md">
                Now you know who is behind the screen. So what you're trying to
                build?
              </p>
              <div className="text-center mt-16">
                <Button className="px-8 py-6 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                  Let's talk about your project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
