/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { useState, useEffect, StrictMode } from "react";

import { githubClient } from "./githubClient";
import { SearchInput } from "./components/SearchInput";
import { ThemeProvider, styled } from "./theme";

const Main = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<githubClient.User>();

  useEffect(() => {
    if (!username) {
      return;
    }

    githubClient.users
      .getByUsername({
        username,
      })
      .then(response => {
        console.log(response);
        setUser(response.data);
      })
      .catch(error => {
        // TODO: Handle me
        console.error(error);
      });
  }, [username]);

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
          onChange={ev => setUsername(ev.target.value)}
          onReset={() => setUsername("")}
        />
      </div>
      {JSON.stringify(user, null, 2)}
    </StyledRoot>
  );
};

const StyledRoot = styled.main`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  height: 100%;
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
