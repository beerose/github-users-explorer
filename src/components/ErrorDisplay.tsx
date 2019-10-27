/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";

import { ErrorMessage } from "../types";

type ErrorDisplayProps = {
  error: ErrorMessage;
};
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <section
      css={css`
        display: flex;
        justify-content: center;
        text-align: center;
      `}
    >
      {error.message}
    </section>
  );
};
