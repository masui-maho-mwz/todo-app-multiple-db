"use client";

import styles from "@/app/components/styles.module.css";
import type { StatusKeys, Todo } from "@/app/types";
import React from "react";

type Props = {
  todos: Todo[];
  handleUpdateTodo: (id: string, newStatusKey: StatusKeys) => void;
};

export const TodoList: React.FC<Props> = ({ todos, handleUpdateTodo }) => {
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
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.wrapper}>
          <input
            type="checkbox"
            checked={todo.status?.key === "complete"}
            onChange={handleChange(todo)}
          />
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
};
