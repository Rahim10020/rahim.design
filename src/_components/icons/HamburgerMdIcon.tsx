
import type { IconProps } from "./types";

const HamburgerMdIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 17H19M5 12H19M5 7H19"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HamburgerMdIcon;
