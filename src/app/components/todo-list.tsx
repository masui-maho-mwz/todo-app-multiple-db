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
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            <th>説明</th>
            <th>カテゴリー</th>
            <th>優先度</th>
            <th>重要度</th>
            <th>期限</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input
                  type="checkbox"
                  checked={todo.status?.key === "complete"}
                  onChange={handleChange(todo)}
                />
              </td>
              <td>{todo.description}</td>
              <td>{todo.category?.name}</td>
              <td>{todo.priority?.name}</td>
              <td>{todo.importance?.name}</td>
              <td>
                {todo.deadline
                  ? new Date(todo.deadline).toLocaleDateString()
                  : "未設定"}
              </td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
