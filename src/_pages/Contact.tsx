import SocialRow from "../_components/ui/contact/SocialRow";
import BlueprintNote from "../_components/ui/forms/BlueprintNote";

export default function ContactPage() {
  return (
    <section className="w-full bg-background min-h-screen">
      <div className="max-w-350 mx-auto px-page-x pt-12 pb-24 mb-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* TODO: coder la page contact ici (voir contactpage.png) */}
          <h1 className="text-4xl md:text-6xl font-medium text-foreground">
            Contact.
          </h1>
          <SocialRow />
        </div>
      </div>
    </section>
  );
}
