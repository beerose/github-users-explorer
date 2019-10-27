import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../../test/testUtils";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  const username = "jondoe";
  const noop = () => null;

  it("displays username in the input field", () => {
    const { getByDisplayValue } = render(
      <SearchInput value={username} onReset={noop} onChange={noop} />
    );

    expect(getByDisplayValue(username)).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <SearchInput value={username} onReset={noop} onChange={noop} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
