import { SECTION_IDS } from "../../routes";
import Button from "../ui/Button";

export default function ContactSection() {
  return (
    <section
      id={SECTION_IDS.CONTACT}
      className="flex min-h-[calc(100svh-104px)] w-full bg-background"
    >
      <div className="max-w-350 mx-auto flex w-full px-2">
        <div className="mx-auto w-full max-w-6xl">
          {/* 1st line */}
          <div>
            <h1 className="text-foreground text-4xl md:text-7xl">So</h1>
          </div>
          {/* 2nd line */}
          <div>
            <h1 className="text-foreground text-4xl md:text-7xl">What</h1>
          </div>
          {/* 3rd line */}
          <div>
            <p className="text-foreground text-xl leading-relaxed">
              No need to have all the answers. Come up with the idea, we'll
              start there.
            </p>
            <div>
              <h1 className="text-foreground text-4xl md:text-7xl">are we</h1>
              <h1 className="text-foreground text-4xl md:text-7xl">
                Building ?
              </h1>
            </div>
          </div>
          {/* 4th line */}
          <div className="flex items-center justify-between">
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
          <div></div>
        </div>
      </div>
    </section>
  );
}
