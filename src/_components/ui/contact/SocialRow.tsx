import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WHATSAPP_URL,
} from "../../../routes";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from "../../icons";

const ITEMS = [
  { label: "GitHub", href: GITHUB_URL, Icon: GithubIcon },
  { label: "Instagram", href: INSTAGRAM_URL, Icon: InstagramIcon },
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: LinkedinIcon },
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: WhatsappIcon },
];

export default function SocialRow() {
  return (
    <ul className="flex items-center gap-6">
      {ITEMS.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="block hover:scale-105 transition-transform"
          >
            <Icon size={44} />
          </a>
        </li>
      ))}
    </ul>
  );
}
