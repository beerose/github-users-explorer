import { render as testingLibraryRender } from "@testing-library/react";

import { ThemeProvider } from "../src/theme";

export const render = (
  ui: Parameters<typeof testingLibraryRender>[0],
  options?: Parameters<typeof testingLibraryRender>[1]
) => testingLibraryRender(ui, { wrapper: ThemeProvider, ...options });

export * from "@testing-library/react";
