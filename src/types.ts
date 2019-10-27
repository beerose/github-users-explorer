import * as github from "./api/githubClient";

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

export type ErrorMessage = { message: string };

export const isErrorMessage = (x: unknown): x is ErrorMessage =>
  typeof x === "object" &&
  x !== null &&
  "message" in x &&
  typeof (x as Record<string, unknown>).message === "string";
