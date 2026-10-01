import { useState } from "react";
import Button from "../Button";
import SketchCard from "../forms/SketchCard";
import SketchField from "../forms/SketchField";
import SketchRadio from "../forms/SketchRadio";
import SketchTextarea from "../forms/SketchTextarea";
import { useLocale } from "../../../lib/i18n";
import { getContact } from "../../../locales/contact";

const PROJECT_TYPES = [
  { key: "webProduct", value: "web_product" },
  { key: "improveExisting", value: "improve_existing" },
  { key: "landingPage", value: "landing_page" },
  { key: "unknownYet", value: "unknown" },
] as const;

type SubmitStatus = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const t = getContact(useLocale()).form;
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
            label={t.nameLabel}
            placeholder={t.namePlaceholder}
            autoComplete="name"
            required
          />
          <SketchField
            id="email"
            label={t.emailLabel}
            placeholder={t.emailPlaceholder}
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <fieldset>
          <legend className="text-xl text-foreground mb-4">
            {t.typesLegend}
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {PROJECT_TYPES.map((type) => (
              <SketchRadio
                key={type.key}
                name="projectType"
                value={type.value}
                label={t.types[type.key]}
              />
            ))}
          </div>
        </fieldset>

        <SketchTextarea
          id="message"
          label={t.messageLabel}
          placeholder={t.messagePlaceholder}
          required
        />

        <div className="flex flex-col gap-4">
          <div className="flex justify-center mt-8 lg:mt-0 lg:justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={isSending}
              className="px-8 py-2 text-md"
            >
              {isSending ? t.sending : t.submit}
            </Button>
          </div>
          {status === "sent" && (
            <p
              role="status"
              className="text-center lg:text-right text-foreground"
            >
              {t.success}
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="text-center lg:text-right text-foreground"
            >
              {t.error}
            </p>
          )}
        </div>
      </form>
    </SketchCard>
  );
}
