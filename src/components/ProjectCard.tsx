import { Card, Image, Text, Button, Stack } from "@mantine/core";
import { motion } from "framer-motion";

type Props = {
	title: string;
	description: string;
	image: string;
	github: string;
};

const MotionCard = motion(Card);

const ProjectCard = ({ title, description, image, github }: Props) => {
	return (
		<MotionCard
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			whileHover={{ scale: 1.03 }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, ease: "easeOut" }}
		>
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
		</MotionCard>
	);
};

export default ProjectCard;
