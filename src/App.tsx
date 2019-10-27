/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { useState, useEffect, StrictMode } from "react";

import * as github from "./githubClient";
import { SearchInput } from "./components/SearchInput";
import { ThemeProvider, styled } from "./theme";
import {
  UserDetails,
  Loader,
  ErrorDisplay,
  RepositoryCards,
} from "./components";

import { ErrorMessage, User, Repository } from "./types";
import { makeErrorMessage } from "./utils/makeErrorMessage";

const Content = styled.div`
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

type UserState =
  | EmptyState
  | LoadingState
  | ErrorState
  | {
      type: "present";
      user: User;
    };

type ReposState =
  | EmptyState
  | LoadingState
  | ErrorState
  | {
      type: "present";
      repos: Repository[];
    };

type MainProps = {
  getUser?: typeof github.getUser;
};

const Main = ({ getUser = github.getUser }: MainProps) => {
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
              setReposState({
                type: "present",
                repos: reposResponse.data.items,
              });
            })
            .catch(error => {
              setReposState({
                type: "error",
                error: makeErrorMessage(error, err => {
                  if (github.isHTTPError(err)) {
                    switch (err.status) {
                      case 403:
                        return "API rate limit exceeded. Try again later.";
                      case 422:
                        return `${username} doesn’t have any public repositories yet.`;
                    }
                  }
                  return null;
                }),
              });
            });
        }
      })
      .catch(error => {
        if (!cancelled) {
          setUserState({
            type: "error",
            error: makeErrorMessage(error, err => {
              if (github.isHTTPError(err)) {
                switch (err.status) {
                  case 404:
                    return `${username} was not found.`;
                  case 403:
                    return "API rate limit exceeded. Try again later";
                }
              }
              return null;
            }),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [getUser, username]);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setUserState({ type: value ? "loading" : "empty" });
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
            setUsername("");
          }}
        />
      </div>
      <Content>
        {userState.type === "empty" && null}
        {userState.type === "loading" && <Loader />}
        {userState.type === "error" && <ErrorDisplay error={userState.error} />}
        {userState.type === "present" && <UserDetails user={userState.user} />}

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

const StyledRoot = styled.main`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  min-height: 100%;
  padding: 2em;
`;

export const App = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        <Global
          styles={css`
            body {
              margin: 0;
              font-family: system-ui, -apple-system, BlinkMacSystemFont,
                "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                "Helvetica Neue", sans-serif;
            }
            html,
            body,
            #root {
              height: 100%;
            }

            * {
              box-sizing: border-box;
            }
          `}
        />
        <Main />
      </ThemeProvider>
    </StrictMode>
  );
};
