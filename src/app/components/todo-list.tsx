"use client";

import styles from "@/app/components/styles.module.css";
import type { StatusKeys, Todo } from "@/app/types";
import React from "react";

type Props = {
  todos: Todo[];
  handleUpdateTodo: (id: string, newStatusKey: StatusKeys) => void;
  openEditModal: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleUpdateTodo,
  openEditModal,
}) => {
  if (!Array.isArray(todos) || todos.length === 0) {
    return <p>Todoがありません。</p>;
  }

  const handleChange =
    (todo: Todo) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newStatusKey =
        todo.status?.key === "complete" ? "incomplete" : "complete";
      handleUpdateTodo(todo.id, newStatusKey);
    };

  return (
    <div className={styles.container}>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.todoItem}>
          <div className={styles.todoItemInner}>
            <input
              type="checkbox"
              checked={todo.status?.key === "complete"}
              onChange={handleChange(todo)}
              className={styles.checkbox}
            />
            <p className={styles.description}>{todo.description}</p>
            <button
              className={styles.editButton}
              onClick={() => openEditModal(todo)}
            >
              編集
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => openEditModal(todo)}
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
