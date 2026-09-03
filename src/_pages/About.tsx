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
            <div className="flex items-center gap-16 pt-24">
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
        </div>
      </div>
    </section>
  );
}
