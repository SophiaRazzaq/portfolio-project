import { Group, Anchor, Container, Divider } from "@mantine/core";
import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconBrandTwitter,
} from "@tabler/icons-react";

const socialLinks = [
	{
		href: "https://github.com/yourusername",
		icon: <IconBrandGithub />,
		label: "GitHub",
	},
	{
		href: "https://linkedin.com/in/yourprofile",
		icon: <IconBrandLinkedin />,
		label: "LinkedIn",
	},
	{
		href: "https://twitter.com/yourhandle",
		icon: <IconBrandTwitter />,
		label: "Twitter",
	},
];

const Footer = () => {
	return (
		<Container py="md" mt="xl">
			<Divider mb="sm" />
			<Group position="center" spacing="lg">
				{socialLinks.map((link) => (
					<Anchor
						key={link.href}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						title={link.label}
					>
						{link.icon}
					</Anchor>
				))}
			</Group>
		</Container>
	);
};

export default Footer;
