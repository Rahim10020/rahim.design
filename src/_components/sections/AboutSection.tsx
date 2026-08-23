import Logo from "../ui/Logo";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="flex min-h-[calc(100svh-104px)] w-full bg-background"
    >
      <div className="max-w-350 mx-auto flex w-full px-2 border-b-2 border-foreground">
        <div className="mx-auto w-full max-w-6xl py-12 mt-16 space-y-12">
          {/* First line */}
          <div className="flex items-start justify-between">
            <div className="border-r-2 pr-2">
              <Logo size={128} />
            </div>
            <div className="flex items-start justify-end">
              <h2 className="text-2xl md:text-4xl font-medium">
                Behind the screen
              </h2>
            </div>
          </div>
          <div>
            {/* Second line */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-7xl font-medium text-foreground">
                Designer,
              </h1>
              <h1 className="text-4xl md:text-7xl font-medium text-foreground">
                Coder💀
              </h1>
            </div>
            {/* Third line */}
            <div className="flex justify-end">
              <div className="max-w-2xl space-y-6">
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed">
                  I'm the type of developer who notices when a button is
                  misaligned by 4 pixels.
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed">
                  More seriously, I like to understand why an interface works —
                  and especially why it doesn't work.
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed">
                  I work at the intersection of web design and development, with
                  an obsession with clean interfaces, details that matter, and
                  experiences that feel natural.
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed">
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
