import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { usePortfolioStore } from "@/store/portfolio";
import { Container, Title, Text, Image, Badge, Group } from "@mantine/core";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	const { profilePic, bio, skills, name, interests } = usePortfolioStore(
		(state) => state.data,
	);
	const setData = usePortfolioStore((state) => state.setData);

	// Load from localStorage if Zustand is empty (hydrate once)
	useEffect(() => {
		if (!name) {
			const raw = localStorage.getItem("portfolioData");
			if (raw) {
				try {
					const parsed = JSON.parse(raw);
					setData(parsed);
				} catch (err) {
					console.error("Failed to parse portfolioData from localStorage", err);
				}
			}
		}
	}, [name, setData]);

	return (
		<Container size="md" py="xl" className="space-y-6">
			<Title order={2}>About Me</Title>

			{profilePic && (
				<div className="flex justify-center">
					<Image
						src={profilePic}
						alt={`${name}'s profile`}
						radius="md"
						w={150}
						h={150}
						className="object-cover"
					/>
				</div>
			)}

			{bio && <Text size="md">{bio}</Text>}

			{Array.isArray(skills) && skills.length > 0 && (
				<div>
					<Title order={4} mt="md">
						Skills
					</Title>
					<Group mt="xs" gap="xs">
						{skills.map((skill, idx) => (
							<Badge key={idx} color="blue" variant="filled">
								{skill}
							</Badge>
						))}
					</Group>
				</div>
			)}

			{interests && (
				<div>
					<Title order={4} mt="md">
						Interests
					</Title>
					<Text>{interests}</Text>
				</div>
			)}
		</Container>
	);
}
