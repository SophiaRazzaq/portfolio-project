import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { usePortfolioStore } from "@/store/portfolio";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/editprofile")({
	component: EditProfilePage,
});

function EditProfilePage() {
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const [skills, setSkills] = useState("");
	const [interests, setInterests] = useState("");
	const [projects, setProjects] = useState([
		{ title: "", description: "", image: "", github: "" },
	]);
	const [socialLinks, setSocialLinks] = useState([{ name: "", url: "" }]);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [submitted, setSubmitted] = useState(false);

	const setData = usePortfolioStore((state) => state.setData);

	const inputClass =
		"w-full p-2 border border-gray-400 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

	const AnimatedError = ({ msg }: { msg: string }) => (
		<AnimatePresence>
			<motion.p
				key={msg}
				initial={{ opacity: 0, y: -5 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -5 }}
				transition={{ duration: 0.25 }}
				className="text-sm text-red-500 mt-1 ml-1"
			>
				{msg}
			</motion.p>
		</AnimatePresence>
	);

	const validate = () => {
		const newErrors: { [key: string]: string } = {};
		if (!name.trim()) newErrors.name = "❗️ Name is required";
		if (!bio.trim()) newErrors.bio = "📝 Bio is required";
		if (!profilePic.trim())
			newErrors.profilePic = "📷 Add a profile picture URL";
		if (!skills.trim()) newErrors.skills = "💡 Skills are required";
		if (!interests.trim()) newErrors.interests = "🎯 Add some interests";

		projects.forEach((proj, i) => {
			if (!proj.title) newErrors[`project-title-${i}`] = "📌 Title required";
			if (!proj.description)
				newErrors[`project-desc-${i}`] = "🗒 Description required";
			if (!proj.image) newErrors[`project-image-${i}`] = "🖼 Image URL required";
			if (!proj.github)
				newErrors[`project-github-${i}`] = "🔗 GitHub link required";
		});

		socialLinks.forEach((link, i) => {
			if (!link.name)
				newErrors[`social-name-${i}`] = "🔵 Platform name required";
			if (!link.url) newErrors[`social-url-${i}`] = "🌐 URL required";
		});

		return newErrors;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const validationErrors = validate();
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			setSubmitted(false);
			return;
		}

		setErrors({});
		const data = {
			name,
			bio,
			profilePic,
			skills: skills.split(",").map((s) => s.trim()),
			interests,
			projects,
			socialLinks,
		};
		localStorage.setItem("portfolioData", JSON.stringify(data));
		setData(data);
		setSubmitted(true);
	};

	useEffect(() => {
		if (submitted) {
			const timeout = setTimeout(() => setSubmitted(false), 3000);
			return () => clearTimeout(timeout);
		}
	}, [submitted]);

	return (
		<div className="max-w-3xl mx-auto p-4 space-y-6 relative">
			<h1 className="text-2xl font-bold">Edit Your Profile</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Name */}
				<div>
					<input
						className={inputClass}
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{errors.name && <AnimatedError msg={errors.name} />}
				</div>

				{/* Bio */}
				<div>
					<textarea
						className={inputClass}
						placeholder="Bio"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
					/>
					{errors.bio && <AnimatedError msg={errors.bio} />}
				</div>

				{/* Profile Pic */}
				<div>
					<input
						className={inputClass}
						placeholder="Profile Picture URL"
						value={profilePic}
						onChange={(e) => setProfilePic(e.target.value)}
					/>
					{errors.profilePic && <AnimatedError msg={errors.profilePic} />}
				</div>

				{/* Skills */}
				<div>
					<input
						className={inputClass}
						placeholder="Skills (comma separated)"
						value={skills}
						onChange={(e) => setSkills(e.target.value)}
					/>
					{errors.skills && <AnimatedError msg={errors.skills} />}
				</div>

				{/* Interests */}
				<div>
					<input
						className={inputClass}
						placeholder="Interests"
						value={interests}
						onChange={(e) => setInterests(e.target.value)}
					/>
					{errors.interests && <AnimatedError msg={errors.interests} />}
				</div>

				{/* Projects */}
				<div>
					<h2 className="font-semibold">Projects</h2>
					{projects.map((p, i) => (
						<div key={i} className="grid gap-2 mb-2">
							<input
								className={inputClass}
								placeholder="Title"
								value={p.title}
								onChange={(e) => {
									const updated = [...projects];
									updated[i].title = e.target.value;
									setProjects(updated);
								}}
							/>
							{errors[`project-title-${i}`] && (
								<AnimatedError msg={errors[`project-title-${i}`]} />
							)}

							<input
								className={inputClass}
								placeholder="Description"
								value={p.description}
								onChange={(e) => {
									const updated = [...projects];
									updated[i].description = e.target.value;
									setProjects(updated);
								}}
							/>
							{errors[`project-desc-${i}`] && (
								<AnimatedError msg={errors[`project-desc-${i}`]} />
							)}

							<input
								className={inputClass}
								placeholder="Image URL"
								value={p.image}
								onChange={(e) => {
									const updated = [...projects];
									updated[i].image = e.target.value;
									setProjects(updated);
								}}
							/>
							{errors[`project-image-${i}`] && (
								<AnimatedError msg={errors[`project-image-${i}`]} />
							)}

							<input
								className={inputClass}
								placeholder="GitHub Link"
								value={p.github}
								onChange={(e) => {
									const updated = [...projects];
									updated[i].github = e.target.value;
									setProjects(updated);
								}}
							/>
							{errors[`project-github-${i}`] && (
								<AnimatedError msg={errors[`project-github-${i}`]} />
							)}
						</div>
					))}
					<button
						type="button"
						className="btn"
						onClick={() =>
							setProjects([
								...projects,
								{ title: "", description: "", image: "", github: "" },
							])
						}
					>
						+ Add Project
					</button>
				</div>

				{/* Social Links */}
				<div>
					<h2 className="font-semibold">Social Media Links</h2>
					{socialLinks.map((link, i) => (
						<div key={i} className="grid gap-2 mb-2">
							<input
								className={inputClass}
								placeholder="Platform"
								value={link.name}
								onChange={(e) => {
									const updated = [...socialLinks];
									updated[i].name = e.target.value;
									setSocialLinks(updated);
								}}
							/>
							{errors[`social-name-${i}`] && (
								<AnimatedError msg={errors[`social-name-${i}`]} />
							)}

							<input
								className={inputClass}
								placeholder="URL"
								value={link.url}
								onChange={(e) => {
									const updated = [...socialLinks];
									updated[i].url = e.target.value;
									setSocialLinks(updated);
								}}
							/>
							{errors[`social-url-${i}`] && (
								<AnimatedError msg={errors[`social-url-${i}`]} />
							)}
						</div>
					))}
					<button
						type="button"
						className="btn"
						onClick={() =>
							setSocialLinks([...socialLinks, { name: "", url: "" }])
						}
					>
						+ Add Social Link
					</button>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit / Generate
				</button>
			</form>

			{/* ✅ Animated Success Popup */}
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
						<div className="bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-6 py-4 rounded-xl shadow-xl text-center">
							<p className="text-lg font-semibold">
								✅ Profile saved successfully! 🎯
							</p>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
