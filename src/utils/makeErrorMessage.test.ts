import { makeErrorMessage } from "./makeErrorMessage";
import * as github from "../api/githubClient";

describe("makeErrorMessage", () => {
  it("returns the same error if handleKnownErrors is not provided", () => {
    const error = { message: "Not found", status: 404 };

    expect(makeErrorMessage(error)).toBe(error);
  });

  it("handles GitHub HTTP error with known status code", () => {
    const error = new Error("error") as github.HTTPError;
    error.message = "Not found";
    error.status = 404;

    const customMessage = "User XYZ was not found";

    const handleKnownErrors: Parameters<typeof makeErrorMessage>[1] = err => {
      return github.isHTTPError(err) && err.status === 404
        ? customMessage
        : null;
    };

    expect(makeErrorMessage(error, handleKnownErrors)).toMatchObject({
      message: customMessage,
    });
  });

  it("handles GitHub HTTP error with unknown status code", () => {
    const error = new Error("error") as github.HTTPError;
    error.message = "I'm a teapot";
    error.status = 418;

    const handleKnownErrors: Parameters<typeof makeErrorMessage>[1] = err => {
      return github.isHTTPError(err) && err.status === 404 ? "Not found" : null;
    };

    expect(makeErrorMessage(error, handleKnownErrors)).toMatchObject({
      message: error.message,
    });
  });

  it("returns stringified error for unknown error type", () => {
    const error = { e: "I'm some error" };

    expect(makeErrorMessage(error)).toMatchObject({
      message: JSON.stringify(error),
    });
  });
});
