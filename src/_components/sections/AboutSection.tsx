import Logo from "../ui/Logo";

export default function AboutSection() {
  return (
    <section className="flex min-h-[calc(100svh-104px)] w-full bg-background">
      <div className="max-w-350 mx-auto flex w-full px-2">
        <div className="mx-auto w-full max-w-6xl py-12 mt-16">
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
          {/* Second line */}
          <div className="">
            <h1 className="text-4xl md:text-6xl font-medium">Designer,</h1>
            <h1 className="text-4xl md:text-6xl font-medium">Coder💀</h1>
          </div>
          {/* Third line */}
          <div className="flex justify-end">
            <div className="border-l-2 pl-4 max-w-xl">
              <p>
                I'm the type of developer who notices when a button is
                misaligned by 4 pixels.
              </p>
              <p>
                More seriously, I like to understand why an interface works —
                and especially why it doesn't work.
              </p>
              <p>
                I work at the intersection of web design and development, with
                an obsession with clean interfaces, details that matter, and
                experiences that feel natural.
              </p>
              <p>
                My goal is simple: build products that you will be proud to show
                off and that your users will enjoy using.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
