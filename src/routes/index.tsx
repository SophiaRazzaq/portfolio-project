import { counter, increment } from "@/store/counter";
import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

const Index = () => {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<span>{counter}</span>
			<div>
				<Button onClick={increment}>Increment</Button>
			</div>
		</div>
	);
};

export const Route = createFileRoute("/")({
	component: Index,
});
