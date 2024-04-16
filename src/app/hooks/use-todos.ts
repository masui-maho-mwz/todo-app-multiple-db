import { addTodo, deleteTodo, fetchTodos, updateTodo } from "@/app/operations";
import {
  Category,
  Importance,
  Priority,
  StatusFilter,
  Todo,
  type CategoryKeyEnum,
  type ImportanceKeyEnum,
  type PriorityKeyEnum,
} from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import { useEffect, useState } from "react";

export const useTodos = () => {
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
      if (newTodo.statusKey === statusFilter || statusFilter === "all") {
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

  // const createUpdateTodoHandler =
  //   (closeModal: () => void) => async (updatedTodo: Todo) => {
  //     await handleUpdateTodo(updatedTodo);
  //     closeModal();
  //   };

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
  const createUpdateTodoHandler =
    (todo: Todo, onClose: () => void) =>
    async (formData: {
      description: string;
      selectedCategory: string;
      selectedPriority: string;
      selectedImportance: string;
      deadline: string;
    }) => {
      const updatedTodo: Todo = {
        ...todo,
        description: formData.description,
        categoryKey: formData.selectedCategory as typeof CategoryKeyEnum._type,
        priorityKey: formData.selectedPriority as typeof PriorityKeyEnum._type,
        importanceKey:
          formData.selectedImportance as typeof ImportanceKeyEnum._type,
        deadline: formData.deadline
          ? formatISO(parseISO(formData.deadline))
          : null,
      };

      try {
        await handleUpdateTodo(updatedTodo);
        onClose();
      } catch (error) {
        alert(`ToDoの更新に失敗しました。エラー: ${error}`);
      }
    };

  const createAddTodoHandler =
    (closeModal: () => void) =>
    async (todoData: Omit<Todo, "id" | "createdAt">) => {
      await handleAddTodo(todoData);
      closeModal();
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
    createAddTodoHandler,
    createUpdateTodoHandler,
  };
};
