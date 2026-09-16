export interface KnowMe {
  number: string;
  title: string;
  description: string;
}

export const knowmeData: KnowMe[] = [
  {
    number: "01",
    title: "I ask questions",
    description:
      "Not to complicate the project. To understand what we are really trying to solve.",
  },
  {
    number: "02",
    title: "I pay attention to details",
    description:
      "A spacing, transition, empty state, or button may seem insignificant. Together they shape the experience.",
  },
  {
    number: "03",
    title: "I prefer clarity to complexity",
    description:
      "If something can be made simpler without losing its value, I will usually look in that direction.",
  },
  {
    number: "04",
    title: "I speak to you frankly",
    description:
      "If I think an idea can be improved, I'll tell you. The goal is not just to produce what you ask for, but to build something that actually works.",
  },
];
