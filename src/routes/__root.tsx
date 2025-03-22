import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import {
	AppShell,
	NavLink,
	Burger,
	Group,
	Drawer,
	Stack,
	Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "@/components/Footer";

import ToggleThemeButton from "@/components/ToggleThemeButton";

const navLinks = [
	{ label: "Home", to: "/" },
	{ label: "About", to: "/about" },
	{ label: "Projects", to: "/projects" },
	{ label: "Contact", to: "/contact" },
	{ label: "Edit Profile", to: "/editprofile" },
];

const RootLayout = () => {
	const [opened, { toggle, close }] = useDisclosure();

	return (
		<AppShell
			padding="md"
			header={{ height: 60 }}
			navbar={{ width: 200, breakpoint: "sm", collapsed: { mobile: true } }}
		>
			{/* Header */}
			<AppShell.Header>
				<Group h="100%" px="md" justify="space-between">
					<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
					<Group visibleFrom="sm" gap="md">
						{navLinks.map((link) => (
							<Button
								variant="subtle"
								component={Link}
								to={link.to}
								key={link.to}
							>
								{link.label}
							</Button>
						))}
					</Group>
					<ToggleThemeButton />
				</Group>
			</AppShell.Header>

			{/* Sidebar (for large screens) */}
			<AppShell.Navbar p="xs" hiddenFrom="sm">
				<Stack>
					{navLinks.map((link) => (
						<NavLink
							key={link.to}
							component={Link}
							label={link.label}
							to={link.to}
							onClick={close}
						/>
					))}
				</Stack>
			</AppShell.Navbar>

			{/* Drawer (mobile menu) */}
			<Drawer
				opened={opened}
				onClose={close}
				title="Navigation"
				hiddenFrom="sm"
				padding="md"
			>
				<Stack>
					{navLinks.map((link) => (
						<Button
							key={link.to}
							variant="light"
							component={Link}
							to={link.to}
							onClick={close}
						>
							{link.label}
						</Button>
					))}
				</Stack>
			</Drawer>

			<AppShell.Main>
				<Outlet />
				<Footer />
			</AppShell.Main>

			{/* Main content */}
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
