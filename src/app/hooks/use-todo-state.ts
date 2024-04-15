import { addTodo, deleteTodo, fetchTodos, updateTodo } from "@/app/operations";
import {
  Category,
  Importance,
  Priority,
  StatusFilter,
  Todo,
} from "@/app/types";
import { useEffect, useState } from "react";

export const useTodoState = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("incomplete");
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [importances, setImportances] = useState<Importance[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchTodos(statusFilter);
        setTodos(fetchedData.todos);
        setCategories(fetchedData.categories);
        setPriorities(fetchedData.priorities);
        setImportances(fetchedData.importances);
      } catch (error) {
        alert(`データのフェッチ中にエラーが発生しました: ${error}`);
      }
    };
    loadData();
  }, [statusFilter]);

  useEffect(() => {
    setFilteredTodos(
      todos.filter(
        (todo) => todo.status?.key === statusFilter || statusFilter === "all"
      )
    );
  }, [todos, statusFilter]);

  const handleAddTodo = async (todo: Omit<Todo, "id" | "createdAt">) => {
    try {
      const newTodo = await addTodo(todo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      if (newTodo.status.key === statusFilter || statusFilter === "all") {
        setFilteredTodos((prevFiltered) => [...prevFiltered, newTodo]);
      }
    } catch (error) {
      alert(`ToDoの追加中にエラーが発生しました: ${error}`);
    }
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    try {
      const response = await updateTodo(updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === updatedTodo.id ? response : todo))
      );
    } catch (error) {
      alert(
        `ToDoの更新に失敗しました。もう一度お試しください。エラー: ${error}`
      );
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      alert(`ToDoの削除中にエラーが発生しました: ${error}`);
    }
  };

  const handleFilterChange = async (newFilter: StatusFilter) => {
    setStatusFilter(newFilter);
    try {
      const fetchedData = await fetchTodos(newFilter);
      setTodos(fetchedData.todos);
      setFilteredTodos(
        fetchedData.todos.filter(
          (todo) => todo.status?.key === newFilter || newFilter === "all"
        )
      );
    } catch (error) {
      alert(`データのフェッチ中にエラーが発生しました: ${error}`);
    }
  };

  return {
    todos,
    statusFilter,
    setStatusFilter,
    categories,
    priorities,
    importances,
    filteredTodos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    handleFilterChange,
  };
};
