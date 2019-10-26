import React, { ComponentProps } from "react";

type SearchIconProps = ComponentProps<"svg">;
export const SearchIcon: React.FC<SearchIconProps> = props => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <mask id="SearchIcon_clipPath">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle cx={11} cy={11} r={8} fill="black" stroke="black" />
      </mask>
      <circle cx={11} cy={11} r={8} />
      <path d="M21 21L16.65 16.65" mask="url(#SearchIcon_clipPath)" />
    </svg>
  );
};
