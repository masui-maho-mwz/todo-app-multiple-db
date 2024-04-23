import { BASE_URL, fetcher } from "@/app/lib/fetcher";
import {
  StatusFilter,
  StatusKeyEnum,
  Todo,
  type FetchTodosResponse,
  type FormTodoData,
} from "@/app/types";

export const fetchTodos = async (
  statusFilter: StatusFilter
): Promise<FetchTodosResponse> => {
  const queryParam =
    statusFilter === StatusKeyEnum.Enum.all ? "" : `status=${statusFilter}`;
  const url = `${BASE_URL}/${queryParam ? "?" + queryParam : ""}`;
  return fetcher(url);
};

export const addTodo = async (todo: FormTodoData) => {
  const url = `${BASE_URL}`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...todo, statusKey: StatusKeyEnum.Enum.incomplete }),
  };
  const response = await fetcher(url, options);
  return response;
};

export const updateTodo = async (updatedTodo: Todo) => {
  const url = `${BASE_URL}?id=${updatedTodo.id}`;
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTodo),
  };
  const response = await fetcher(url, options);
  return response;
};

export const deleteTodo = async (id: string) => {
  const url = `${BASE_URL}?id=${id}`;
  const options = {
    method: "DELETE",
  };
  const response = await fetcher(url, options);
  return response;
};
