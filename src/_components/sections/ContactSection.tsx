import { useEffect, useState } from "react";
import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WHATSAPP_URL,
} from "../../routes";

const EMAIL = "rahim100codeur@gmail.com";

const SOCIALS = [
  { label: "Github", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Whatsapp", href: WHATSAPP_URL },
];

function useLomeTime() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Africa/Lome",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function ContactSection() {
  return (
    <section className="w-full bg-background my-section lg:py-section-lg">
      <div className="max-w-350 mx-auto px-page-x">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-block">
            {/* Left col */}
            <div className="lg:col-span-5"></div>
            {/* Center col */}
            <div className="lg:col-span-4"></div>
            {/* Right col */}
            <div className="lg:col-span-3"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
