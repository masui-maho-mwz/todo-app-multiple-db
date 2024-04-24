"use client";

import { fetchTodos } from "@/app/operations";
import {
  Category,
  FetchTodosResponse,
  Importance,
  Priority,
  StatusFilter,
  StatusKeyEnum,
  Todo
} from "@/app/types";
import React, { createContext, useState } from "react";

type TodosContextValue = {
  todos: Todo[];
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
  loadData: (statusFilter?: StatusFilter) => Promise<FetchTodosResponse>;
};

export const TodosContext = createContext<TodosContextValue>({
  todos: [],
  categories: [],
  priorities: [],
  importances: [],
  loadData: async () => ({
    todos: [],
    categories: [],
    priorities: [],
    importances: []
  })
});

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
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
    // setFilteredTodos(
    //   fetchedData.todos.filter(
    //     (todo) =>
    //       todo.status?.key === statusFilter ||
    //       statusFilter === StatusKeyEnum.Enum.all
    //   )
    // );
    return fetchedData;
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        categories,
        priorities,
        importances,
        loadData
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
