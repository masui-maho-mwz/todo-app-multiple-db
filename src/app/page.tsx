"use client";

import { AddTodo } from "@/app/components/add-todo";
import { TodoList } from "@/app/components/todo-list";
import { useState } from "react";
import styles from "./styles.module.css";

export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = (todo: string) => {
    setTodos([...todos, todo]);
  };

  return (
    <main className={styles.container}>
      <div className={styles.title}>Todoアプリ</div>
      <div className={styles.addTodo}>
        <AddTodo handleAddTodo={handleAddTodo} />
      </div>
      <div className={styles.todoList}>
        <TodoList todos={todos} />
      </div>
    </main>
  );
}
