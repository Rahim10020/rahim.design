import type { IconProps } from "./types";

const ChevronLeftIcon = ({
  size = 24,
  color = "currentColor",
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 7H0.5"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4 3.5L0.5 7L4 10.5"
      stroke={color}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ChevronLeftIcon;
