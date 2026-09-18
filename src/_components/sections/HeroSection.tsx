import Button from "../ui/Button";
import Words from "../ui/for-animation/Words";

export default function HeroSection() {
  return (
    <section className="flex min-h-[calc(100svh-104px)] w-full bg-background">
      <div className="max-w-350 mx-auto flex w-full px-page-x">
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between py-block mt-block">
          <div className="w-full">
            <div className="flex flex-col gap-block">
              <div className="w-full">
                {/* Headline */}
                <h1 className="text-5xl md:text-5xl lg:text-7xl font-medium text-foreground max-w-md md:max-w-2xl lg:max-w-4xl text-center lg:text-left mx-auto lg:mx-0">
                  <Words
                    text="You have an idea. Let's make it something people will want to
                  use."
                    highlight={{ "idea.": "" }}
                  />
                </h1>
              </div>

              <div className="w-full flex justify-center lg:justify-end">
                <div className="flex flex-col items-center lg:items-end justify-end gap-12 md:gap-comfortable text-center lg:text-right">
                  <p className="text-foreground text-xl md:text-2xl leading-relaxed font-normal max-w-xs md:max-w-md">
                    I am Rahim ALI. I design and code things that make the web
                    feel simple, intuitive, and alive.
                  </p>

                  <div>
                    <Button className="px-8 py-4 text-xl md:text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
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
