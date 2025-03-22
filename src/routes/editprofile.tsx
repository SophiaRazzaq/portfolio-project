import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePortfolioStore } from "@/store/portfolio";

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

	const setData = usePortfolioStore((state) => state.setData);

	const inputClass =
		"w-full p-2 border border-gray-400 rounded-md bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500";

	const addProject = () => {
		setProjects([
			...projects,
			{ title: "", description: "", image: "", github: "" },
		]);
	};

	const addSocialLink = () => {
		setSocialLinks([...socialLinks, { name: "", url: "" }]);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
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
		alert("Profile saved! Go back to homepage to see your portfolio.");
	};

	return (
		<div className="max-w-3xl mx-auto p-4 space-y-6">
			<h1 className="text-2xl font-bold">Edit Your Profile</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					className={inputClass}
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<textarea
					className={inputClass}
					placeholder="Bio"
					value={bio}
					onChange={(e) => setBio(e.target.value)}
				/>
				<input
					className={inputClass}
					placeholder="Profile Picture URL"
					value={profilePic}
					onChange={(e) => setProfilePic(e.target.value)}
				/>
				<input
					className={inputClass}
					placeholder="Skills (comma separated)"
					value={skills}
					onChange={(e) => setSkills(e.target.value)}
				/>
				<input
					className={inputClass}
					placeholder="Interests"
					value={interests}
					onChange={(e) => setInterests(e.target.value)}
				/>

				<div>
					<h2 className="font-semibold">Projects</h2>
					{projects.map((p, i) => (
						<div key={i} className="grid gap-2 mb-2">
							<input
								className={inputClass}
								placeholder="Title"
								value={p.title}
								onChange={(e) => {
									const newProjects = [...projects];
									newProjects[i].title = e.target.value;
									setProjects(newProjects);
								}}
							/>
							<input
								className={inputClass}
								placeholder="Description"
								value={p.description}
								onChange={(e) => {
									const newProjects = [...projects];
									newProjects[i].description = e.target.value;
									setProjects(newProjects);
								}}
							/>
							<input
								className={inputClass}
								placeholder="Image URL"
								value={p.image}
								onChange={(e) => {
									const newProjects = [...projects];
									newProjects[i].image = e.target.value;
									setProjects(newProjects);
								}}
							/>
							<input
								className={inputClass}
								placeholder="GitHub Link"
								value={p.github}
								onChange={(e) => {
									const newProjects = [...projects];
									newProjects[i].github = e.target.value;
									setProjects(newProjects);
								}}
							/>
						</div>
					))}
					<button type="button" className="btn" onClick={addProject}>
						+ Add Project
					</button>
				</div>

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
						</div>
					))}
					<button type="button" className="btn" onClick={addSocialLink}>
						+ Add Social Link
					</button>
				</div>

				<button type="submit" className="btn btn-primary">
					Submit / Generate
				</button>
			</form>
		</div>
	);
}
