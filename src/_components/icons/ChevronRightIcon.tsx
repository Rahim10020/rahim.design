import type { IconProps } from "./types";

const ChevronRightIcon = ({
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
    <g clip-path="url(#clip0_1545_9993)">
      <path
        d="M0.5 7H13.5"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 10.5L13.5 7L10 3.5"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1545_9993">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default ChevronRightIcon;
