import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../../test/testUtils";
import { Repository } from "../types";
import { RepositoryCards } from "./RepositoryCards";

const repos: Repository[] = [
  {
    name: "typescript-build2016-demos",
    html_url: "https://github.com/ahejlsberg/typescript-build2016-demos",
    description: "Collection of TypeScript demo projects form //build 2016",
    stargazers_count: 64,
  },
];

describe("RepositoryCards", () => {
  it("matches snapshots", () => {
    const { asFragment } = render(<RepositoryCards repositories={repos} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
