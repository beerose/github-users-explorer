import React from "react";

import { ErrorMessage } from "../types";

type ErrorDisplayProps = {
  error: ErrorMessage;
};
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return <section>{error.message}</section>;
};
