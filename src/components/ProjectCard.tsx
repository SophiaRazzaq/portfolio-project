import { Card, Image, Text, Button, Stack } from "@mantine/core";

type Props = {
	title: string;
	description: string;
	image: string;
	github: string;
};

const ProjectCard = ({ title, description, image, github }: Props) => {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Stack>
				{image && <Image src={image} alt={title} height={160} radius="md" />}
				<Text fw={500}>{title}</Text>
				<Text size="sm" c="dimmed">
					{description}
				</Text>
				<Button
					component="a"
					href={github}
					target="_blank"
					rel="noopener noreferrer"
					variant="light"
				>
					View on GitHub
				</Button>
			</Stack>
		</Card>
	);
};

export default ProjectCard;
