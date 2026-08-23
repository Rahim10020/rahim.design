import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <section className="w-full bg-background">
      <div className="max-w-350 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-100px)]">
          {/*  Left content  */}
          <div className="flex flex-col justify-between py-12 lg:py-16 lg:pr-12">
            <div className="space-y-8">
              {/* Headline */}
              <h1 className="text-[2.5rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.2rem] xl:text-[3.4rem] leading-[1.15] font-medium text-[#1e1e1e] tracking-tight">
                You have an idea. Let's
                <br />
                make it something
                <br />
                people will want to use.
              </h1>

              {/* Description */}
              <p className="text-[#1e1e1e] text-base sm:text-lg leading-relaxed max-w-md">
                I design and code beautifully simple things that make the web
                feel intuitive and alive — and I genuinely love what I do.
              </p>

              {/* CTA */}
              <div className="pt-2">
                <Button className="px-8 py-3.5 text-[15px] rounded-sm">
                  So what are we building?
                </Button>
              </div>
            </div>

            {/* Name at bottom */}
            <div className="mt-16 lg:mt-0">
              <p className="text-[#1e1e1e] text-xl sm:text-2xl font-medium tracking-wide">
                Rahim ALI
              </p>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative hidden lg:block border-l border-foreground">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0">
              {/* Row 1 */}
              <div className="bg-foreground col-span-1 row-span-1" />
              <div className="bg-transparent col-span-1 row-span-1" />
              <div className="bg-transparent col-span-1 row-span-1" />

              {/* Row 2 */}
              <div className="bg-transparent col-span-1 row-span-1" />
              <div className="bg-foreground col-span-1 row-span-1" />
              <div className="bg-foreground col-span-1 row-span-1" />

              {/* Row 3 */}
              <div className="bg-foreground col-span-1 row-span-1" />
              <div className="bg-transparent col-span-1 row-span-1" />
              <div className="bg-transparent col-span-1 row-span-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
