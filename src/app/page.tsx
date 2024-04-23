"use client";
import { DeleteTodoDialog } from "@/app/components/dialogs/delete";
import { EditTodoModal } from "@/app/components/forms/edit";
import { StatusTabs } from "@/app/components/main/status-tabs";
import { TodoList } from "@/app/components/main/todo-list";
import { Sidebar } from "@/app/components/sidebar";
import { useTodos } from "@/app/hooks/use-todos";
import type { Todo } from "@/app/types";
import { useState } from "react";
import styles from "./styles.module.css";

const Home = () => {
  const { statusFilter, filteredTodos, handleUpdateTodo, handleFilterChange } =
    useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const openDeleteDialog = (todoId: string) => {
    setDeletingTodoId(todoId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formAndList}>
        <Sidebar />
        <div className={styles.todoListContainer}>
          <div>
            <StatusTabs
              setStatusFilter={handleFilterChange}
              activeFilter={statusFilter}
            />
            <TodoList
              todos={filteredTodos}
              openEditModal={openEditModal}
              handleDeleteTodo={openDeleteDialog}
              onUpdateTodo={handleUpdateTodo}
            />
          </div>
        </div>
      </div>
      {editingTodo && <EditTodoModal todo={editingTodo} />}
      {deletingTodoId && <DeleteTodoDialog todoId={deletingTodoId} />}
    </div>
  );
};

export default Home;
