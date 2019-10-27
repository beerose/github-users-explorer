import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../../test/testUtils";
import { ErrorDisplay } from "./ErrorDisplay";

describe("ErrorDisplay", () => {
  const error = { message: "I'm an error message" };

  it("displays proper error message", () => {
    const { getByText } = render(<ErrorDisplay error={error} />);

    expect(getByText(error.message)).toBeInTheDocument();
  });

  it("matches snapshots", () => {
    const { asFragment } = render(<ErrorDisplay error={error} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
