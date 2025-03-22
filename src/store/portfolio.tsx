// src/store/portfolio.ts
import { create } from "zustand";

type Project = {
	title: string;
	description: string;
	image: string;
	github: string;
};

type Social = {
	name: string;
	url: string;
};

type PortfolioData = {
	name: string;
	bio: string;
	profilePic: string;
	skills: string[];
	interests: string;
	projects: Project[];
	socialLinks: Social[];
};

type Store = {
	data: PortfolioData;
	setData: (data: PortfolioData) => void;
};

export const usePortfolioStore = create<Store>((set) => ({
	data: {
		name: "",
		bio: "",
		profilePic: "",
		skills: [],
		interests: "",
		projects: [],
		socialLinks: [],
	},
	setData: (data) => set({ data }),
}));
