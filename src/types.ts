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

export type Repository = Pick<
  github.Repository,
  "html_url" | "description" | "stargazers_count" | "name"
>;
