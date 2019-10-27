import React from "react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "../../test/testUtils";
import { User } from "../types";

import { UserDetails } from "./UserDetails";

const user: User = {
  name: "Anders Hejlsberg",
  login: "ahejlsberg",
  avatar_url: "https://avatars0.githubusercontent.com/u/4226954?s=400&v=4",
  html_url: "https://github.com/ahejlsberg",
  company: "Microsoft",
  bio:
    "Microsoft Technical Fellow and lead architect of TypeScript. Original designer of C#, Delphi, and Turbo Pascal.",
  blog: "",
  location: "Redmond, WA, USA",
};

describe("UserDetails", () => {
  it("displays user name in a heading", () => {
    const { getByText } = render(<UserDetails user={user} />);

    expect(getByText(user.name)).toBeInstanceOf(HTMLHeadingElement);
  });

  it("login is an anchor to GitHub account", () => {
    const { getByText } = render(<UserDetails user={user} />);

    expect(getByText(user.login)).toHaveAttribute("href");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<UserDetails user={user} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
