import { useCallback, useState } from "react";
import Button from "../Button";
import SketchCard from "../forms/SketchCard";
import SketchField from "../forms/SketchField";
import SketchRadio from "../forms/SketchRadio";
import SketchTextarea from "../forms/SketchTextarea";
import ContactToast from "./ContactToast";
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
  const [toastVisible, setToastVisible] = useState(false);

  const closeToast = useCallback(() => setToastVisible(false), []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

    if (!formspreeId) {
      setStatus("error");
      setToastVisible(true);
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
      setToastVisible(true);
      form.reset();
    } catch {
      setStatus("error");
      setToastVisible(true);
    }
  }

  const isSending = status === "sending";
  const toastTone =
    status === "sent" ? "success" : status === "error" ? "error" : null;

  return (
    <>
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
                className="px-8 py-4 lg:py-2 text-lg lg:text-lg"
              >
                {isSending ? t.sending : t.submit}
              </Button>
            </div>
          </div>
        </form>
      </SketchCard>
      {toastVisible && toastTone && (
        <ContactToast
          tone={toastTone}
          title={
            toastTone === "success" ? t.toastSuccessTitle : t.toastErrorTitle
          }
          message={toastTone === "success" ? t.success : t.error}
          dismissLabel={t.dismiss}
          onClose={closeToast}
        />
      )}
    </>
  );
}
