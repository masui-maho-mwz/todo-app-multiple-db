"use client";
import { DeleteTodoDialog } from "@/app/components/delete";
import EditTodoModal from "@/app/components/edit";
import { Main } from "@/app/components/main";
import { Sidebar } from "@/app/components/sidebar";
import { useTodoState } from "@/app/hooks/use-todo-state";
import type { Todo } from "@/app/types";
import { useState } from "react";
import styles from "./styles.module.css";

const Home = () => {
  const {
    statusFilter,
    filteredTodos,
    categories,
    priorities,
    importances,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    handleFilterChange,
  } = useTodoState();

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
    setShowEditModal(false);
  };
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
        <Sidebar
          handleAddTodo={handleAddTodo}
          categories={categories}
          priorities={priorities}
          importances={importances}
        />
        <Main
          statusFilter={statusFilter}
          filteredTodos={filteredTodos}
          handleFilterChange={handleFilterChange}
          openEditModal={openEditModal}
          handleDeleteTodo={openDeleteDialog}
          onUpdateTodo={handleUpdateTodo}
        />
      </div>
      {showEditModal && editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={closeEditModal}
          onUpdateTodo={handleUpdateTodo}
          categories={categories}
          priorities={priorities}
          importances={importances}
        />
      )}
      {showDeleteDialog && deletingTodoId && (
        <DeleteTodoDialog
          todoId={deletingTodoId}
          onClose={closeDeleteDialog}
          onConfirm={confirmDeleteTodo}
        />
      )}
    </div>
  );
};

export default Home;
