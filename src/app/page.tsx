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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
    setIsEditModalOpen(false);
  };

  const openDeleteDialog = (todoId: string) => {
    setDeletingTodoId(todoId);
  };

  const closeDeleteDialog = () => {
    setDeletingTodoId(null);
  };

  return (
    <div className={styles.root}>
      {isLoading && <LoadingOverlay />}
      <div className={styles.container}>
        <Sidebar
          addTodoProps={{
            categories,
            priorities,
            importances,
            onClickAdd: handleAddTodo
          }}
        />
        <div className={styles.list}>
          <div className={styles.item}>
            <StatusTabs
              handleFilterChange={handleFilterChange}
              activeFilter={activeFilter}
            />
            <TodoList
              filteredTodos={filteredTodos}
              handleUpdateTodo={handleUpdateTodo}
              handleOpenEditModal={openEditModal}
              handleOpenDeleteDialog={openDeleteDialog}
            />
          </div>
        </div>
      </div>
      <EditTodoModal
        isOpen={isEditModalOpen}
        categories={categories}
        priorities={priorities}
        importances={importances}
        todo={editingTodo}
        onClickUpdate={(updatedTodo: Todo) => {
          handleUpdateTodo(updatedTodo);
          closeEditModal();
        }}
        onClose={closeEditModal}
      />
      <DeleteTodoDialog
        isOpen={deletingTodoId !== null}
        onClickDelete={(todoId: string) => {
          handleDeleteTodo(todoId);
          closeDeleteDialog();
        }}
        onClose={closeDeleteDialog}
        todoId={deletingTodoId}
      />
    </div>
  );
};

export default Home;
