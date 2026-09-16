import Button from "../_components/ui/Button";

export default function ServicesPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div className="mb-24">
            <div className="flex flex-col gap-2 mb-24">
              <div className="flex items-center justify-end">
                <h1 className="text-4xl font-medium text-foreground">
                  SERVICES
                </h1>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-medium text-foreground">
                  You have something to build.
                </h1>
              </div>
            </div>
            {/* Center */}
            <div className="mx-auto max-w-2xl flex flex-col gap-8">
              <p className="text-foreground text-2xl leading-relaxed max-w-2xl">
                An idea, a product, a site or an experience that deserves to be
                better thought out? I help you move from the idea to something
                clear, beautiful and truly usable — from design to development.
              </p>
              {/* Buttons */}
              <div className="flex items-center gap-4">
                <Button className="px-6 py-4 text-xl font-medium bg-primary border-2 border-foreground text-foreground">
                  Let's talk about your project
                </Button>
                <Button className="px-6 py-4 text-xl font-medium bg-white border-2 border-foreground text-foreground">
                  See my projects
                </Button>
              </div>
            </div>
          </div>
          {/* Second section */}
          <div className="py-24 mx-auto max-w-3xl flex flex-col gap-12">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium">
                  Do you have an idea?
                </h3>
                <h5 className="text-foreground text-xl leading-relaxed">
                  I can design the experience.
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-sm">
                  We start from your idea, even when it is still just a sketch
                  in your head. I transform your needs into a clear experience:
                  structure, route, wireframes, interface and prototype.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>What i can do</h4>
              </div>
              <div>
                <ul className="flex flex-col gap-4">
                  <li className="text-foreground text-xl font-normal before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    UX research & product thinking
                  </li>
                  <li className="text-foreground text-xl font-normal">
                    User flows
                  </li>
                  <li className="text-foreground text-xl font-normal">
                    Wireframes
                  </li>
                  <li className="text-foreground text-xl font-normal">
                    UI Design
                  </li>
                  <li className="text-foreground text-xl font-normal">
                    Prototyping
                  </li>
                  <li className="text-foreground text-xl font-normal">
                    Design systems
                  </li>
                  <li className="text-foreground text-xl font-normal">
                    Responsive Design
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
