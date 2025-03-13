import { useTodos } from "@/utils/api/testapi";
import { Button } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";

const About = () => {
  const { isFetching, isError, isSuccess, error, todos, refreshTodos } =
    useTodos();

  if (isError) return <span color="red">{error?.message}</span>;

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="p-2">
      Hello from About!
      {isSuccess && (
        <>
          <Button mb="md" onClick={() => refreshTodos()}>
            Refresh
          </Button>

          <ul>
            {todos.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export const Route = createFileRoute("/about")({
  component: About,
});
