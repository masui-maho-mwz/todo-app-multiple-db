import { fetcher, getTodoUrl } from "@/app/lib/fetcher";
import { addTodo, deleteTodo, updateTodo } from "@/app/operations";
import {
  StatusFilter,
  StatusKeyEnum,
  Todo,
  type FetchTodosResponse,
  type FormTodoData,
} from "@/app/types";
import { useState } from "react";
import useSWR from "swr";

export const useTodos = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusKeyEnum.Enum.incomplete
  );

  const { data, error, mutate } = useSWR<FetchTodosResponse>(
    getTodoUrl(statusFilter),
    fetcher
  );

  const todos = data?.todos || [];
  const categories = data?.categories || [];
  const priorities = data?.priorities || [];
  const importances = data?.importances || [];

  const handleUpdateTodo = (updatedTodo: Todo) => {
    updateTodo(updatedTodo)
      .then((response) => {
        mutate(
          (prevData) =>
            ({
              ...prevData,
              todos: prevData?.todos.map((todo) =>
                todo.id === updatedTodo.id ? response : todo
              ),
            } as FetchTodosResponse),
          false
        );
      })
      .catch((error) => {
        alert(
          `ToDoの更新に失敗しました。もう一度お試しください。エラー: ${error}`
        );
      });
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
      mutate(
        (prevData) =>
          ({
            ...prevData,
            todos: prevData?.todos.filter((todo) => todo.id !== todoId),
          } as FetchTodosResponse),
        false
      );
    } catch (error) {
      alert(`ToDoの削除中にエラーが発生しました: ${error}`);
    }
  };

  const handleFilterChange = async (newFilter: StatusFilter): Promise<void> => {
    setStatusFilter(newFilter);
    await mutate();
  };

  const handleAddTodo = async (newTodo: FormTodoData) => {
    try {
      const addedTodo = await addTodo(newTodo);
      mutate(
        (prevData) =>
          ({
            ...prevData,
            todos: [...(prevData?.todos || []), addedTodo],
          } as FetchTodosResponse),
        false
      );
    } catch (error) {
      alert(`ToDoの追加に失敗しました: ${error}`);
    }
  };

  const getFilteredTodos = (todos: Todo[], statusFilter: StatusFilter) => {
    return todos.filter(
      (todo) =>
        todo.status?.key === statusFilter ||
        statusFilter === StatusKeyEnum.Enum.all
    );
  };

  return {
    todos,
    statusFilter,
    categories,
    priorities,
    importances,
    handleUpdateTodo,
    handleDeleteTodo,
    handleFilterChange,
    handleAddTodo,
    getFilteredTodos,
    isLoading: !data && !error,
    isError: error,
  };
};
