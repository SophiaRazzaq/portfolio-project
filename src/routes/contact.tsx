import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
	Container,
	TextInput,
	Textarea,
	Button,
	Title,
	Text,
} from "@mantine/core";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

function ContactPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// TODO: Link with a form service like Formspree or Google Forms
		console.log("Submitted", { name, email, message });
		setSubmitted(true);
		setName("");
		setEmail("");
		setMessage("");
	};

	useEffect(() => {
		if (submitted) {
			const timer = setTimeout(() => setSubmitted(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [submitted]);

	return (
		<Container size="sm" py="xl" className="space-y-6">
			<Title order={2}>Contact Me</Title>
			<form onSubmit={handleSubmit} className="space-y-4">
				<TextInput
					required
					placeholder="Your Name"
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
				/>
				<TextInput
					required
					type="email"
					placeholder="Your Email"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
				/>
				<Textarea
					required
					placeholder="Your Message"
					value={message}
					onChange={(e) => setMessage(e.currentTarget.value)}
				/>
				<Button type="submit">Send</Button>
			</form>
			{submitted && <Text c="green">Message sent successfully!</Text>}
		</Container>
	);
}
