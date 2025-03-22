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
import { motion, AnimatePresence } from "framer-motion";

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
		<Container size="sm" py="xl" className="space-y-6 relative">
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

			{/* ✅ Centered Animated Popup */}
			<AnimatePresence>
				{submitted && (
					<motion.div
						key="popup"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.4 }}
						className="fixed inset-0 flex items-center justify-center z-50"
					>
						<div className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 px-6 py-4 rounded-xl shadow-xl text-center">
							<Text fw={600} size="lg">
								✅ Message delivered successfully! 🚀🎉
							</Text>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</Container>
	);
}
