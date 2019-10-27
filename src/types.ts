import * as github from "./githubClient";

export type User = Pick<
  github.User,
  | "avatar_url"
  | "bio"
  | "blog"
  | "company"
  | "html_url"
  | "location"
  | "login"
  | "name"
>;
