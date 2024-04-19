"use client";
import { DeleteTodoDialog } from "@/app/components/dialogs/delete";
import { EditTodoModal } from "@/app/components/forms/edit";
import { Main } from "@/app/components/main";
import { Sidebar } from "@/app/components/sidebar";
import { useTodos } from "@/app/hooks/use-todos";
import type { Todo } from "@/app/types";
import { useState } from "react";
import styles from "./styles.module.css";

const Home = () => {
  const {
    statusFilter,
    filteredTodos,
    handleUpdateTodo,
    handleDeleteTodo,
    handleFilterChange,
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const closeEditModal = () => setEditingTodo(null);

  const openDeleteDialog = (todoId: string) => {
    setDeletingTodoId(todoId);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeletingTodoId(null);
    setShowDeleteDialog(false);
  };

  const confirmDeleteTodo = async () => {
    if (deletingTodoId) {
      try {
        await handleDeleteTodo(deletingTodoId);
        closeDeleteDialog();
      } catch (error) {
        alert(`ToDoの削除中にエラーが発生しました: ${error}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formAndList}>
        <Sidebar />
        <Main
          statusFilter={statusFilter}
          filteredTodos={filteredTodos}
          handleFilterChange={handleFilterChange}
          openEditModal={openEditModal}
          handleDeleteTodo={openDeleteDialog}
          onUpdateTodo={handleUpdateTodo}
        />
      </div>
      {editingTodo && (
        <EditTodoModal todo={editingTodo} onClose={closeEditModal} />
      )}
      {showDeleteDialog && deletingTodoId && (
        <DeleteTodoDialog
          onClose={closeDeleteDialog}
          onConfirm={confirmDeleteTodo}
        />
      )}
    </div>
  );
};

export default Home;
