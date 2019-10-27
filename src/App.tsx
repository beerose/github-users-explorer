/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { useState, useEffect, StrictMode } from "react";
// import throttle from "p-throttle";

import * as github from "./githubClient";
import { SearchInput } from "./components/SearchInput";
import { ThemeProvider, styled } from "./theme";
import { UserDetails } from "./components/UserDetails";
import { Loader } from "./components/Loading";

// const _getUser = throttle(github.getUser, 5, 1000);
const _getUser = github.getUser;

type UserState =
  | {
      type: "didnt-ask";
    }
  | {
      type: "loading";
    }
  | {
      type: "present";
      user: github.User;
    }
  | {
      type: "error";
      error: Error;
    };

type ReposState =
  | {
      type: "no-user";
    }
  | {
      type: "present";
      repos: github.Repository[];
    }
  | {
      type: "loading";
    }
  | {
      type: "error";
      error: Error;
    };

type MainProps = {
  getUser?: typeof _getUser;
};

const Main = ({ getUser = _getUser }: MainProps) => {
  const [username, setUsername] = useState("");
  const [userState, setUserState] = useState<UserState>({ type: "didnt-ask" });
  const [reposState, setReposState] = useState<ReposState>({ type: "no-user" });

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
                error,
              });
            });
        }
      })
      .catch(error => {
        if (!cancelled) {
          setUserState({
            type: "error",
            error,
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [getUser, username]);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setUserState({ type: value ? "loading" : "didnt-ask" });
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
            setUserState({ type: "didnt-ask" });
            setUsername("");
          }}
        />
      </div>
      {userState.type === "didnt-ask" && null}
      {userState.type === "loading" ||
        (reposState.type === "loading" && <Loader />)}
      {userState.type === "error" && `${username} not found`}
      {userState.type === "present" && reposState.type === "present" && (
        <UserDetails user={userState.user} repos={reposState.repos} />
      )}
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
