export interface WorkWithMe {
  number: string;
  title: string;
  description: string;
}

export const workwithmeData: WorkWithMe[] = [
  {
    number: "01",
    title: "Understand before you build",
    description:
      "I first seek to understand your objective, your users and the problem we are trying to solve.",
  },
  {
    number: "02",
    title: "Keep things simple",
    description:
      "I prefer a clear experience with little friction to an interface full of features that complicate things unnecessarily.",
  },
  {
    number: "03",
    title: "Pay attention to details",
    description:
      "The little details count: spacing, states, responsive, interactions, transitions... This is often where an interface goes from decent to really nice.",
  },
  {
    number: "04",
    title: "Tell you what I think",
    description:
      "If I see a better way to do something, I'll tell you. The goal is not just to run a list of requests, but to build something that actually works.",
  },
];
