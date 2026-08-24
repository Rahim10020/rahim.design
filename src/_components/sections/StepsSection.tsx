import StepCard from "../ui/StepCard";

interface Step {
  number: string;
  title: string;
  description: string;
  backgroundColor: string;
  textColor: "light" | "dark";
}

const stepsData: Step[] = [
  {
    number: "01",
    title: "We start by talking",
    description:
      "Before I think about colors, components, or code, I want to understand what you're actually trying to build.",
    backgroundColor: "#f4ed55",
    textColor: "dark",
  },
  {
    number: "02",
    title: "We put the idea in order",
    description:
      "I transform needs, constraints and ideas into a clear experience.",
    backgroundColor: "#1e1e1e",
    textColor: "light",
  },
  {
    number: "03",
    title: "We give it a shape",
    description:
      "Design, interactions, responsive, visual details: we build something that makes you want to be used.",
    backgroundColor: "#1982c4",
    textColor: "light",
  },
  {
    number: "04",
    title: "I then move on to the code",
    description:
      "I transform the design into a clean, efficient interface that is faithful to the initial intention.",
    backgroundColor: "#f9c74f",
    textColor: "dark",
  },
];

export default function StepsSection() {
  return (
    <section className="w-full min-h-[calc(100svh-104px)] bg-background py-20 lg:py-28">
      <div className="max-w-350 mx-auto px-2">
        <div className="mx-auto max-w-6xl">
          {/* Title */}
          <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-2xl">
            This is how we will move from your idea to something concrete
          </h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-14">
            {stepsData.map((step) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                backgroundColor={step.backgroundColor}
                textColor={step.textColor}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
