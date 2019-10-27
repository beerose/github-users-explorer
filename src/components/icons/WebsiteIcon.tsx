import React, { ComponentProps } from "react";

type WebsiteIconProps = ComponentProps<"svg">;
export const WebsiteIcon: React.FC<WebsiteIconProps> = props => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-home"
    {...props}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <path d="M9 22L9 12 15 12 15 22" />
  </svg>
);
