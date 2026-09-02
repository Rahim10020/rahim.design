import { Link } from "react-router-dom";
import Logo from "../_components/ui/Logo";
import Button from "../_components/ui/Button";
import { ArrowLeftIcon } from "../_components/icons";
import { ROUTES } from "../routes";

const values = [
  {
    title: "Typography",
    description:
      "I care about the details that make reading effortless: rhythm, hierarchy, and spacing that guide the eye without shouting.",
  },
  {
    title: "Performance",
    description:
      "Fast is a feature. I keep bundles lean and interactions snappy so pages feel instant on any device.",
  },
  {
    title: "Accessibility",
    description:
      "An interface worth building is one everyone can use. I bake in semantics and keyboard support from the start.",
  },
  {
    title: "Clarity",
    description:
      "No clever tricks for cleverness' sake. I strip away the noise so the product gets to the point cleanly.",
  },
];

const toolbox = [
  "React",
  "TypeScript",
  "GSAP",
  "Tailwind CSS",
  "Framer Motion",
  "Vite",
];

export default function AboutPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* Back link */}
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 text-foreground text-base mb-12"
          >
            <ArrowLeftIcon size={20} />
            <span>Back to home</span>
          </Link>

          {/* Heading */}
          <h1 className="text-foreground text-6xl sm:text-7xl md:text-8xl font-medium tracking-tight mb-16">
            About.
          </h1>

          {/* Block A — Intro */}
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
            <div className="space-y-2">
              <h3 className="text-4xl md:text-7xl font-medium text-foreground">
                Designer,
              </h3>
              <h3 className="text-4xl md:text-7xl font-medium text-foreground">
                Coder💀
              </h3>
            </div>
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
                  an obsession for clean interfaces, details that matter, and
                  experiences that feel natural.
                </p>
                <p className="text-lg md:text-2xl font-normal text-foreground leading-relaxed">
                  My goal is simple: build products that you will be proud to
                  show off and that your users will enjoy using.
                </p>
              </div>
            </div>
          </div>

          {/* Block B — Values */}
          <div className="mt-24">
            <h2 className="text-foreground text-3xl sm:text-4xl font-medium mb-10">
              What drives me
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {values.map((value) => (
                <div key={value.title} className="space-y-3">
                  <h3 className="text-foreground text-xl md:text-2xl font-medium">
                    {value.title}
                  </h3>
                  <p className="text-foreground text-lg font-normal leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Block C — Toolbox */}
          <div className="mt-24">
            <h2 className="text-foreground text-3xl sm:text-4xl font-medium mb-8">
              Toolbox
            </h2>
            <div className="flex flex-wrap gap-3">
              {toolbox.map((tool) => (
                <span
                  key={tool}
                  className="text-foreground text-sm md:text-base border-2 border-foreground px-4 py-2"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Block D — CTA */}
          <div className="mt-24 flex items-center">
            <Link to="/#contact" className="relative inline-block">
              <Button className="px-8 py-4 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                Let's build something
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
