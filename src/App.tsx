import React from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider, useTheme } from "./theme";

export const App = () => {
  return (
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
      <div>Hello</div>
    </ThemeProvider>
  );
};
