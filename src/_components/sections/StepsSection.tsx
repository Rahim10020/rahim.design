import StepCard from "../ui/cards/StepCard";
import { stepsData } from "../../data/steps";

export default function StepsSection() {
  return (
    <section className="w-full min-h-[calc(100svh-104px)] bg-background py-section lg:py-section-lg">
      <div className="max-w-350 mx-auto px-page-x">
        <div className="mx-auto max-w-6xl">
          {/* Title */}
          <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-heading-content lg:mb-major max-w-2xl">
            This is how we will move from your idea to something concrete
          </h2>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-heading-content lg:gap-x-section lg:gap-y-cluster">
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
