import { StatusFilter, Todo, type FetchTodosResponse } from "@/app/types";

export const fetchTodos = async (
  statusFilter: StatusFilter
): Promise<FetchTodosResponse> => {
  const queryParam = statusFilter === "all" ? "" : `status=${statusFilter}`;
  const response = await fetch(
    `/api/todos/${queryParam ? "?" + queryParam : ""}`
  );
  if (!response.ok) {
    throw new Error("ToDoの取得に失敗しました");
  }
  const data = await response.json();
  return data;
};

export const addTodo = async (
  todo: Omit<Todo, "id" | "createdAt">
): Promise<Todo> => {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw new Error("ToDoの追加に失敗しました");
  }
  return response.json();
};

export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  const response = await fetch(`/api/todos?id=${updatedTodo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  });
  if (!response.ok) {
    throw new Error("ToDoの更新に失敗しました");
  }
  return response.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`/api/todos?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("ToDoの削除に失敗しました");
  }
};
