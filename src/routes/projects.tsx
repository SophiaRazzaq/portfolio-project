import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/portfolio";
import { Container, Title } from "@mantine/core";
import ProjectCard from "@/components/ProjectCard";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Route = createFileRoute("/projects")({
	component: ProjectsPage,
});

function ProjectsPage() {
	const { projects } = usePortfolioStore((state) => state.data);
	const [projectList, setProjectList] = useState(projects);

	useEffect(() => {
		const local = localStorage.getItem("portfolioData");
		if (local) {
			const parsed = JSON.parse(local);
			if (parsed.projects) setProjectList(parsed.projects);
		}
	}, []);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor),
	);

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = projectList.findIndex(
			(_, i) => `project-${i}` === active.id,
		);
		const newIndex = projectList.findIndex(
			(_, i) => `project-${i}` === over.id,
		);
		setProjectList((items) => arrayMove(items, oldIndex, newIndex));
	};

	return (
		<Container size="lg" py="xl">
			<Title order={2} mb="lg">
				Projects
			</Title>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<SortableContext
					items={projectList.map((_, i) => `project-${i}`)}
					strategy={verticalListSortingStrategy}
				>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{projectList.map((proj, index) => (
							<SortableCard key={index} id={`project-${index}`}>
								<ProjectCard {...proj} />
							</SortableCard>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</Container>
	);
}

function SortableCard({
	id,
	children,
}: { id: string; children: React.ReactNode }) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
}
