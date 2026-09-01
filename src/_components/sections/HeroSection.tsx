import Button from "../ui/Button";
import Words from "../ui/for-animation/Words";

export default function HeroSection() {
  return (
    <section className="flex min-h-[calc(100svh-104px)] w-full bg-background">
      <div className="max-w-350 mx-auto flex w-full px-2">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between py-12 mt-16">
          <div className="w-full">
            <div className="flex flex-col gap-12">
              <div className="w-full">
                {/* Headline */}
                <h1 className="text-2xl md:text-4xl lg:text-7xl font-medium text-foreground max-w-4xl">
                  <Words
                    text="You have an idea. Let's make it something people will want to
                  use."
                    highlight={{ "idea.": "" }}
                  />
                </h1>
              </div>

              <div className="w-full flex justify-end">
                <div className="flex flex-col justify-end gap-6">
                  <p className="text-foreground text-base md:text-2xl leading-relaxed font-normal max-w-md">
                    I am Rahim ALI. I design and code things that make the web
                    feel simple, intuitive, and alive.
                  </p>

                  <div>
                    <Button className="px-8 py-4 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
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
