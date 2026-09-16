import Button from "../_components/ui/Button";

export default function ServicesPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div className="mb-24">
            <div className="flex flex-col gap-2 mb-32">
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
            <div className="mx-auto max-w-5xl flex flex-col gap-8">
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
          <div className="py-24 mx-auto max-w-5xl flex flex-col gap-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium">
                  Do you have an idea ?
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
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    UX research & product thinking
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    User flows
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Wireframes
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    UI Design
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Prototyping
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Design systems
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Responsive Design
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt="placeholder image"
                className="w-full h-100 object-cover"
              />
            </div>
          </div>
          {/* Third section */}
          <div className="py-24 mx-auto max-w-5xl flex flex-col gap-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium">
                  Already have the design ?
                </h3>
                <h5 className="text-foreground text-xl leading-relaxed">
                  I can build the product.
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
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Integration of models
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Frontend development
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Responsive interfaces Wireframes
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Interactions & animations
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Reusable components
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Performance optimization
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt="placeholder image"
                className="w-full h-100 object-cover"
              />
            </div>
          </div>
          {/* Fourth section */}
          <div className="py-24 mx-auto max-w-5xl flex flex-col gap-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium">
                  Do you need to be visible online ?
                </h3>
                <h5 className="text-foreground text-xl leading-relaxed">
                  I can create your site.
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-sm">
                  Your site doesn't just have to look pretty. It should explain
                  what you do, inspire confidence, and give the right people a
                  reason to contact you.
                </p>
                <p className="text-foreground text-xl leading-relaxed max-w-sm">
                  I design and develop showcase sites and landing pages that
                  highlight your activity while keeping the experience simple
                  and intuitive.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>What i can do</h4>
              </div>
              <div>
                <ul className="flex flex-col gap-4">
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Showcase sites
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Landing pages
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Personal sites
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt="placeholder image"
                className="w-full h-100 object-cover"
              />
            </div>
          </div>
          {/* Fith section */}
          <div className="py-24 mx-auto max-w-5xl flex flex-col gap-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium">
                  Already have something that works ?
                </h3>
                <h5 className="text-foreground text-xl leading-relaxed">
                  I can improve it.
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-sm">
                  Not everything needs to be rebuilt from scratch.
                </p>
                <p className="text-foreground text-xl leading-relaxed max-w-sm">
                  I can take your existing site or product, identify what
                  creates friction and improve the experience, interface or
                  certain technical aspects.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>What i can do</h4>
              </div>
              <div>
                <ul className="flex flex-col gap-4">
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    UX/UI Audit
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Interface redesign
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Simplification of routes
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Visual improvements
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Frontend optimization
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Fixed interface issues
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
