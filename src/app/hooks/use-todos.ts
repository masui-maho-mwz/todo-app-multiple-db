import { deleteTodo, updateTodo, fetchTodos } from '@/app/operations';
import {
  type StatusFilter,
  StatusKeyEnum,
  type Todo,
  type Category,
  type Importance,
  type Priority,
  FetchTodosResponse,
} from '@/app/types';
import { useEffect, useState } from 'react';

export const useTodos = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusKeyEnum.Enum.incomplete
  );
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [importances, setImportances] = useState<Importance[]>([]);

  const loadData = async (
    statusFilter: StatusFilter = StatusKeyEnum.Enum.incomplete
  ): Promise<FetchTodosResponse> => {
    const fetchedData = await fetchTodos(statusFilter);
    setTodos(fetchedData.todos);
    setCategories(fetchedData.categories);
    setPriorities(fetchedData.priorities);
    setImportances(fetchedData.importances);
    setFilteredTodos(
      fetchedData.todos.filter(
        (todo) =>
          todo.status?.key === statusFilter ||
          statusFilter === StatusKeyEnum.Enum.all
      )
    );
    return fetchedData;
  };

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
    setStatusFilter,
  };
};
