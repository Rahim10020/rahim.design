import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface ButtonLinkProps {
  to: string;
  buttonClassName: string;
  linkClassName?: string;
  children: ReactNode;
}

/** Combo lien + bouton CTA (pages About / Services). */
export default function ButtonLink({
  to,
  buttonClassName,
  linkClassName = "inline-flex",
  children,
}: ButtonLinkProps) {
  return (
    <Link to={to} className={linkClassName}>
      <Button className={buttonClassName}>{children}</Button>
    </Link>
  );
}
