import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";

export type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo(props: LogoProps) {
  const { size = 32, className } = props;

  return (
    <Link to={ROUTES.HOME} aria-label="Go to home page">
      <img
        src="/images/others/logo32.svg"
        srcSet="/images/others/logo16.svg 16w, /images/others/logo32.svg 32w, /images/others/logo64.svg 64w, /images/others/logo128.svg 128w"
        sizes={`${size}px`}
        width={size}
        height={size}
        alt="Website logo"
        loading="lazy"
        className={className}
      />
    </Link>
  );
}
