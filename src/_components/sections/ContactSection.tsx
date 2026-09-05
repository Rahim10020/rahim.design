import {
  WHATSAPP_URL,
  GITHUB_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
} from "../../routes";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "../icons";
import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section className="flex min-h-[calc(100svh-104px)] w-full bg-background">
      <div className="max-w-350 mx-auto flex w-full px-2">
        <div className="mx-auto w-full max-w-6xl pt-12 mt-16">
          {/* 1st line */}
          <div className="flex justify-center">
            <div className="flex justify-start max-w-md">
              <h1 className="text-foreground text-4xl md:text-8xl">So</h1>
            </div>
          </div>
          {/* 2nd line */}
          <div className="flex justify-end mx-auto max-w-md">
            <div className="flex justify-end max-w-xs">
              <h1 className="text-foreground text-4xl md:text-8xl">What</h1>
            </div>
          </div>
          {/* 3rd line */}
          <div className="flex items-end justify-between max-w-6xl mx-auto mb-16">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-start gap-8">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-foreground-alt-a transition-all duration-300"
                >
                  <GithubIcon size={46} />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-foreground-alt-a transition-all duration-300"
                >
                  <LinkedinIcon size={46} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-foreground-alt-a transition-all duration-300"
                >
                  <InstagramIcon size={46} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="hover:text-foreground-alt-a transition-all duration-300"
                >
                  <WhatsappIcon size={46} />
                </a>
              </div>
              <p className="text-foreground text-2xl leading-relaxed max-w-sm">
                No need to have all the answers. Come up with the idea, we'll
                start there.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-foreground text-4xl md:text-8xl">are we</h1>
              <h1 className="text-foreground text-4xl md:text-8xl">
                Building ?
              </h1>
            </div>
          </div>
          {/* 4th line */}
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div>
              <p className="text-foreground text-xl font-normal">
                Write directly to:
              </p>
              <a
                href="mailto:rahim100codeur@gmail.com"
                className="hover:underline cursor-pointer text-foreground text-2xl decoration-2"
              >
                rahim100codeur@gmail.com
              </a>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block"
            >
              <Button className="px-12 py-6 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
                Start a Conversation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
