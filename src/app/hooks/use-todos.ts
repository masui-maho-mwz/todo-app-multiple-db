import { TodosContext } from "@/app/contexts";
import { deleteTodo, updateTodo } from "@/app/operations";
import { StatusFilter, StatusKeyEnum, Todo } from "@/app/types";
import { useContext, useEffect, useState } from "react";

export const useTodos = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusKeyEnum.Enum.incomplete
  );
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { todos, categories, priorities, importances, loadData } =
    useContext(TodosContext);

  useEffect(() => {
    setIsLoading(true);
    loadData(statusFilter)
      .then((fetchedData) => {
        setIsLoading(false);
      })
      .catch((error) => {
        alert(`データのフェッチ中にエラーが発生しました: ${error}`);
        setIsLoading(false);
      });
  }, [statusFilter]);

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    setIsLoading(true);
    try {
      await updateTodo(updatedTodo);
      await loadData();
      setIsLoading(false);
    } catch (error) {
      alert(
        `ToDoの更新に失敗しました。もう一度お試しください。エラー: ${error}`
      );
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    setIsLoading(true);
    try {
      await deleteTodo(todoId);
      await loadData();
      setIsLoading(false);
    } catch (error) {
      alert(`ToDoの削除中にエラーが発生しました: ${error}`);
      setIsLoading(false);
    }
  };

  const handleFilterChange = async (newFilter: StatusFilter) => {
    setIsLoading(true);
    try {
      await loadData(newFilter);
      const newFiltered = todos.filter(
        (todo) =>
          todo.status?.key === newFilter || newFilter === StatusKeyEnum.Enum.all
      );
      setFilteredTodos(newFiltered);
      setStatusFilter(newFilter);
      setIsLoading(false);
    } catch (error) {
      alert(`データのフェッチ中にエラーが発生しました: ${error}`);
      setIsLoading(false);
    }
  };

  return {
    todos,
    statusFilter,
    categories,
    priorities,
    importances,
    filteredTodos,
    handleUpdateTodo,
    handleDeleteTodo,
    handleFilterChange,
    isLoading,
    setStatusFilter
  };
};
