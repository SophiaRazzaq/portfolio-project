import { Link } from "@tanstack/react-router";

export default function Navbar() {
	return (
		<nav className="flex justify-between items-center p-4 bg-base-100 shadow">
			<div className="text-xl font-bold">My Portfolio</div>
			<div className="flex gap-4">
				<Link to="/" className="btn btn-ghost">
					Home
				</Link>
				<Link to="/about" className="btn btn-ghost">
					About
				</Link>
				<Link to="/editprofile" className="btn btn-ghost">
					Edit Profile
				</Link>
			</div>
		</nav>
	);
}
