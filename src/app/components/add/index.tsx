"use client";
import { Category, Importance, Priority, Todo } from "@/app/types";
import { formatISO, parseISO } from "date-fns";
import React, { useState } from "react";
import styles from "./styles.module.css";

type Props = {
  onClose: () => void;
  onAddTodo: (todo: Omit<Todo, "id" | "createdAt">) => void;
  categories: Category[];
  priorities: Priority[];
  importances: Importance[];
};

export const AddTodoModal: React.FC<Props> = ({
  onClose,
  onAddTodo,
  categories,
  priorities,
  importances,
}) => {
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedImportance, setSelectedImportance] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const todo: Omit<Todo, "id" | "createdAt"> = {
      description,
      categoryId: selectedCategory,
      priorityId: selectedPriority,
      importanceId: selectedImportance,
      deadline: deadline ? formatISO(parseISO(deadline)) : null,

      status: {
        key: "incomplete",
        name: "未完了",
        id: "cluruuvds000cxhqzcyrbabnm",
      },
    };
    onAddTodo(todo);
    setDescription("");
    setSelectedCategory("");
    setSelectedPriority("");
    setSelectedImportance("");
    setDeadline("");
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeIcon} onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="ToDoを入力してください"
            required
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">カテゴリー</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            required
          >
            <option value="">優先度</option>
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
          <select
            value={selectedImportance}
            onChange={(e) => setSelectedImportance(e.target.value)}
            required
          >
            <option value="">重要度</option>
            {importances.map((importance) => (
              <option key={importance.id} value={importance.id}>
                {importance.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <button className={styles.addButton} type="submit">
            追加
          </button>
        </form>
      </div>
    </div>
  );
};
