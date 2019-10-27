import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../../test/testUtils";
import { Repository } from "../types";

import { RepositoryDetails } from "./RepositoryDetails";

const repo: Repository = {
  name: "typescript-build2016-demos",
  html_url: "https://github.com/ahejlsberg/typescript-build2016-demos",
  description: "Collection of TypeScript demo projects form //build 2016",
  stargazers_count: 64,
};

describe("RepositoryDetails", () => {
  it("links to the GitHub account", () => {
    const { getByRole } = render(<RepositoryDetails repository={repo} />);

    expect(getByRole("link")).toHaveAttribute("href", repo.html_url);
  });

  it("matches snapshots", () => {
    const { asFragment } = render(<RepositoryDetails repository={repo} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
