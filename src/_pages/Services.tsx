import Button from "../_components/ui/Button";

export default function ServicesPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div>
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
              <p className="text-foreground text-2xl leading-relaxed max-w-xl">
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
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
