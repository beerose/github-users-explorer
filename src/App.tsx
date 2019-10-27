/** @jsx jsx */
import { Global, jsx, css } from "@emotion/core";
import { StrictMode } from "react";

import { ThemeProvider } from "./theme";
import { Main } from "./Main";

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
