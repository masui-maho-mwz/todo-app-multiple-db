"use client";
import { DeleteTodoDialog } from "@/app/components/delete";
import { EditTodoModal } from "@/app/components/edit";
import { Sidebar } from "@/app/components/sidebar";
import { StatusTabs } from "@/app/components/status-tabs";
import { TodoList } from "@/app/components/todo-list";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  StatusFilter,
  Todo,
  type Category,
  type Importance,
  type Priority,
  type StatusKeys,
} from "./types";

const Home: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [importances, setImportances] = useState<Importance[]>([]);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("incomplete");

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditingTodo(null);
    setShowEditModal(false);
  };

  const openDeleteDialog = (id: string) => {
    setDeletingTodoId(id);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const confirmDeleteTodo = async () => {
    if (deletingTodoId) {
      try {
        const response = await fetch(`/api/todos?id=${deletingTodoId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("ToDoの削除に失敗しました");
        fetchTodos();
        closeDeleteDialog();
      } catch (error) {
        console.error("ToDoの削除処理中にエラーが発生しました:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async (statusFilter: StatusFilter) => {
      try {
        const queryParam =
          statusFilter === "all" ? "" : `status=${statusFilter}`;
        const response = await fetch(
          `/api/todos/${queryParam ? "?" + queryParam : ""}`
        );
        if (!response.ok) {
          throw new Error("データの取得に失敗しました。");
        }
        const { todos, categories, priorities, importances } =
          await response.json();

        setTodos(todos);

        setCategories(categories);
        setPriorities(priorities);
        setImportances(importances);
      } catch (error) {
        console.error("データのフェッチ中にエラーが発生しました:", error);
      }
    };
    fetchData(statusFilter);
  }, [statusFilter]);

  const handleAddTodo = async (todo: Omit<Todo, "id" | "createdAt">) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      const newTodo: Todo = await response.json();

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      console.log("ToDoの追加に成功しました");
    } else {
      console.error("ToDoの追加に失敗しました");
    }
  };

  const handleUpdateTodo = async (id: string, newStatusKey: StatusKeys) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatusKey }),
      });
      if (!response.ok) throw new Error("ToDoの更新に失敗しました");

      fetchTodos();
    } catch (error) {
      console.error("ToDoの更新中にエラーが発生しました:", error);
    }
  };

  const fetchTodos = async () => {
    const queryParam = statusFilter === "all" ? "" : `status=${statusFilter}`;
    const response = await fetch(
      `/api/todos/${queryParam ? "?" + queryParam : ""}`
    );
    if (!response.ok) {
      console.error("ToDoの更新中にエラーが発生しました:");
      return;
    }
    const data = await response.json();
    setTodos(data.todos);
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
        <div className={styles.todoListContainer}>
          <div className={styles.todoListWrapper}>
            <StatusTabs setStatusFilter={setStatusFilter} />
            <TodoList
              todos={todos}
              handleUpdateTodo={handleUpdateTodo}
              openEditModal={openEditModal}
              handleDeleteTodo={openDeleteDialog}
            />
          </div>
        </div>
      </div>
      {showEditModal && editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          onClose={closeEditModal}
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
