import { ROUTES } from "../../routes";

export type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo(props: LogoProps) {
  const { size = 64, className } = props;

  return (
    <a href={ROUTES.HOME}>
      <img
        src="/images/logo64.svg"
        srcSet="/images/logo16.svg 16w, /images/logo32.svg 32w, /images/logo64.svg 64w, /images/logo128.svg 128w"
        sizes={`${size}px`}
        width={size}
        height={size}
        alt="Website logo"
        className={className}
      />
    </a>
  );
}
