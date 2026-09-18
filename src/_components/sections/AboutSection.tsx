import Logo from "../ui/Logo";

export default function AboutSection() {
  return (
    <section className="flex w-full my-section bg-background">
      <div className="max-w-350 mx-auto flex w-full px-page-x">
        <div className="mx-auto w-full max-w-6xl py-block mt-block space-y-block">
          {/* First line — logo + titre (desktop only) */}
          <div className="hidden lg:flex items-start justify-between gap-block">
            <div className="border-r-2 pr-tight">
              <Logo size={128} />
            </div>
            <div className="flex items-start justify-end">
              <h2 className="text-2xl md:text-4xl font-medium">
                Behind the screen
              </h2>
            </div>
          </div>

          {/* Titre mobile */}
          <h2 className="lg:hidden text-4xl md:text-5xl lg:text-4xl font-medium text-foreground text-center">
            Behind the screen
          </h2>

          <div>
            {/* Designer, / Coder💀 — desktop only */}
            <div className="hidden lg:block space-y-tight">
              <h1 className="text-4xl md:text-7xl font-medium text-foreground">
                Designer,
              </h1>
              <h1 className="text-4xl md:text-7xl font-medium text-foreground">
                Coder💀
              </h1>
            </div>

            {/* Paragraphes */}
            <div className="flex justify-center lg:justify-end">
              <div className="max-w-sm md:max-w-lg lg:max-w-2xl space-y-comfortable">
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  I'm the type of developer who notices when a button is
                  misaligned by 4 pixels.
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  More seriously, I like to understand why an interface works —
                  and especially why it doesn't work.
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  I work at the intersection of web design and development, with
                  an obsession with clean interfaces, details that matter, and
                  experiences that feel natural.
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed text-center lg:text-left">
                  My goal is simple: build products that you will be proud to
                  show off and that your users will enjoy using.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
