import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="w-full bg-background">
      <div className="max-w-350 mx-auto px-2">
        <div className="py-12 my-12 max-w-6xl mx-auto w-full">
          <div className="w-full">
            <div className="flex flex-col gap-8">
              <div className="w-full">
                {/* Headline */}
                <h1 className="text-2xl md:text-4xl lg:text-6xl font-medium text-foreground max-w-4xl">
                  You have an idea. Let's make it something people will want to
                  use.
                </h1>
              </div>

              <div className="w-full flex justify-end">
                <div className="flex flex-col justify-end gap-6">
                  <p className="text-foreground text-base sm:text-lg leading-relaxed max-w-md">
                    I design and code beautifully simple things that make the
                    web feel intuitive and alive — and I genuinely love what I
                    do.
                  </p>

                  <div>
                    <Button className="px-8 py-4 text-lg bg-primary border-2 border-foreground text-foreground">
                      So what are we building?
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
