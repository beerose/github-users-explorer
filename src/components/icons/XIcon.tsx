import React, { ComponentProps } from "react";

type XIconProps = ComponentProps<"svg">;
export const XIcon: React.FC<XIconProps> = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-x"
    {...props}
  >
    <path d="M18 6L6 18 M6 6L18 18" />
  </svg>
);
