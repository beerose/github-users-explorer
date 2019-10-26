/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Global, css } from "@emotion/core";
import { ThemeProvider, styled } from "./theme";
import { SearchInput } from "./components/SearchInput";
import { useState, useEffect, StrictMode } from "react";

const Main = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {}, [username]);

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
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
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
          `}
        />
        <Main />
      </ThemeProvider>
    </StrictMode>
  );
};
