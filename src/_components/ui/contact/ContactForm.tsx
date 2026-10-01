import { useState } from "react";
import Button from "../Button";
import SketchCard from "../forms/SketchCard";
import SketchField from "../forms/SketchField";
import SketchRadio from "../forms/SketchRadio";
import SketchTextarea from "../forms/SketchTextarea";

const PROJECT_TYPES = [
  "A web product",
  "Improve something existing",
  "A site/landing page",
  "I do not know yet",
];

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

    if (!formspreeId) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree responded with ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const isSending = status === "sending";

  return (
    <SketchCard>
      <form className="flex flex-col gap-8 lg:gap-12" onSubmit={handleSubmit}>
        {/* Honeypot anti-spam : les humains ne le voient/remplissent jamais */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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

        <div className="flex flex-col gap-4">
          <div className="flex justify-center lg:justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={isSending}
              className="px-8 py-2 text-md"
            >
              {isSending ? "Sending..." : "Start conversation"}
            </Button>
          </div>
          {status === "sent" && (
            <p
              role="status"
              className="text-center lg:text-right text-foreground"
            >
              Message sent. I&apos;ll answer you soon.
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="text-center lg:text-right text-foreground"
            >
              Something went wrong. Try again or write me on WhatsApp.
            </p>
          )}
        </div>
      </form>
    </SketchCard>
  );
}
