import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="w-full bg-background">
      <div className="max-w-350 mx-auto px-2">
        <div className="py-12 my-12">
          <div className="flex items-center justify-center">
            <div className="w-full">
              {/* Headline */}
              <h1 className="font-serif text-[2.5rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.1] text-foreground tracking-tight">
                You have an idea. Let's
                <br />
                make it something
                <br />
                people will want to use.
              </h1>

              {/* Right column: description + CTA, aligned to bottom */}
              <div className="flex flex-col justify-end gap-6">
                <p className="text-foreground text-base sm:text-lg leading-relaxed max-w-md">
                  I design and code beautifully simple things that make the web
                  feel intuitive and alive — and I genuinely love what I do.
                </p>

                <div>
                  <Button className="px-8 py-3.5 text-[15px] rounded-sm bg-transparent border border-foreground text-foreground hover:bg-foreground hover:text-white transition-colors">
                    So what are we building?
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
