import { SECTION_IDS } from "../../routes";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "../icons";
import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section
      id={SECTION_IDS.CONTACT}
      className="flex min-h-[calc(100svh-104px)] w-full bg-background"
    >
      <div className="max-w-350 mx-auto flex w-full px-2">
        <div className="mx-auto w-full max-w-6xl py-12 mt-16">
          {/* 1st line */}
          <div className="flex justify-center">
            <div className="flex justify-start max-w-md">
              <h1 className="text-foreground text-4xl md:text-9xl">So</h1>
            </div>
          </div>
          {/* 2nd line */}
          <div className="flex justify-end mx-auto max-w-md">
            <div className="flex justify-end max-w-xs">
              <h1 className="text-foreground text-4xl md:text-9xl">What</h1>
            </div>
          </div>
          {/* 3rd line */}
          <div className="flex items-end justify-between max-w-6xl mx-auto mb-16">
            <p className="text-foreground text-xl leading-relaxed max-w-sm">
              No need to have all the answers. Come up with the idea, we'll
              start there.
            </p>
            <div className="flex flex-col items-end">
              <h1 className="text-foreground text-4xl md:text-9xl">are we</h1>
              <h1 className="text-foreground text-4xl md:text-9xl">
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
                href="#"
                className="underline cursor-pointer text-foreground text-xl decoration-2"
              >
                rahim100codeur@gmail.com
              </a>
            </div>
            <Button className="px-8 py-4 text-2xl font-medium bg-primary border-2 border-foreground text-foreground">
              Start a Conversation
            </Button>
          </div>
          {/* 5th line */}
          <div className="flex items-center justify-center gap-8 mt-24">
            <GithubIcon />
            <LinkedinIcon />
            <InstagramIcon />
            <WhatsappIcon />
          </div>
        </div>
      </div>
    </section>
  );
}
