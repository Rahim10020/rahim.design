import StepCard from "../ui/cards/StepCard";
import { stepsData } from "../../data/steps";

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
