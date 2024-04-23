"use client";
import { DeleteTodoDialog } from "@/app/components/dialogs/delete";
import { EditTodoModal } from "@/app/components/forms/edit";
import { Sidebar } from "@/app/components/sidebar";
import { StatusTabs } from "@/app/components/status-tabs";
import { TodoList } from "@/app/components/todo-list";
import { useTodos } from "@/app/hooks/use-todos";
import type { Todo } from "@/app/types";
import { useState } from "react";
import styles from "./styles.module.css";

const Home = () => {
  const { statusFilter, filteredTodos, handleUpdateTodo, handleFilterChange } =
    useTodos();

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
      <div className={styles.formAndList}>
        <Sidebar />
        <div className={styles.todoListContainer}>
          <div>
            <StatusTabs
              handleFilterChange={handleFilterChange}
              activeFilter={statusFilter}
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
      {editingTodo && <EditTodoModal todo={editingTodo} />}
      {deletingTodoId && <DeleteTodoDialog todoId={deletingTodoId} />}
    </div>
  );
};

export default Home;
