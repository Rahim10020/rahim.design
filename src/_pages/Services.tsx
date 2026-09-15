import Button from "../_components/ui/Button";

export default function ServicesPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div>
            <div className="flex items-center justify-end">
              <h1 className="text-4xl font-medium text-foreground">SERVICES</h1>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-medium text-foreground">
                You have something to build.
              </h1>
            </div>
            <div>
              <p>
                An idea, a product, a site or an experience that deserves to be
                better thought out? I help you move from the idea to something
                clear, beautiful and truly usable — from design to development.
              </p>
              {/* Buttons */}
              <div>
                <Button className="px-6 py-4 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                  Let's talk about your project
                </Button>
                <Button className="px-6 py-4 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
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
