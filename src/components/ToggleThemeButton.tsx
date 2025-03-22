import { Button, useMantineColorScheme } from "@mantine/core";
import { Sun, Moon } from "lucide-react";

const ToggleThemeButton = () => {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<Button variant="transparent" radius="xl" onClick={toggleColorScheme}>
			{colorScheme === "dark" ? <Sun /> : <Moon />}
		</Button>
	);
};

export default ToggleThemeButton;
