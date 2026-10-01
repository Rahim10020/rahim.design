import Button from "../Button";
import SketchCard from "../forms/SketchCard";
import SketchField from "../forms/SketchField";
import SketchRadio from "../forms/SketchRadio";
import SketchTextarea from "../forms/SketchTextarea";

const PROJECT_TYPES = [
  "A web product",
  "Improve something existing",
  "An experience/interface",
  "A site/landing page",
  "Je ne sais pas encore",
];

export default function ContactForm() {
  return (
    <SketchCard>
      <form
        className="flex flex-col gap-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SketchField
            id="name"
            label="What should I call you?"
            placeholder="Your name"
            autoComplete="name"
            required
          />
          <SketchField
            id="email"
            label="Where can I answer you?"
            placeholder="your@email.com"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <fieldset>
          <legend className="text-xl text-foreground mb-4">
            What are we going to build?
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {PROJECT_TYPES.map((t) => (
              <SketchRadio key={t} name="projectType" value={t} label={t} />
            ))}
          </div>
        </fieldset>

        <SketchTextarea
          id="message"
          label="Tell me a little about your project."
          placeholder="What are you trying to build ? What problem are you looking to solve ? Where are you now ?"
          required
        />

        <div className="flex justify-end">
          <Button type="submit" variant="primary" className="px-8 py-2 text-md">
            Start conversation
          </Button>
        </div>
      </form>
    </SketchCard>
  );
}
