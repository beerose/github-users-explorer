import { ErrorMessage, isErrorMessage } from "../types";

export const makeErrorMessage = (
  error: unknown,
  handleKnownErrors?: (error: unknown) => string | null
): ErrorMessage => {
  if (handleKnownErrors) {
    const message = handleKnownErrors(error);
    if (message) {
      return { message };
    }
  }

  return isErrorMessage(error) ? error : { message: JSON.stringify(error) };
};
