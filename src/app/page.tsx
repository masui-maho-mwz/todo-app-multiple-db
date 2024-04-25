"use client";
import { DeleteTodoDialog } from "@/app/components/dialogs/delete";
import { EditTodoModal } from "@/app/components/forms/edit";
import { LoadingOverlay } from "@/app/components/loading";
import { Sidebar } from "@/app/components/sidebar";
import { StatusTabs } from "@/app/components/status-tabs";
import { TodoList } from "@/app/components/todo-list";
import { useTodos } from "@/app/hooks/use-todos";
import type { Todo } from "@/app/types";
import { useState } from "react";
import styles from "./styles.module.css";

const Home = () => {
  const {
    categories,
    priorities,
    importances,
    filteredTodos,
    handleAddTodo,
    handleUpdateTodo,
    handleFilterChange,
    handleDeleteTodo,
    isLoading,
    activeFilter
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const handleOpenEditModal = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleOpenDeleteDialog = (todoId: string) => {
    setDeletingTodoId(todoId);
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingOverlay />}
      <div className={styles.formAndList}>
        <Sidebar
          addTodoProps={{
            categories: categories,
            priorities: priorities,
            importances: importances,
            onClickAdd: handleAddTodo
          }}
        />
        <div className={styles.todoListContainer}>
          <div>
            <StatusTabs
              handleFilterChange={handleFilterChange}
              activeFilter={activeFilter}
            />
            <TodoList
              filteredTodos={filteredTodos}
              handleUpdateTodo={handleUpdateTodo}
              handleOpenEditModal={handleOpenEditModal}
              handleOpenDeleteDialog={handleOpenDeleteDialog}
            />
          </div>
        </div>
      </div>
      {editingTodo && (
        <EditTodoModal
          categories={categories}
          priorities={priorities}
          importances={importances}
          todo={editingTodo}
          onClickUpdate={handleUpdateTodo}
        />
      )}
      {deletingTodoId && (
        <DeleteTodoDialog
          onClickDelete={handleDeleteTodo}
          todoId={deletingTodoId}
        />
      )}
    </div>
  );
};

export default Home;
