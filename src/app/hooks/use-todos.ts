import { addTodo, deleteTodo, fetchTodos, updateTodo } from '@/app/operations';
import {
  FetchTodosResponse,
  StatusKeyEnum,
  type Category,
  type FormTodoData,
  type Importance,
  type Priority,
  type StatusFilter,
  type Todo,
} from '@/app/ui-models';
import { useEffect, useState } from 'react';

export const useTodos = () => {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>(
    StatusKeyEnum.Enum.incomplete
  );
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [importances, setImportances] = useState<Importance[]>([]);

  const loadData = async (
    activeFilter: StatusFilter = StatusKeyEnum.Enum.incomplete
  ): Promise<FetchTodosResponse> => {
    const fetchedData = await fetchTodos(activeFilter);
    setCategories(fetchedData.categories);
    setPriorities(fetchedData.priorities);
    setImportances(fetchedData.importances);
    const filteredTodos = fetchedData.todos.filter(
      (todo) =>
        todo.statusKey === activeFilter ||
        activeFilter === StatusKeyEnum.Enum.all
    );

    setFilteredTodos(filteredTodos);
    return fetchedData;
  };

  useEffect(() => {
    setIsLoading(true);
    loadData(activeFilter)
      .then((fetchedData) => {
        setIsLoading(false);
      })
      .catch((error) => {
        alert(`データのフェッチ中にエラーが発生しました: ${error}`);
        setIsLoading(false);
      });
  }, [activeFilter]);

  const handleAddTodo = async (newTodoData: FormTodoData) => {
    setIsLoading(true);
    try {
      await addTodo(newTodoData);
      await loadData();
      setIsLoading(false);
    } catch (error) {
      alert(
        `ToDoの追加に失敗しました。もう一度お試しください。エラー: ${error}`
      );
      setIsLoading(false);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    setIsLoading(true);
    try {
      await updateTodo(updatedTodo);
      await loadData(activeFilter);
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
      setFilteredTodos((prevTodos) =>
        prevTodos.filter(
          (todo) =>
            todo.statusKey === newFilter || newFilter === StatusKeyEnum.Enum.all
        )
      );
      setActiveFilter(newFilter);
      setIsLoading(false);
    } catch (error) {
      alert(`データのフェッチ中にエラーが発生しました: ${error}`);
      setIsLoading(false);
    }
  };

  return {
    activeFilter,
    categories,
    priorities,
    importances,
    filteredTodos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    handleFilterChange,
    isLoading,
  };
};
