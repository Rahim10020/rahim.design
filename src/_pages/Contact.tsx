import ContactForm from "../_components/ui/contact/ContactForm";
import SocialRow from "../_components/ui/contact/SocialRow";
import EmailLink from "../_components/ui/EmailLink";
import BlueprintNote from "../_components/ui/forms/BlueprintNote";

export default function ContactPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-page-x pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-8xl">
          <div className="flex items-start justify-between">
            <h1 className="text-4xl md:text-5xl font-medium text-foreground max-w-md">
              Let's start with your project.
            </h1>
            <h2 className="hidden md:block text-2xl lg:text-4xl font-medium text-foreground">
              CONTACT
            </h2>
          </div>

          <div className="mt-6 lg:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Formulaire : premier sur mobile, deuxième sur desktop */}
            <div className="order-1 lg:order-2">
              <ContactForm />
            </div>

            {/* Colonne info : deuxième sur mobile, première sur desktop */}
            <div className="order-2 lg:order-1 flex flex-col gap-24 lg:gap-36">
              <BlueprintNote />
              <div className="flex flex-col gap-8 items-center text-center lg:items-start lg:text-left">
                <EmailLink
                  label="rahim100codeur@gmail.com"
                  className="underline underline-offset-8 decoration-2"
                />
                <SocialRow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
