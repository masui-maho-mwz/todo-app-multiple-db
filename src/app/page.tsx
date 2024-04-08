"use client";
import { AddTodo } from "@/app/components/add";
// import { DeleteTodoDialog } from "@/app/components/delete";
import { DeleteTodoDialog } from "@/app/components/delete";
import { EditTodoModal } from "@/app/components/edit";
import { TodoList } from "@/app/components/todo-list";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  StatusFilter,
  Todo,
  type Category,
  type Importance,
  type Priority,
} from "./types";

const Home: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [importances, setImportances] = useState<Importance[]>([]);
  // const [showEditModal, setShowEditModal] = useState<boolean>(false);
  // const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  // const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  // const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("incomplete");

  useEffect(() => {
    const fetchData = async (statusFilter: StatusFilter) => {
      try {
        const queryParam =
          statusFilter === "all" ? "" : `?status=${statusFilter}`;
        const response = await fetch(`/api/todos/?status=${queryParam}`);
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

  const handleAddTodo = async (todo: Omit<Todo, "id">) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      //TODO: リファクタ予定
      console.log("ToDoの追加に成功しました");
    } else {
      console.error("ToDoの追加に失敗しました");
    }
  };

  // 編集機能も後ほど
  // const handleUpdateTodo = async (id: string, updates: Partial<Todo>) => {
  //   await fetch(`/api/todos/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(updates),
  //   });
  //   fetchTodos(statusFilter);
  // };

  // TODO: 削除機能は後ほど
  // const handleDeleteTodo = async (id: string) => {
  //   await fetch(`/api/todos/${id}`, {
  //     method: "DELETE",
  //   });
  //   fetchTodos(statusFilter);
  // };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todoアプリ</h1>
      <AddTodo
        handleAddTodo={handleAddTodo}
        categories={categories}
        priorities={priorities}
        importances={importances}
      />
      <TodoList
        todos={todos}
        // handleUpdateTodo={openEditModal}
        // handleDeleteTodo={openDeleteDialog}
      />
      {/* TODO: 編集モーダルは後ほど作成する */}
      <EditTodoModal />
      {/* {showEditModal && editingTodo && (
        <EditTodoModal todo={editingTodo} onClose={closeEditModal} />
      )} */}
      {/* // TODO: 削除確認ダイアログは後ほど作成する */}
      <DeleteTodoDialog />
      {/* {showDeleteDialog && deletingTodoId && (
        <DeleteTodoDialog todoId={deletingTodoId} onClose={closeDeleteDialog} />
      )} */}
    </div>
  );
};

export default Home;
