/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState, useEffect } from "react";

import * as github from "./api/githubClient";
import { SearchInput } from "./components/SearchInput";
import {
  UserDetails,
  Loader,
  ErrorDisplay,
  RepositoryCards,
} from "./components";
import { makeErrorMessage } from "./utils/makeErrorMessage";
import { ErrorMessage, User, Repository } from "./types";
import { styled } from "./theme";
export const Content = styled.div`
  margin: 2em;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

type EmptyState = { type: "empty" };
type LoadingState = { type: "loading" };
type ErrorState = {
  type: "error";
  error: ErrorMessage;
};

export type UserState =
  | EmptyState
  | LoadingState
  | ErrorState
  | {
      type: "present";
      user: User;
    };

export type ReposState =
  | EmptyState
  | LoadingState
  | ErrorState
  | {
      type: "present";
      repos: Repository[];
    };

export type MainProps = {
  getUser?: typeof github.getUser;
};

const StyledRoot = styled.main`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100%;
  padding: 2em;
`;

const makeUserErrorState = (username: string, error: unknown): ErrorState => ({
  type: "error",
  error: makeErrorMessage(error, err => {
    if (github.isHTTPError(err)) {
      switch (err.status) {
        case 404:
          return `${username} was not found`;
        case 403:
          return "API rate limit exceeded. Try again later";
      }
    }
    return null;
  }),
});

const makeReposErrorState = (username: string, error: unknown): ErrorState => ({
  type: "error",
  error: makeErrorMessage(error, err => {
    if (github.isHTTPError(err)) {
      switch (err.status) {
        case 403:
          return "API rate limit exceeded. Try again later";
        case 422:
          return `${username} doesn’t have any public repositories yet`;
      }
    }
    return null;
  }),
});

export const Main = ({ getUser = github.getUser }: MainProps) => {
  const [username, setUsername] = useState("");
  const [userState, setUserState] = useState<UserState>({ type: "empty" });
  const [reposState, setReposState] = useState<ReposState>({ type: "empty" });

  useEffect(() => {
    if (!username) {
      return;
    }

    let cancelled = false;
    const { userPromise, getRepositories } = getUser(username);

    userPromise
      .then(response => {
        if (!cancelled) {
          setUserState({
            type: "present",
            user: response.data,
          });

          setReposState({ type: "loading" });
          getRepositories()
            .then(reposResponse => {
              if (!cancelled) {
                setReposState({
                  type: "present",
                  repos: reposResponse.data.items,
                });
              }
            })
            .catch(error => {
              if (!cancelled) {
                setReposState(makeReposErrorState(username, error));
              }
            });
        }
      })
      .catch(error => {
        if (!cancelled) {
          setUserState(makeUserErrorState(username, error));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [getUser, username]);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setUserState({ type: value ? "loading" : "empty" });
    setReposState({ type: "empty" });
    setUsername(value);
  };

  return (
    <StyledRoot>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <SearchInput
          placeholder="Search GitHub users"
          value={username}
          onChange={handleInputChange}
          onReset={() => {
            setUserState({ type: "empty" });
            setReposState({ type: "empty" });
            setUsername("");
          }}
        />
      </div>
      <Content>
        {userState.type === "empty" && null}
        {userState.type === "loading" && <Loader />}
        {userState.type === "error" && <ErrorDisplay error={userState.error} />}
        {userState.type === "present" && <UserDetails user={userState.user} />}

        {reposState.type === "empty" && null}
        {reposState.type === "loading" && <Loader />}
        {reposState.type === "present" && (
          <RepositoryCards repositories={reposState.repos} />
        )}
        {reposState.type === "error" && (
          <ErrorDisplay error={reposState.error} />
        )}
      </Content>
    </StyledRoot>
  );
};
