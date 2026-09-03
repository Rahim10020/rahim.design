import PieChart from "../_components/ui/others/PieChart";

export default function AboutPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div className="flex items-center justify-between gap-16">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-7xl font-medium text-foreground">
                About
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
        </div>
      </div>
    </section>
  );
}
