
import type { IconProps } from "./types";

const CloseLgIcon = ({
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
      d="M21 21L12 12M12 12L3 3M12 12L21.0001 3M12 12L3 21.0001"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseLgIcon;
