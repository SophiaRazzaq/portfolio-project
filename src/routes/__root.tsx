import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { AppShell, NavLink, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ToggleThemeButton from "@/components/ToggleThemeButton";

const RootLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{ width: 100, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      {/* TopBar */}
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            {/* TODO: add logo */}
            <Group
              ml="xl"
              gap={0}
              visibleFrom="sm"
              justify="end"
              style={{ flex: 1 }}
            >
              <ToggleThemeButton />
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      {/* Sidebar */}
      <AppShell.Navbar p="md">
        <NavLink component={Link} label="Home" to="/" />
        <NavLink component={Link} label="About" to="/about" />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export const Route = createRootRoute({
  component: () => (
    <>
      <RootLayout />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools position="bottom" />
    </>
  ),
});
