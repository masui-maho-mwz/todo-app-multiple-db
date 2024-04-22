import { deleteTodo, fetchTodos, updateTodo } from "@/app/operations";
import {
  Category,
  Importance,
  Priority,
  StatusFilter,
  StatusKeyEnum,
  Todo,
} from "@/app/types";
import { useEffect, useState } from "react";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    StatusKeyEnum.Enum.incomplete
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [importances, setImportances] = useState<Importance[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const loadData = () => {
    fetchTodos(statusFilter)
      .then((fetchedData) => {
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
      })
      .catch((error) => {
        alert(`データのフェッチ中にエラーが発生しました: ${error}`);
      });
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, todos]);

  const handleUpdateTodo = (updatedTodo: Todo) => {
    updateTodo(updatedTodo)
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === updatedTodo.id ? response : todo
          )
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
    } catch (error) {
      alert(`ToDoの削除中にエラーが発生しました: ${error}`);
    }
  };

  const handleFilterChange = (newFilter: StatusFilter) => {
    setStatusFilter(newFilter);
    fetchTodos(newFilter)
      .then((fetchedData) => {
        setTodos(fetchedData.todos);
        setFilteredTodos(
          fetchedData.todos.filter(
            (todo) =>
              todo.status?.key === newFilter ||
              newFilter === StatusKeyEnum.Enum.all
          )
        );
      })
      .catch((error) => {
        alert(`データのフェッチ中にエラーが発生しました: ${error}`);
      });
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
  };
};
