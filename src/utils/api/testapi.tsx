import { useQuery } from "@tanstack/react-query";
import http from "./http";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const setTImeooutAsync = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchTodos = async () => {
  await setTImeooutAsync(2000);

  const res = await http.get<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
  );
  if (res.status !== 200)
    return Promise.reject(new Error("Failed to fetch todos"));

  const data = await res.json();
  return data;
};

export const useTodos = () => {
  const { isFetching, isError, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["testusers"],
    retry: 0,
    enabled: true,
    staleTime: 20_000,
    queryFn: fetchTodos,
    refetchOnWindowFocus: false,
  });

  return {
    isFetching,
    isError,
    isSuccess,
    todos: data || [],
    error,
    refreshTodos: refetch,
  };
};
