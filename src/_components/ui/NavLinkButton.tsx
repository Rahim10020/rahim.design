export type NavLinkButtonProps = {
  label: string;
  href: string;
  className?: string;
};

export default function NavLinkButton(props: NavLinkButtonProps) {
  const { label = "label", href, className } = props;
  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}
