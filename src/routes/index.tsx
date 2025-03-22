import { createFileRoute } from "@tanstack/react-router";
import { usePortfolioStore } from "@/store/portfolio";
import {
	Avatar,
	Container,
	Title,
	Text,
	Badge,
	Group,
	Stack,
	Anchor,
} from "@mantine/core";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const data = usePortfolioStore((state) => state.data);

	return (
		<Container size="md" py="xl">
			<Group align="flex-start" spacing="xl" wrap="nowrap">
				{/* Profile Picture */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
				>
					<Avatar
						src={data.profilePic}
						size={150}
						radius="xl"
						alt={data.name}
					/>
				</motion.div>

				{/* User Info */}
				<Stack spacing="xs" style={{ flex: 1 }}>
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<Title order={2}>{data.name}</Title>
						<Text>{data.bio}</Text>
					</motion.div>

					{data.skills.length > 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
						>
							<Title order={5}>Skills</Title>
							<Group gap="xs">
								{data.skills.map((skill, idx) => (
									<Badge key={idx}>{skill}</Badge>
								))}
							</Group>
						</motion.div>
					)}

					{data.interests && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							<Title order={5} mt="md">
								Interests
							</Title>
							<Text>{data.interests}</Text>
						</motion.div>
					)}

					{data.socialLinks.length > 0 && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						>
							<Title order={5} mt="md">
								Social
							</Title>
							<Group gap="xs">
								{data.socialLinks.map((link, idx) => (
									<Anchor key={idx} href={link.url} target="_blank">
										{link.name}
									</Anchor>
								))}
							</Group>
						</motion.div>
					)}
				</Stack>
			</Group>
		</Container>
	);
}
