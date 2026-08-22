import type { IconProps } from "./types";

const AddIcon = ({
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
    <g clip-path="url(#clip0_1545_11084)">
      <path
        d="M7 0.540039V13.54"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M0.5 7H13.5"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_1545_11084">
        <rect width="14" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default AddIcon;
