import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createTheme,
  MantineProvider,
  DEFAULT_THEME,
  mergeMantineTheme,
} from "@mantine/core";

import "./styles.css";

import { routeTree } from "./routeTree.gen";
import queryClient from "./utils/api/query-client";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const theme = mergeMantineTheme(DEFAULT_THEME, createTheme({}));

const App = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;
