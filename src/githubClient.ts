import Octokit from "@octokit/rest";

export const githubClient = new Octokit();

export namespace githubClient {
  export type User = Octokit.UsersGetByUsernameResponse;
}
