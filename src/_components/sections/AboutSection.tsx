import Logo from "../ui/Logo";

export default function AboutSection() {
  return (
    <section className="flex min-h-[calc(100svh-104px)] w-full bg-background">
      <div className="max-w-350 mx-auto flex w-full px-2">
        <div className="mx-auto w-full max-w-6xl py-12 mt-16">
          <div className="flex items-start justify-between">
            <div className="border-r-2 pr-2">
              <Logo size={128} />
            </div>
            <div className="flex items-start justify-end">
              <h2 className="text-2xl md:4xl lg:6xl font-medium">
                Behind the screen
              </h2>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </section>
  );
}
