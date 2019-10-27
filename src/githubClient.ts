import Octokit from "@octokit/rest";

const REPOS_LIMIT = 3;

export const client = new Octokit();

export type Response<T> = Octokit.Response<T>;
export type User = Octokit.UsersGetByUsernameResponse;

export type Repository = Octokit.SearchReposResponseItemsItem;

export const getUser = (username: string) => {
  const userPromise = client.users.getByUsername({
    username,
  });
  const getRepositories = () =>
    client.search.repos({
      q: `user:${username}`,
      sort: "stars",
      per_page: REPOS_LIMIT,
    });

  return { userPromise, getRepositories };
};
