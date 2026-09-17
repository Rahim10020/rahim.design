import { useState } from "react";
import Button from "../_components/ui/Button";
import KnowMeCard from "../_components/ui/cards/KnowMeCard";
import ProjectCard from "../_components/ui/cards/ProjectCard";
import { projects } from "../data/project";
import { getProjectPath, ROUTES, WHATSAPP_URL } from "../routes";
import { workwithmeData } from "../data/workwithme";
import { Link } from "react-router-dom";
import { ArrowDownIcon, ChevronRightIcon } from "../_components/icons";

const faqItems = [
  {
    question: "I only have one idea. Is this enough to start with?",
    answer:
      "Yes. You don't need to have perfectly defined specifications. The first exchanges serve precisely to understand what you want to build and determine what the project really needs.",
  },
  {
    question:
      "I already have the models. Can you just take care of development?",
    answer:
      "Yes. If your design is already ready, I can focus on integrating and developing it.",
  },
  {
    question: "Can you take care of the design and development?",
    answer:
      "Yes. This is one of my main ways of working: designing the experience, then transforming it directly into a product.",
  },
  {
    question: "Do you only work on new projects?",
    answer:
      "No. I can also work on an existing product or site to improve its interface, its experience, or certain technical aspects.",
  },
  {
    question: "How does a collaboration begin?",
    answer:
      "You just tell me what you're trying to build. No need to prepare a 30-page document. We start with a conversation.",
  },
] as const;

export default function ServicesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-6 pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* First section */}
          <div className="mb-24">
            <div className="flex flex-col gap-2 mb-32">
              <div className="flex items-center justify-end">
                <h1 className="text-4xl font-medium text-foreground">
                  SERVICES
                </h1>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-medium text-foreground">
                  You have something to build.
                </h1>
              </div>
            </div>
            {/* Center */}
            <div className="mx-auto max-w-3xl flex flex-col gap-8">
              <p className="text-foreground text-2xl leading-relaxed max-w-2xl">
                An idea, a product, a site or an experience that deserves to be
                better thought out? I help you move from the idea to something
                clear, beautiful and truly usable — from design to development.
              </p>
              {/* Buttons */}
              <div className="flex items-center gap-4">
                <Button className="px-6 py-4 text-xl font-medium bg-primary border-2 border-foreground text-foreground">
                  Let's talk about your project
                </Button>
                <Button className="px-6 py-4 text-xl font-medium bg-white border-2 border-foreground text-foreground">
                  See my projects
                </Button>
              </div>
            </div>
          </div>
          {/* Second section */}
          <div className="py-24 mx-auto max-w-6xl flex flex-col gap-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium max-w-md">
                  Do you have an idea ?
                </h3>
                <h5 className="text-foreground text-xl leading-relaxed">
                  I can design the experience.
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-lg">
                  We start from your idea, even when it is still just a sketch
                  in your head. I transform your needs into a clear experience:
                  structure, route, wireframes, interface and prototype.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>What i can do</h4>
              </div>
              <div className="min-w-lg">
                <ul className="flex flex-col gap-4">
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    UX research & product thinking
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    User flows
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Wireframes
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    UI Design
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Prototyping
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Design systems
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Responsive Design
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt="placeholder image"
                loading="lazy"
                className="w-full h-120 object-cover"
              />
            </div>
          </div>
          {/* Third section */}
          <div className="py-24 mx-auto max-w-6xl flex flex-col gap-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium max-w-md">
                  Already have the design ?
                </h3>
                <h5 className="text-foreground text-xl leading-relaxed">
                  I can build the product.
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-lg">
                  We start from your idea, even when it is still just a sketch
                  in your head. I transform your needs into a clear experience:
                  structure, route, wireframes, interface and prototype.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>What i can do</h4>
              </div>
              <div className="min-w-lg">
                <ul className="flex flex-col gap-4">
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Integration of models
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Frontend development
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Responsive interfaces Wireframes
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Interactions & animations
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Reusable components
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Performance optimization
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt="placeholder image"
                loading="lazy"
                className="w-full h-120 object-cover"
              />
            </div>
          </div>
          {/* Fourth section */}
          <div className="py-24 mx-auto max-w-6xl flex flex-col gap-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium max-w-md">
                  Do you need to be visible online ?
                </h3>
                <h5 className="text-foreground text-xl leading-relaxed">
                  I can create your site.
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-lg">
                  Your site doesn't just have to look pretty. It should explain
                  what you do, inspire confidence, and give the right people a
                  reason to contact you.
                </p>
                <p className="text-foreground text-xl leading-relaxed max-w-lg">
                  I design and develop showcase sites and landing pages that
                  highlight your activity while keeping the experience simple
                  and intuitive.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>What i can do</h4>
              </div>
              <div className="min-w-lg">
                <ul className="flex flex-col gap-4">
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Showcase sites
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Landing pages
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Personal sites
                  </li>
                </ul>
              </div>
            </div>
            <div className="my-4">
              {/* Placeholder */}
              <img
                src="/images/others/image_placeholder.svg"
                alt="placeholder image"
                loading="lazy"
                className="w-full h-120 object-cover"
              />
            </div>
          </div>
          {/* Fith section */}
          <div className="py-24 mx-auto max-w-6xl flex flex-col gap-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-foreground text-4xl font-medium max-w-md">
                  Already have something that works ?
                </h3>
                <h5 className="text-foreground text-xl leading-relaxed">
                  I can improve it.
                </h5>
              </div>
              <div>
                <p className="text-foreground text-xl leading-relaxed max-w-lg">
                  Not everything needs to be rebuilt from scratch.
                </p>
                <p className="text-foreground text-xl leading-relaxed max-w-lg">
                  I can take your existing site or product, identify what
                  creates friction and improve the experience, interface or
                  certain technical aspects.
                </p>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <div className="text-3xl text-foreground font-medium">
                <h4>What i can do</h4>
              </div>
              <div className="min-w-lg">
                <ul className="flex flex-col gap-4">
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    UX/UI Audit
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Interface redesign
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Simplification of routes
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Visual improvements
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Frontend optimization
                  </li>
                  <li className="text-foreground text-xl font-normal flex items-center gap-3 before:size-3 before:shrink-0 before:rounded-full before:bg-foreground before:content-['']">
                    Fixed interface issues
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Sixth section */}
          <div className="py-24">
            <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xl">
              And concretely, what does working together look like ?
            </h2>

            {/* knowme Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-x-16 lg:gap-y-14">
              {workwithmeData.map((step) => (
                <KnowMeCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
          {/* Seventh section */}
          <div className="py-24">
            <div className="flex flex-col">
              <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xl">
                Want to see what it looks like in practice?
              </h2>
              <div className="flex items-center justify-end">
                <p className="text-foreground text-xl font-normal max-w-lg">
                  Here are some projects where I had the opportunity to
                  transform an idea, a problem or an interface into something
                  concrete.
                </p>
              </div>
            </div>
            {/* Projects */}
            <div className="flex items-between gap-8 mt-16">
              <div className="flex items-center gap-8">
                {projects.slice(0, 3).map((project) => (
                  <ProjectCard
                    key={project.title}
                    title={project.title}
                    category={project.category}
                    href={getProjectPath(project.slug)}
                    imageHeight={project.imageHeight}
                    imageSrc={project.imageSrc}
                  />
                ))}
              </div>
              <div className="shrink-0 snap-center flex items-center self-center pl-element pr-heading-content">
                <Link
                  to={ROUTES.PROJECTS.LIST}
                  className="flex items-center text-foreground text-xl font-medium underline underline-offset-4 hover:opacity-70 transition-opacity whitespace-nowrap"
                >
                  See all projects <ChevronRightIcon className="pl-tight" />
                </Link>
              </div>
            </div>
          </div>
          {/* Eight section */}
          <div className="py-24">
            <h2 className="text-foreground text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight mb-16 lg:mb-20 max-w-xl">
              Frequently Asked Question
            </h2>
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-col gap-4">
                {faqItems.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  const answerId = `faq-answer-${index}`;
                  const questionId = `faq-question-${index}`;

                  return (
                    <div
                      key={item.question}
                      className="border-2 border-foreground bg-background-alt"
                    >
                      <h3>
                        <button
                          type="button"
                          id={questionId}
                          aria-expanded={isOpen}
                          aria-controls={answerId}
                          onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                          className="flex w-full cursor-pointer items-center justify-between gap-6 px-4 py-4 text-left text-lg font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-foreground-alt-a sm:px-6 sm:text-2xl"
                        >
                          <span>{item.question}</span>
                          <ArrowDownIcon
                            size={18}
                            aria-hidden="true"
                            className={`shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </h3>
                      <div
                        id={answerId}
                        role="region"
                        aria-labelledby={questionId}
                        hidden={!isOpen}
                        className="px-4 pb-5 sm:px-6 sm:pb-6 sm:pt-6"
                      >
                        <p className="max-w-2xl text-base leading-relaxed text-foreground sm:text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-24 text-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex"
                >
                  <Button className="px-8 py-4 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                    Let's talk about your project
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
